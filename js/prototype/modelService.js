define(['utils'], function (utils) {

    //service helpers

    var parseServices = function () {
            //TODO: parsear id
        },

        //service resolve callback
        onServiceResolve = function (service, data) {
            //check service options
            if (service.set) {
                this.set(service.set, data);
            }
            if (service.onSuccess) {
                utils.foo(this, service.onSuccess, undefined, data, service);
            }
            triggerServiceInProgress.call(this, service);
        },

        //trigger serviceInProgress:id and serviceInProgress with state
        triggerServiceInProgress = function (service) {
            var id = service.id,
                position = this._serviceInProgress.indexOf(id),
                nowInProgress = position < 0;
            //manage current services in progress
            if (nowInProgress) {
                this._serviceInProgress.push(id); //new service in progress
            } else {
                this._serviceInProgress[position] = undefined; //service in progress finish
                this._serviceInProgress = _.compact(this._serviceInProgress);
            }
            //trigger serviceInProgress:id state
            this.trigger('serviceInProgress:' + id, nowInProgress);
            //trigger serviceInProgress state
            if (nowInProgress && _.size(this._serviceInProgress) === 1) {
                this.trigger('serviceInProgress', true);
            } else if (_.size(this._serviceInProgress) === 0) {
                this.trigger('serviceInProgress', false);
            }
        };

    //extend model class

    _.extend(Backbone.Model.prototype, {

        //run initial services
        callInitialService: function () {
            _.each(this._initialService, function (service) {
                this.callService(service);
            }, this);
        },

        //call ajax service
        callService: function (service) {
            var that = this;
            triggerServiceInProgress.call(this, service);
            utils.services.run(service)
                .done(function (data) {
                    onServiceResolve.call(that, service, data);
                });
        }

    });
});
