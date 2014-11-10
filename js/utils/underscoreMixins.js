define([], function () {

    _.mixin({

        findObj: function (list, iteratee, context) {
            var obj = {
                key: '',
                value: {},
                obj: {}
            };
            _.find(list, function (value, key) {
                var result = iteratee.call(context, value, key);
                if (result) {
                    obj.key = key;
                    obj.value = value;
                    obj.obj[key] = value;
                    return true;
                }
            }, context);
            return obj;
        }

    });

});