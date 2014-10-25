define(['utils'], function (utils) {

    //extend view class

    var serializeDataObj = {
        serializeData: function () {
            var modelData = (this._modelInstance) ? this._modelInstance.toJSON() : {},
                i18nData = { i18n: this._i18n || {}};
            return $.extend(true, modelData, i18nData);
        }
    };

    _.extend(Backbone.View.prototype, serializeDataObj);
    _.extend(Marionette.LayoutView.prototype, serializeDataObj);
    _.extend(Marionette.ItemView.prototype, serializeDataObj);

});