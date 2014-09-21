define(['utils'], function (utils) {

    //extend application class

    _.extend(Marionette.Application.prototype, {

        //navigate to a hash
        navigate: function (hash) {
            setTimeout(function () {
                if (Backbone.history.fragment === hash) {
                    Backbone.history.loadUrl(hash);
                } else {
                    Backbone.history.navigate(hash);
                }
            }, 0);
        },

        //navigate to home hash
        navigateToHome: function () {
            this.navigate(utils.config.get('appHomeHash') || '');
        }

    });
});