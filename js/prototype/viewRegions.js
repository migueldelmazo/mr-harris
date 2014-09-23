define(['utils'], function (utils) {

    var //showView helpers
        parseOptions = function (options) {
            options.region = !options.region && this._defaultRegion ? this._defaultRegion : options.region;
            options.viewOptions = options.viewOptions || {};
            options.viewOptions.app = this.app;
        },

        getClassType = function (view) {
            return !!view._regions ? 'layout' : 'itemView';
        },

        storeViewId = function (options, instance) {
            instance._id = options.id;
        },

        initListenTo = function (options, instance) {
            //listen runParentMethod
            this.listenTo(instance, 'runParentMethod', this.runParentMethod);
            //listen view actions
            _.each(options.listenToView, function (actions, eventName) {
                this.listenTo(instance, eventName, onListenTo.bind(this, actions));
            }, this);
        },

        onListenTo = function () {
            this.runActions.apply(this, utils.sliceArguments(arguments));
        },

        showViewInRegion = function (options, instance) {
            this[options.region].show(instance);
        },

        //findView helpers

        findView = function (list) {
            var result = [];
            if (_.size(list) === 1 && list[0] === this._name) {
                //I'm the found view
                result.push(this);
            } else {
                _.each(utils.foo(this, 'getRegions'), function (region, key) {
                    if (region.currentView && region.currentView._name === list[1]) {
                        //my son is the next of the list
                        result.push(region.currentView.findView(list.splice(1)));
                    } else if (region.currentView) {
                        //none of my sons are the next of the list, we tried with my grandchilds
                        result.push(region.currentView.findView(list));
                    }
                }, this);
            }
            return result;
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        //init methods

        _initRegions: function () {
            var regions = {};
            if (this instanceof Marionette.LayoutView) {
                _.each(this._regions, function (selector, region) {
                    regions[region] = '[region=' + selector + ']';
                });
                this.regions = regions;
            }
        },

        _showInitialViewsInRegions: function () {
            this.showViews(utils.foo(this, '_initialViewsInRegions', []));
        },

        //show views

        showViews: function (views) {
            _.each(views, this.showView.bind(this));
        },

        showView: function (options) {
            var instance;
            if (this instanceof Marionette.LayoutView) {
                parseOptions.call(this, options);
                instance = utils.classes.instance(getClassType(options.view), options.view, options.viewOptions);
                storeViewId.call(this, options, instance);
                initListenTo.call(this, options, instance);
                showViewInRegion.call(this, options, instance);
                utils.storeInWindow('view', instance); //delete me
                return instance;
            }
        },

        //find views and models

        findView: function (list) {
            list = utils.parseArray(list);
            return _.compact(_.flatten(findView.call(this, list)))[0];
        },

        findModel: function (list) {
            var view = this.findView(list);
            if (view && view._modelInstance) {
                return view._modelInstance;
            }
        }

    });
});