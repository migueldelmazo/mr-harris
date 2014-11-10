define(['utils'], function (utils) {

    var appRoutes = [],

        initAppRouter = function () {
            var AppRouter = Backbone.Router.extend();
            this._appRouter = new AppRouter();
        },

        listenHash = function () {
            var that = this;
            Backbone.history.checkUrl = _.wrap(Backbone.history.checkUrl, function() {
                onHashChange.call(that, that.getHash());
            });
        },

        onHashChange = function (hash) {
            var route = _.findObj(utils.config.get('routes'), function (_options, _route) {
                    return routeToRegex.call(this, _route).test(hash);
                }, this);
            if (route.value.hasOwnProperty('controller')) {
                this.loadController(route.value.controller, {
                    options: this.getQuery(route.key, hash)
                });
            }
        },

        routeToRegex = function (route) {
            return this._appRouter._routeToRegExp(route);
        },

        routeToParams = function (regex, hash) {
            var params = this._appRouter._extractParameters(regex, hash);
            params.pop();
            return params;
        },

        routeToQuery = function (route, params) {
            return _.object(_.map(route.match(/:\w*/g), function (param) {
                return param.substr(1);
            }), params);
        },

        initHistory = function () {
            Backbone.history.start();
        },

        navigateToStart = function () {
            var hash = getStartHash.call(this);
            return hash === this.getHash() ? onHashChange.call(this, hash) : this.navigate(hash);
        },

        getStartHash = function () {
            return utils.config.get('appStartHash') || this.getHash() || utils.config.get('appHomeHash') || '';
        };

    //extend application class

    _.extend(Marionette.Application.prototype, {

        _initRouter: function () {
            initAppRouter.call(this);
            listenHash.call(this);
            initHistory.call(this);
            navigateToStart.call(this);
        },

        getHash: function () {
            return Backbone.history.getFragment();
        },

        getQuery: function (route, hash) {
            var regex = routeToRegex.call(this, route),
                params = routeToParams.call(this, regex, hash);
            return routeToQuery(route, params);
        }

    });
});
