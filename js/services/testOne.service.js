define([], function () {

    var url = 'testOne.json';

    return {

        //simpleService

        simpleService: function () {
            this.url = url;
        },

        //doubleSerialService

        doubleSerialService: function () {
            this.url = url;
            this.serviceEvent = 'doubleSerialService';
        },

        doubleSerialServiceRepeated: function () {
            this.url = url;
        },


        //doubleParallelService

        doubleParallelService: function () {
            this.url = url;
        },

        doubleParallelServiceRepeated: function () {
            this.url = url;
        },

        //validateAndParseService

        validateAndParseService: function () {
            this.url = url;
            this.validateBeforeSend = 'validateAndParseServiceValidateBeforeSend';
            this.parseBeforeSend = 'validateAndParseServiceParseBeforeSend';
            this.validateAfterSend = 'validateAndParseServiceValidateAfterSend';
            this.parseAfterSend = 'validateAndParseServiceParseAfterSend';
        },

        validateAndParseServiceValidateBeforeSend: function () {
            return this.params.code === 1;
        },

        validateAndParseServiceParseBeforeSend: function () {
            this.params.code += 1;
        },

        validateAndParseServiceValidateAfterSend: function () {
            return this.responseData.foo === 'foo';
        },

        validateAndParseServiceParseAfterSend: function () {
            this.responseData.foo += 1;
        }

    };

});