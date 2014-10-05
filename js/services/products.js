define([], function () {

    return {

        getProducts: function () {
            this.url = 'products.json';
            return this.getOptions();
        }

    };

});