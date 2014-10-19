define(['utils'], function (utils) {

    var //runTest helpers

        initOptions = function () {
            this.actionIndex = 0;
            this.result = true;
            this.running = true;
        },

        //run action
        runAction = function (action) {
            if (action.navigate) {
                this.app.navigate(action.navigate);
            }
            if (action.do) {
                action.do.call(this);
            }
            if (action.test) {
                this.runProof(action); //must to be overwritten by the test's library, for example jasmine
            }
        },

        //check if increment action index
        checkIncActionIndex = function (action) {
            if (!action.test) {
                this.incActionIndex();
            }
        },

        //increment action index and finish
        incActionIndex = function () {
            if (this.actionIndex < _.size(this.actions) - 1) {
                this.actionIndex = this.actionIndex + 1;
            } else {
                finishTest.call(this);
            }
        },

        //get current action
        getCurrentAction = function () {
            return this.actions[this.actionIndex];
        }

        //wait an event or time to run next action
        waitNextAction = function (action) {
            if (this.running) {
                if (action.waitEvent) {
                    this.app.appEventOnce(action.waitEvent, this._runAction, this);
                } else {
                    setTimeout(this._runAction.bind(this), action.wait || 100);
                }
            }
        },

        //finish test and call test manager
        finishTest = function () {
            this.running = false;
            this.onFinish();
        },

        //constructor test helpers

        constructor = function () {
            this.app = utils.config.get('app');
            initEvents.call(this);
        },

        //on listen _events run test
        initEvents = function () {
            _.each(this.events, function (ev) {
                this.app.appEventOn(ev, this.runTest, this);
            }, this);
        },

        extendPrototype = function (testClass) {
            _.extend(testClass.prototype, { //extend test class

                runTest: function () {
                    initOptions.call(this);
                    this._runAction();
                },

                _runAction: function () {
                    var action = getCurrentAction.call(this);
                    if (this.result) { //check if previous test passed
                        runAction.call(this, action);
                        checkIncActionIndex.call(this, action);
                    } else {
                        finishTest.call(this);
                    }
                },

                incActionIndex: function () {
                    incActionIndex.call(this);
                    waitNextAction.call(this, getCurrentAction.call(this));
                },

                //find items

                findView$El: function (list) {
                    var view = this.app.getAppView().findView(list);
                    return view ? view.$el : $();
                },

                find$El: function (view, selector) {
                    return this.findView$El(view).find(selector);
                },

                findModel: function (list) {
                    return this.app.getAppView().findModel(list);
                },

                //send bad test to errors
                sendResults: function (report) {
                    console.debug(report);
                    if (!report.result) {
                        this.result = false;
                        utils.errors.throwWarning({
                            lib: 'testClass',
                            method: 'sendResults',
                            code: 'test not passed',
                            result: report.result,
                            suite: report.suite,
                            spec: report.spec,
                            items: report.items
                        });
                    }
                }
            });
        },

        //utils

        utils;

    return {

        _init: function (_utils) {
            utils = _utils;
            //create and extend Test
            extendPrototype(utils.classes.create('test', constructor));
        }

    };
});