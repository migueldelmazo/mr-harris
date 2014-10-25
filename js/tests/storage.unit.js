define(['utils'], function (utils) {

    return {

        events: ['submit'],

        name: 'Local and session storage',

        actions: [
            {
                name: 'Set/Get local storage',
                do: function () {
                    utils.storage.localSet('foo', 'foo');
                },
                test: function () {
                    expect(utils.storage.localGet('foo')).toBe('foo');
                }
            },
            {
                name: 'Del local storage',
                do: function () {
                    utils.storage.localDel('foo');
                },
                test: function () {
                    expect(utils.storage.localGet('foo')).toBe(undefined);
                }
            },
            {
                name: 'Set/Get session storage',
                do: function () {
                    utils.storage.sessionSet('foo', 'foo');
                },
                test: function () {
                    expect(utils.storage.sessionGet('foo')).toBe('foo');
                }
            },
            {
                name: 'Del session storage',
                do: function () {
                    utils.storage.sessionDel('foo');
                },
                test: function () {
                    expect(utils.storage.sessionGet('foo')).toBe(undefined);
                }
            }
        ]
    };
});