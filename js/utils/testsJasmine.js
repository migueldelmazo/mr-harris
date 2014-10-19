define(['utils'], function (utils) {

    var //initialize jasmine singleton

        initJasmine = function () {
            if (!jasmineSingleton) {
                jasmineSingleton = jasmine.getEnv();
                jasmineSingleton.addReporter(initReporter());
            }
        },

        initReporter = function () {
            var reporter = new jasmine.JsApiReporter();
            reporter.reportSpecResults = function (spec) {
                var results = spec.results(),
                    passed = results.passed();
                //send results
                spec.test.sendResults({
                    suite: spec.suite.description,
                    spec: spec.description,
                    result: passed,
                    test: spec.test,
                    items: passed || results.getItems()
                });
                //increment test action
                spec.test.incActionIndex();
            };
            return reporter;
        },

        initBeforeEach = function () {
            var that = this;
            beforeEach(function() {
                this.test = that;
            });
        },

        jasmineSingleton; //jasmine singleton

    initJasmine();

    //extend test class

    _.extend(utils.classes.classes.test.Class.prototype, {

        runProof: function (action) {
            if (_.isFunction(action.test)) {
                initBeforeEach.call(this); //add before each
                describe(this.name, function () {
                    it(action.name, function () {
                        if (action.waitsFor) {
                            waitsFor(action.waitsFor.bind(this.test), 'WaitsFor is not resolved', 100);
                            runs(action.test.bind(this.test));
                        } else {
                            action.test.call(this.test);
                        }
                    });
                });
                jasmineSingleton.execute(); //run test
            }
        }

    });
});
