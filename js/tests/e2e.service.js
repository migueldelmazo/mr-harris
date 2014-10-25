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
                    this.find$El('serviceView', '[js=simple-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(this.findModel('serviceView').get('serviceTestOne').foo).toBe('foo');
                    expect(this.findModel('serviceView').getServiceData('serviceTestOne', 'foo')).toBe('foo');
                }
            },
            {
                name: 'Double service call, only one service in cache',
                do: function () {
                    utils.services.removeCachedService();
                    this.find$El('serviceView', '[js=double-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
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
                    expect(this.findModel('serviceView').getServiceData('serviceTestOneValidateAndParse', 'foo')).toBe('foo1');
                }
            }
        ]
    };
});
//TODO: testar validates y parseos, que se cacheen las llamadas, llamadas simultáneas