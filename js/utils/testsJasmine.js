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
                spec.test.sendResults({
                    suite: spec.suite.description,
                    spec: spec.description,
                    result: spec.results().passed(),
                    test: spec.test
                });
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
                action.test.call(this);
                jasmineSingleton.execute(); //run test
            }
        }

    });
});
