define(['utils'], function (utils) {

    return {

        actions: [
            {
                wait: 100
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Error in user: empty user', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=user]').val('').trigger('keyup');
                            expect(viewEl.find('[js-validation-mirror=user]').hasClass('val-error')).toBe(true);
                            expect(viewEl.find('[js-validation=user]').hasClass('val-error')).toBe(true);
                            expect(viewEl.find('[js-validation=user]').text()).toBe('empty field');
                            expect(viewEl.find('[js=label-user]').hasClass('selected')).toBe(false);
                            expect(viewEl.find('[js=label-mail]').hasClass('hidden')).toBe(true);
                            expect(viewEl.find('[js=label-age]').hasClass('hidden')).toBe(true);
                            expect(viewEl.find('[js=submit]').prop('disabled')).toBe(true);
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Warning in user: admin', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=user]').val('admin').trigger('keyup');
                            expect(viewEl.find('[js-validation-mirror=user]').hasClass('val-warning')).toBe(true);
                            expect(viewEl.find('[js-validation=user]').hasClass('val-warning')).toBe(true);
                            expect(viewEl.find('[js-validation=user]').text()).toBe('are you sure?');
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Success in user: usuario', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=user]').val('usuario').trigger('keyup');
                            expect(viewEl.find('[js-validation-mirror=user]').hasClass('val-success')).toBe(false);
                            expect(viewEl.find('[js-validation=user]').hasClass('val-success')).toBe(false);
                            expect(viewEl.find('[js-validation=user]').text()).toBe('');
                            expect(viewEl.find('[js=label-user]').hasClass('selected')).toBe(true);
                            expect(viewEl.find('[js=submit]').prop('disabled')).toBe(false);
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Error in mail: invalid mail', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=mail]').val('').trigger('keyup');
                            expect(viewEl.find('[js-validation=mail]').hasClass('val-error')).toBe(true);
                            expect(viewEl.find('[js-validation=mail]').text()).toBe('invalid email');
                            viewEl.find('[js=mail]').val('email').trigger('keyup');
                            expect(viewEl.find('[js-validation=mail]').hasClass('val-error')).toBe(true);
                            expect(viewEl.find('[js-validation=mail]').text()).toBe('invalid email');
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model bindings', function() {
                        it('Success in name: my name', function() {
                            var viewEl = this.test.findView$El('contView'),
                                model = this.test.findModel('contView');
                            viewEl.find('[js=name]').val('my name').trigger('keyup');
                            expect(viewEl.find('[js=name]').val()).toBe(model.get('name'));
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Success in mail: mail@mail.org', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=mail]').val('mail@mail.org').trigger('keyup');
                            expect(viewEl.find('[js-validation=mail]').hasClass('val-error')).toBe(false);
                            expect(viewEl.find('[js-validation=mail]').text()).toBe('');
                        });
                    });
                }
            },
            {
                test: function () {
                    describe('View and Model validations', function() {
                        it('Parse in age: my age', function() {
                            var viewEl = this.test.findView$El('contView');
                            viewEl.find('[js=age]').val('my age').trigger('keyup');
                            expect(viewEl.find('[js=age]').val()).toBe('18');
                            viewEl.find('[js=age]').val('19').trigger('keyup');
                            expect(viewEl.find('[js=age]').val()).toBe('19');
                        });
                    });
                }
            }
        ]
    };
});