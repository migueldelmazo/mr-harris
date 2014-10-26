define(['utils'], function (utils) {

    return {

        name: 'Services and cache',

        actions: [
            {
                navigate: 'testService'
            },
            {
                name: 'Simple service call',
                do: function () {
                    utils.services.removeCachedService();
                    this.findModel('serviceView').clear();
                    this.find$El('serviceView', '[js=simple-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(this.findModel('serviceView').get('simpleService').foo).toBe('foo');
                    expect(this.findModel('serviceView').getServiceData('simpleService', 'foo')).toBe('foo');
                }
            },
            {
                name: 'Double serial service call, only one service in cache',
                do: function () {
                    utils.services.removeCachedService();
                    this.findModel('serviceView').clear();
                    this.find$El('serviceView', '[js=double-serial-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(this.findModel('serviceView').get('doubleSerialService').foo).toBe('foo');
                    expect(this.findModel('serviceView').get('doubleSerialServiceRepeated').foo).toBe('foo');
                    expect(_.size(utils.services.getCachedService())).toBe(1);
                }
            },
            {
                name: 'Double parallel service call, only one service in cache',
                do: function () {
                    utils.services.removeCachedService();
                    this.find$El('serviceView', '[js=double-parallel-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(this.findModel('serviceView').get('doubleParallelService').foo).toBe('foo');
                    expect(this.findModel('serviceView').get('doubleParallelServiceRepeated').foo).toBe('foo');
                    expect(_.size(utils.services.getCachedService())).toBe(1);
                }
            },
            {
                name: 'Validate and parse before and after send',
                do: function () {
                    utils.services.removeCachedService();
                    this.find$El('serviceView', '[js=validate-and-parse-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(utils.services.getCachedService()[0].params.code).toBe(2);
                    expect(this.findModel('serviceView').getServiceData('validateAndParseService', 'foo')).toBe('foo1');
                }
            }
        ]
    };
});