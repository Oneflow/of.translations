angular.module('of.translations', ["ng"]).factory('TranslationService', function ($http, $localStorage) {
    var currentLocale = "en";
    if (localStorage && localStorage["prefLang"]){
        currentLocale = localStorage["prefLang"];
    }
    return {
        setLocale: function(locale) {
            currentLocale = locale;
            if (localStorage){
                localStorage["prefLang"] = locale;
            }
        },
        getLocale: function() {
            if (localStorage && localStorage["prefLang"]){
                currentLocale = localStorage["prefLang"];
            }
            return currentLocale;
        },
        getLocales: function(callback) {
            $http
                .get(languageUrlBase+"/locales/all")
                .success(callback)
                .error(callback);
        },
        getToken: function(token, callback) {
            if (!token) {
                return callback(new Error("No Token Specified"));
            }
            var url = languageUrlBase+"/token/"+encodeURIComponent(token)
            $http.get(url)
                .success(function(result){
                    callback(null, result);
                })
                .error(function(error, statusCode){
                    if (statusCode==404)    {
                        callback();
                    }   else    {
                        callback(error);
                    }
                });
        },
        create: function(_translationRecord, callback) {
            var postUrl = languageUrlBase+"/"+encodeURIComponent(_translationRecord.token);
            $http.post(postUrl, _translationRecord)
                .success(function(results){
                    callback(null, results);
                })
                .error(callback);
        },
        update: function(_translationRecord, callback) {
            var putUrl = languageUrlBase+"/"+_translationRecord._id;
            $http.put(putUrl, _translationRecord)
                .success(function(results){
                    callback(null, results);
                })
                .error(callback);
        },
        save: function(_translationRecord, callback) {
            console.log("_translationRecord", _translationRecord);
            if (_translationRecord._id)  {
                console.log("Update Required");
                this.update(_translationRecord, callback);
            }   else    {
                console.log("Create Required");
                this.create(_translationRecord, callback);
            }
        },
        translateToken: function(token, locale, callback) {
            console.log(encodeURIComponent(token));
            $http.put(languageUrlBase+"/google/"+encodeURIComponent(token)+"/"+locale)
                .success(function(results){
                    callback(null, results);
                })
                .error(function(error){
                    callback(error);
                });
        },
        getTranslation: function(english, callback) {
            $http.get(languageUrlBase+"/google/"+encodeURIComponent(english))
                .success(function(results){
                    callback(null, results);
                })
                .error(function(error){
                    callback(error);
                });
        }
    }
}).controller('tokenModalController', function ($scope, $modalInstance, TranslationService, translationRecord, selectedElement) {

    $scope.translationRecord = translationRecord;

    function closeModal() {
        $modalInstance.dismiss('cancel');
    }

    function saveToken() {
        var locale = TranslationService.getLocale();
        TranslationService.save($scope.translationRecord, function(){
            updateTokenText($scope.translationRecord.translations[locale]);            
            $modalInstance.dismiss('cancel');
        });
    };

    function googleTranslate() {
        var token = $scope.translationRecord.token;
        var locale = TranslationService.getLocale();
        if (!token)   {
            return;
        }
        TranslationService.translateToken(token, locale, function(err, _translationRecord){
            $scope.translationRecord = _translationRecord;
            updateTokenText(_translationRecord.translations[locale]);
            // selectedElement[0].innerText = _translationRecord.translations[locale];
        });
    }

    function updateTokenText(text) {
        selectedElement[0].innerText = text;
    }

    $scope.googleTranslate = googleTranslate;
    $scope.closeModal = closeModal;
    $scope.saveToken = saveToken;
    $scope.getLocale = TranslationService.getLocale;

}).directive('tokenform', function () {
    return {
        restrict: 'E',
        scope: { },
        templateUrl: 'templates/token-form.html',
        controller: function ($scope, $http, $attrs, $element, $translate, $modal, TranslationService) {

            function toTitleCase(str)  {
                return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            }

            function showTokens(){
                $('[translate]:not(#show-lang)')
                    .addClass('of-token-highlight')
                    .on('click', $scope.showTokenForm);
            }

            function hideTokens() {
                $('[translate]')
                    .removeClass('of-token-highlight')
                    .off('click', $scope.showTokenForm);
            }

            function showTokenForm(e){

                //stop any other event
                e.preventDefault();
                event.stopPropagation();

                $scope.selectedElement = $(this);

                //set the current token
                var token = $(this).attr("translate");
                if (!token) {
                    console.log(new Error("No Token Specified"));
                    return;
                }

                TranslationService.getToken(token, function(err, _translationRecord){

                    //is there an existing record?
                    if (!_translationRecord)    {
                        //no record found
                        $scope.translationRecord = {
                            token:  token,
                            translations:   {
                                en:  toTitleCase(token.replace(/_/g, " "))
                            }
                        };
                    }   else    {
                        $scope.translationRecord = _translationRecord;
                    }

                    //show form here
                    $modal.open({
                        templateUrl:    'language.modal.html',
                        controller:     'tokenModalController',
                        resolve: {
                            translationRecord: function () {
                                return $scope.translationRecord;
                            },
                            selectedElement: function() {
                                return $scope.selectedElement;
                            }
                        }
                    });                

                });

            }

            function setupEvents() {
                $scope.$on("show-tokens", function(){
                    showTokens();
                });

                $scope.$on("hide-tokens", function(){
                    hideTokens();
                });                
            }

            function init() {
                setupEvents();
            }

            $scope.showTokenForm = showTokenForm;
            $scope.showTokens = showTokens;

            init();

        }
    };
});