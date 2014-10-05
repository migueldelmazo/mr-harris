define([], function () {

    return {

        getMovements: function () {
            this.url = 'movements.json';
            return this.getOptions();
        }

    };

});