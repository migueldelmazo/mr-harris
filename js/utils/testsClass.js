define(['utils'], function (utils) {

    /*
     *  util: testClass
     *
     *  A test is an array of actions to be run
     *  Each action can have this structure:
     *  {
     *      navigate: 'my-url', //navigate to this url
     *      name: 'test name', //mandatory, test name
     *      do: function () { ... }, //actions to be executed before running the test
     *      waitEvent: 'login', //the test will not be executed until someone trigger this application event
     *      waitFor: function () { return true; }, //the test will not be executed until this method returns true
     *      test: function () { ... }, //test specifications
     *      wait: 1000 //waiting time before executing the next test
     *  }
     */

     var /*
          *  'runTest' public method:
          *  - Reset options
          *  - Run first action
          *  - Wait to run next action:
          *     - If action has 'test', test library runs 'incActionIndex' public method when finish
          *     - Else, we run 'incActionIndex'
          */

        resetAjaxCalls = function () {
            var that = this;
            this.ajaxCalls = [];
            $(document).ajaxComplete(function(ev, xhr, settings) {
                that.ajaxCalls.push(settings);
            });
        },

        //reset initial options
        resetOptions = function () {
            this.actionIndex = 0;
            this.result = true;
            this.running = true;
        },

        //run current action or finish test
        runAction = function () {
            var action = getCurrentAction.call(this);
            if (this.result) { //check if previous test passed
                runTestAction.call(this, action);
                checkIncActionIndex.call(this, action);
            } else {
                finishTest.call(this);
            }
        },

        //run test action options
        runTestAction = function (action) {
            resetAjaxCalls.call(this);
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

        //increment action index or finish
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

        //wait an application event or time to run next action
        waitNextAction = function (action) {
            if (this.running) {
                if (action.waitEvent) {
                    this.app.appEventOnce(action.waitEvent, runAction, this);
                } else {
                    setTimeout(runAction.bind(this),
                        action.wait || utils.config.get('tests.waitNextAction.defaultWaitingTime', 100));
                }
            }
        },

        //finish test and call test manager
        finishTest = function () {
            this.running = false;
            this.onFinish();
        },

        /*
         *  Test class constructor:
         *  - Get application
         *  - Listen application events
         */

        //test constructor
        constructor = function () {
            this.app = utils.config.get('app');
            listenEvents.call(this);
        },

        //listen events to run test for zombie tests
        listenEvents = function () {
            _.each(this.events, function (ev) {
                this.app.appEventOn(ev, this.runTest, this);
            }, this);
        },

        //extend test class
        extendPrototype = function (testClass) {
            _.extend(testClass.prototype, {

                //run first action of this test, public method
                runTest: function () {
                    resetOptions.call(this);
                    runAction.call(this);
                },

                //increment action index of test, public method to be called for test library
                incActionIndex: function () {
                    incActionIndex.call(this);
                    waitNextAction.call(this, getCurrentAction.call(this));
                },

                //helpers for test instance

                //return a '$el' attribute from a view
                findView$El: function (list) {
                    var view = this.app.getAppView().findView(list);
                    return view ? view.$el : $();
                },

                //return a jquery selector from a view
                find$El: function (view, selector) {
                    return this.findView$El(view).find(selector);
                },

                //return a model of a view
                findModel: function (list) {
                    return this.app.getAppView().findModel(list);
                },

                //send bad test to errors, public method to be called for test library
                sendResults: function (report) {
                    console.debug(report);
                    if (!report.result) {
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