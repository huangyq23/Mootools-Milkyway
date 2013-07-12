var LoginView = new Class({
    Extends: Milkyway.View,
    options: {
        id: "login",
        bindings: {
            'username': 'username',
            'password': 'password'
        }
    },
    initialize: function (options) {
        this.parent(options);
    },
    bindEvents: function () {
        this.parent();
        this.element.getElement('#username').addEvent('keypress', function (e) {
            if (e.key == 'enter') {
                this.element.getElement('#password').select();
            }
        }.bind(this));
        this.element.getElement('#password').addEvent('keypress:keys(enter)', this.login.bind(this));
        this.element.getElement('#login-button').addEvent('click', this.login.bind(this));
        this.element.getElement('#signup-button').addEvent('click', this.signup.bind(this));
    },
    validate: function () {

    },
    login: function () {
        console.log(this.serialize());

        this.element.removeClass('error');
        this.element.offsetWidth = this.element.offsetWidth;
        this.element.addClass('error');
    },
    signup: function () {
        this.element.removeClass('error');
    },
    serialize: function () {
        var result = {};
        Object.each(this.options.bindings, function (key, val) {
            result[key] = this.getValue(key);
        }.bind(this));
        return result;
    }
})

var application = new Milkyway.Application({});
var loginView = new LoginView({});
application.rootView.addSubview(loginView);