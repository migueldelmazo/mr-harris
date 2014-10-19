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
                    this.find$El('serviceView', '[js=simple-service]').click();
                },
                waitsFor: function () {
                    return this.findModel('serviceView').servicesInProgressCounter() === 0;
                },
                test: function () {
                    expect(this.findModel('serviceView').getServiceData('serviceTestOne', 'foo')).toBe('foo');
                }
            }
        ]
    };
});
//TODO: testar validates y parseos, que se cacheen las llamadas, llamadas simultáneas