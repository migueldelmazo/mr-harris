define(['utils'], function (utils) {

    //end to end test for fooView and fooModel

    return {

        name: 'View and Model',

        actions: [
            {
                navigate: 'testFoo'
            },
            {
                name: 'Validation: set "" in user',
                do: function () {
                    this.find$El('fooView', '[js=user]').val('').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation-mirror=user]').hasClass('val-error')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=user]').hasClass('val-error')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=user]').text()).toBe('empty field');
                    expect(this.find$El('fooView', '[js=label-user]').hasClass('selected')).toBe(false);
                    expect(this.find$El('fooView', '[js=label-mail]').hasClass('hidden')).toBe(true);
                    expect(this.find$El('fooView', '[js=label-age]').hasClass('hidden')).toBe(true);
                }
            },
            {
                name: 'Validation: set "admin" in user',
                do: function () {
                    this.find$El('fooView', '[js=user]').val('admin').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation-mirror=user]').hasClass('val-warning')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=user]').hasClass('val-warning')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=user]').text()).toBe('are you sure?');
                }
            },
            {
                name: 'Validation: set "usuario" in user',
                do: function () {
                    this.find$El('fooView', '[js=user]').val('usuario').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation-mirror=user]').hasClass('val-success')).toBe(false);
                    expect(this.find$El('fooView', '[js-validation=user]').hasClass('val-success')).toBe(false);
                    expect(this.find$El('fooView', '[js-validation=user]').text()).toBe('');
                    expect(this.find$El('fooView', '[js=label-user]').hasClass('selected')).toBe(true);
                }
            },
            {
                name: 'Validation: set "" in mail',
                do: function () {
                    this.find$El('fooView', '[js=mail]').val('').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation=mail]').hasClass('val-error')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=mail]').text()).toBe('invalid email');
                }
            },
            {
                name: 'Validation: set "email" in mail',
                do: function () {
                    this.find$El('fooView', '[js=mail]').val('email').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation=mail]').hasClass('val-error')).toBe(true);
                    expect(this.find$El('fooView', '[js-validation=mail]').text()).toBe('invalid email');
                }
            },
            {
                name: 'Validations: set "mail@mail.org" in mail',
                do: function () {
                    this.find$El('fooView', '[js=mail]').val('mail@mail.org').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js-validation=mail]').hasClass('val-error')).toBe(false);
                    expect(this.find$El('fooView', '[js-validation=mail]').text()).toBe('');
                }
            },
            {
                name: 'Bindigns: set "nombre" in name',
                do: function () {
                    this.find$El('fooView', '[js=name]').val('nombre').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js=name]').val()).toBe(this.findModel('fooView').get('name'));
                }
            },
            {
                name: 'Validations: set "my age" in age',
                do: function () {
                    this.find$El('fooView', '[js=age]').val('my age').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js=age]').val()).toBe('18');
                }
            },
            {
                name: 'Validations: set "20" in age',
                do: function () {
                    this.find$El('fooView', '[js=age]').val('20').trigger('keyup');
                },
                test: function () {
                    expect(this.find$El('fooView', '[js=age]').val()).toBe('20');
                }
            },
            {
                name: 'Validations: validate model',
                test: function () {
                    expect(this.findModel('fooView').validate()).toBe(true);
                }
            },
            {
                name: 'Model events: set "" in user',
                do: function () {
                    this.find$El('fooView', '[js=user]').val('').trigger('keyup');
                },
                test: function () {
                    expect(this.findModel('fooView').get('userMirror')).toBe('');
                    this.find$El('fooView', '[js=user]').val('usuario').trigger('keyup');
                    expect(this.findModel('fooView').get('userMirror')).toBe('usuario');
                }
            },
            {
                name: 'Model events: set "usuario" in user',
                do: function () {
                    this.find$El('fooView', '[js=user]').val('usuario').trigger('keyup');
                },
                test: function () {
                    expect(this.findModel('fooView').get('userMirror')).toBe('usuario');
                }
            }
        ]
    };
});