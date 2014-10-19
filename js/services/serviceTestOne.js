define([], function () {

    var url = 'serviceTestOne.json';

    return {

        //getServiceTestOne

        getServiceTestOne: function () {
            this.url = url;
            this.validateBeforeSend = 'getServiceTestOneValidateBeforeSend';
            this.parseBeforeSend = 'getServiceTestOneParseBeforeSend';
            this.validateAfterSend = 'getServiceTestOneValidateAfterSend';
            this.parseAfterSend = 'getServiceTestOneParseAfterSend';
        },

        getServiceTestOneValidateBeforeSend: function () {
            return true;
            //return !isNaN(this.params.code);
        },

        getServiceTestOneParseBeforeSend: function () {
            //this.params.code += 1;
        },

        getServiceTestOneValidateAfterSend: function () {
            return true;
            //return _.isString(this.responseData.user);
        },

        getServiceTestOneParseAfterSend: function () {
            //this.responseData.user += 1;
        },

        //getServiceTestOneConfig

        getServiceTestOneConfig: function () {
            this.url = url;
        }

    };

});