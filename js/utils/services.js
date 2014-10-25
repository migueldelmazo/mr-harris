define([], function () {

    var /*
         *  util: service
         *
         *  A service is an instance of 'serviceClass'.
         *  'services' is an array where we store the services that are waiting an ajax response.
         *
         *  Flow:
         *  - Someone running the method 'run' that:
         *    - Instance object of type 'service'
         *    - Run 'initialize' instance method, to create its 'serviceOptions'
         *    - Instance should call public method 'callAjax'
         *    - 'callAjax' checks cached data for this 'serviceOptions'
         *      - If no cached data, call ajax API
         *  - When an ajax call answered successfully:
         *    - Set responseData in cached service
         *    - We resolve all services with this 'serviceOptions', and remove this services
         *  - When a call ajax responds with error:
         *    - We reject all services with this 'serviceOptions'
         *    - We remove the cached service in 'cache' of this service
         */

        services = window.z_services = [],

        storeService = function (serviceInstance) {
            services.push(serviceInstance);
        },

        resolveMatchingServices = function (serviceOptions, responseData, resolve) {
            _.each(services, function (serviceInstance, index) {
                if (areServiceOptions(serviceInstance.getServiceOptions(), serviceOptions)) {
                    //resolve (or reject) all service with this services options
                    !!resolve ? serviceInstance.resolve(responseData) : serviceInstance.reject(responseData);
                    services[index] = undefined; //set 'service' as undefined
                }
            });
            services = _.compact(services); //remove undefined services
        },

        areServiceOptions = function (obj1, obj2) {
            return _.isEqual(obj1.params, obj2.params) && obj1.type === obj2.type && obj1.url === obj2.url;
        },

        /*
         *  util: services > ajax
         *
         *  'sendAjax' send ajax call to API
         *  'onAjaxSuccess' set 'responseData' in 'cache' and resolve services
         *  'onAjaxError' remove cached service from 'cache' and reject service
         */

        sendAjax = function (serviceOptions) {
            if (serviceOptions.type !== 'GET' && utils.config.get('appInMaintenanceMode')) {
                //check maintenance mode
                onAjaxError.call(this, serviceOptions, {
                    type: 'warning',
                    code: 'appInMaintenanceMode'
                });
            } else {
                //send ajax
                $.ajax(utils.config.get('ajaxUrl') + serviceOptions.url, {
                    data: serviceOptions.params,
                    type: serviceOptions.type
                })
                    .done(onAjaxSuccess.bind(this, serviceOptions))
                    .fail(onAjaxError.bind(this, serviceOptions));
            }
        },

        onAjaxSuccess = function (serviceOptions, responseData) {
            setResponseDataInCachedService(serviceOptions, responseData);
            resolveMatchingServices(serviceOptions, responseData, true);
        },

        onAjaxError = function (serviceOptions, responseError) {
            this.removeCachedService(serviceOptions);
            resolveMatchingServices(serviceOptions, parseAjaxError(responseError), false);
        },

        parseAjaxError = function (responseError) {
            return {
                type: 'error',
                code: responseError.status,
                msg: responseError.statusText
            };
        },

        /*
         *  util: service > cache
         *
         *  'cache' is an array in which we are stored objects called 'serviceOptions'
         *  We use 'serviceOptions' as a key to relate it to the services instances
         *  'serviceOptions' has this sctructure:
         *  {
         *      url: 'my-url.json' //ajax url
         *      method: 'GET', //ajax method, maybe GET, POST, PUT...
         *      params: { myParams: 'foo' }, //ajax params to send to API
         *      responseData: {}, //response data of ajax call. Only after ajax call response successfully
         *      inProgress: boolean //current state
         *  }
         *
         *  When a service is created, 'serviceOptions' is checked whether there is in the 'cache'
         *  If there is in 'cache', we resolve service instance with 'responseData'
         *  If not, the 'serviceOptions' is cached and service instance waits for ajax call finished
         *
         *  When an ajax call finishes, we store its 'responseData' in the corresponding 'serviceOptions' from the 'cache',
         *  and resolve or reject all services instances with this 'serviceOptions'
         */

        cache = window.z_cache = [],

        findCachedService = function (serviceOptions) {
            return _.find(cache, function (cachedItem) {
                return areServiceOptions(cachedItem, serviceOptions);
            }) || {};
        },

        storeServiceInCache = function (serviceOptions) {
            var item = utils.clone(serviceOptions);
            item.inProgress = true; //all services start in progress state
            cache.push(item);
        },

        setResponseDataInCachedService = function (serviceOptions, responseData) {
            var cachedService = findCachedService(serviceOptions)
            cachedService.inProgress = false; //when ajax call returns we change this state
            cachedService.responseData = responseData;
        },

        removeCachedService = function (serviceOptions) {
            _.each(cache, function (cachedService, index) {
                if (serviceOptions === undefined || areServiceOptions(cachedService, serviceOptions)) {
                    cache[index] = undefined; //find service and set as undefined
                }
            });
            cache = _.compact(cache); //remove undefined services
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils; //store utils
        },

        run: function (serviceDefinition) {
            var serviceInstance = utils.classes.instance('service', serviceDefinition.service, serviceDefinition);
            storeService(serviceInstance);
            serviceInstance.initialize();
            return serviceInstance.getPromise();
        },

        callAjax: function (serviceOptions) {
            var cachedItem = findCachedService(serviceOptions);
            if (cachedItem.responseData) {
                resolveMatchingServices(serviceOptions, cachedItem.responseData);
            } else if (!cachedItem.inProgress) {
                storeServiceInCache(serviceOptions);
                sendAjax.call(this, serviceOptions);
            }
        },

        removeCachedService: function (serviceOptions) {
            removeCachedService(serviceOptions);
        },

        getCachedService: function (serviceOptions) {
            return _.isEmpty(serviceOptions) ? cache : findCachedService(serviceOptions);
        }

    };
});