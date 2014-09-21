define(['utils'], function (utils) {

    return {

        _events: ['submit'],

        actions: [
            {
                test: function () {
                    describe("Local storage", function() {
                        it("Set/Get/Del", function() {
                            utils.storage.localSet('foo', 'foo');
                            expect(utils.storage.localGet('foo')).toBe('foo');
                            utils.storage.localDel('foo');
                            expect(utils.storage.localGet('foo')).toBe(undefined);
                        });
                    });
                }
            },
            {
                test: function () {
                    describe("Session storage", function() {
                        it("Set/Get/Del", function() {
                            utils.storage.sessionSet('foo', 'foo');
                            expect(utils.storage.sessionGet('foo')).toBe('foo');
                            utils.storage.sessionDel('foo');
                            expect(utils.storage.sessionGet('foo')).toBe(undefined);
                        });
                    });
                }
            }
        ]
    };
});