angular.module('of.translations').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/token-form.html',
    "<script type=\"text/ng-template\" id=\"language.modal.html\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
    "        <h3 translate=\"language_edit\"></h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" ng-model=\"translationRecord\">\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-lg-3 control-label\" translate=\"token\"></label>\n" +
    "                <div class=\"col-lg-9\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"translationRecord.token\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-lg-3 control-label\" translate=\"english\"></label>\n" +
    "                <div class=\"col-lg-9\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"translationRecord.translations.en\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\" ng-show=\"getLocale()!='en'\">\n" +
    "                <label class=\"col-lg-3 control-label\">{{getLocale()}}</label>\n" +
    "                <div class=\"col-lg-9\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"translationRecord.translations[getLocale()]\"/>\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                            <button class=\"btn btn-default\" translate=\"Translate\" ng-click=\"googleTranslate()\"></button>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn\" ng-click=\"closeModal()\" translate=\"Cancel\"></a>\n" +
    "        <button class=\"btn btn-success\" ng-click=\"saveToken()\" translate=\"Save Token\"></a>\n" +
    "    </div>\n" +
    "</script>"
  );

}]);
