define([], function () {

    /*
     *  util: test
     *
     *  This library passes unit/zombie and end to end tests
     *    - A unit/zombie waiting to an application event to be executed
     *
     *  Flow:
     *  - Someone runs 'requireTestFiles'
     *    - Get test file urls of configuration
     *    - Require test files
     *    - Instance and store this test
     *    - Iterate the instances and wait to 'onFinish' is run
     *    - Return a promise. When this library resolves the promise, app can start
     *  Promise:
     *    - 'appWaitsToTestToBeLoaded' configuration value specifies whether to wait to require all test
     */

    var //requireTestFiles helpers

        instances = window.z_testInstances = [],

        //require, instance and store test, run first instance too
        requireTestFiles = function (promise) {
            require(parseTestsUrls(), function () {
                appWaitsToTestToBeLoaded(promise, true);
                instanceTests(utils.sliceArguments(_.compact(arguments)));
                runNextInstance();
            });
        },

        //get test file urls and parse
        parseTestsUrls = function () {
            return _.map(utils.config.get('tests', []), function (test) {
                return 'testPath/' + test;
            }).concat(utils.config.get('testsLibraries', []));
        },

        //check 'wait' and 'appWaitsToTestToBeLoaded' to resolve the promise
        appWaitsToTestToBeLoaded = function (promise, wait) {
            //wait or not wait test to be loaded, to resolve the promise
            if (!!utils.config.get('appWaitsToTestToBeLoaded') === wait) {
               promise.resolve();
            }
        },

        //instance and store tests, set public 'onFinish' method
        instanceTests = function (testDefinitions) {
            _.each(testDefinitions, function (testDefinition) {
                var instance = utils.classes.instance('test', testDefinition);
                instances.push(instance); //store instance
                instance.onFinish = function () { //set hook in instance
                    runNextInstance();
                };
            });
        },

        //instances iterator

        instancesIndex = -1,

        //run the next test, jumping zombies
        runNextInstance = function () {
            instancesIndex += 1;
            if (instancesIndex < _.size(instances)) {
                if (instances[instancesIndex].events) { //if test has events, is a zombie
                    runNextInstance();
                } else {
                    instances[instancesIndex].runTest();
                }
            }
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils;
        },

        //public method to init test
        requireTestFiles: function () {
            var promise = $.Deferred();
            requireTestFiles(promise);
            appWaitsToTestToBeLoaded(promise, false);
            return promise;
        }

    };
});