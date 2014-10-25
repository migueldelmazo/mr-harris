define([], function () {

    var url = 'testOne.json';

    return {

        //getServiceTestOne

        getServiceTestOne: function () {
            this.url = url;
        },

        //getServiceTestOne

        getServiceTestOneValidateAndParse: function () {
            this.url = url;
            this.validateBeforeSend = 'getServiceTestOneValidateAndParseValidateBeforeSend';
            this.parseBeforeSend = 'getServiceTestOneValidateAndParseParseBeforeSend';
            this.validateAfterSend = 'getServiceTestOneValidateAndParseValidateAfterSend';
            this.parseAfterSend = 'getServiceTestOneValidateAndParseParseAfterSend';
        },

        getServiceTestOneValidateAndParseValidateBeforeSend: function () {
            return this.params.code === 1;
        },

        getServiceTestOneValidateAndParseParseBeforeSend: function () {
            this.params.code += 1;
        },

        getServiceTestOneValidateAndParseValidateAfterSend: function () {
            return this.responseData.foo === 'foo';
        },

        getServiceTestOneValidateAndParseParseAfterSend: function () {
            this.responseData.foo += 1;
        }

    };

});