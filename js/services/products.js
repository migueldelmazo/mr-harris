define([], function () {

    var url = 'products.json';

    return {

        //getProducts

        getProducts: function () {
            this.url = url;
            this.validateBeforeSend = 'getProductsValidateBeforeSend';
            this.parseBeforeSend = 'getProductsParseBeforeSend';
            this.validateAfterSend = 'getProductsValidateAfterSend';
            this.parseAfterSend = 'getProductsParseAfterSend';
        },

        getProductsValidateBeforeSend: function () {
            return !isNaN(this.params.code);
        },

        getProductsParseBeforeSend: function () {
            this.params.code += 1;
        },

        getProductsValidateAfterSend: function () {
            return _.isString(this.data.user);
        },

        getProductsParseAfterSend: function () {
            this.data.user += 1;
        },

        //getProductsConfig

        getProductsConfig: function () {
            this.url = url;
        }

    };

});