define([], function () {

    var instances = window.z_testInstances = [],

        //requireTestFiles helpers

        requireTestFiles = function (promise) {
            require(parseTestsUrls(), function () {
                appWaitsToTestToBeLoaded(promise, true);
                instanceTests(utils.sliceArguments(_.compact(arguments)));
                runNextInstance();
            });
        },

        parseTestsUrls = function () {
            return _.map(utils.config.get('tests', []), function (test) {
                return 'testPath/' + test;
            }).concat(utils.config.get('testsLibraries', []));
        },

        appWaitsToTestToBeLoaded = function (promise, wait) {
            //wait or not wait test to be loaded, to resolve the promise
            if (!!utils.config.get('appWaitsToTestToBeLoaded') === wait) {
               promise.resolve();
            }
        },

        //instance and store tests
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

        runNextInstance = function () {
            instancesIndex += 1;
            if (instancesIndex < _.size(instances)) {
                if (instances[instancesIndex].events) { //if test has _events, is a zombie
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

        requireTestFiles: function () {
            var promise = $.Deferred();
            requireTestFiles(promise);
            appWaitsToTestToBeLoaded(promise, false);
            return promise;
        }

    };
});