define([], function () {

    var isEqual = function (oldValue, newValue) {
        return oldValue === newValue + '';
    };

    return {

        //get/set values checking tagName

        getValue: function ($el) {
            $el = this.getEl($el);
            return this.isInput($el) ? $el.val() : $el.html();
        },

        setValue: function ($el, value) {
            if (!isEqual(this.getValue($el), value)) { //prevent trigger change event if is the same
                $el = this.getEl($el);
                this.isInput($el) ? $el.val(value) : $el.html(value);
            }
        },

        //utils

        getEl: function ($el) {
            return (_.isString($el) ? $($el) : $el) || $();
        },

        isInput: function ($el) {
            if ($el.size()) {
                return ['input', 'select', 'textarea'].indexOf($el[0].tagName.toLowerCase()) >= 0;
            }
        }

    };
});