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
        this.validator = new Form.Validator.Inline(this.element, {
            errorPrefix: '',
            evaluateFieldsOnBlur: false,
            evaluateFieldsOnChange: false,
            showError: function (errorElement) {
                errorElement.setStyle('display', 'block');
            },
            hideError: function (errorElement) {
                errorElement.setStyle('display', 'none');
            }
        });
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
    viewWillAppear:function(){
        this.element.removeClass('error');
        if(this.hasOwnProperty('validator')){
            this.validator.reset();
        }
    },
    validate: function () {
        return this.validator.validate();
    },
    login: function () {
        this.element.removeClass('error');
        var data = this.serialize();
        if (this.validate()) {
            this.spinner = new Spinner(this.element);
            this.spinner.show();
            //(function(){ this.spinner.destroy(); this.signup()}).delay(1000, this);
            this.delegate.login(data);
            this.element.addClass('out');
        } else {
            this.element.addClass('error');
        }
        this.element.offsetWidth = this.element.offsetWidth;
    },
    signup: function () {
        this.delegate.showSignupView();
    },
    serialize: function () {
        var result = {};
        Object.each(this.options.bindings, function (key, val) {
            result[key] = this.getValue(key);
        }.bind(this));
        return result;
    }
});


var SignupView = new Class({
    Extends: Milkyway.View,
    options: {
        id: "signup",
        bindings: {
            'username': 'username',
            'password': 'password',
            'password2': 'password2'
        }
    },
    initialize: function (options) {
        this.parent(options);
        this.validator = new Form.Validator.Inline(this.element, {
            errorPrefix: '',
            evaluateFieldsOnBlur: false,
            evaluateFieldsOnChange: false,
            showError: function (errorElement) {
                errorElement.setStyle('display', 'block');
            },
            hideError: function (errorElement) {
                errorElement.setStyle('display', 'none');
            }
        });
        this.validator.add('matchField', {
            errorMsg: 'Fields do not match.',
            test: function (field, props) {
                if (typeOf(props.matchField) != 'null') {
                    if ($(props.matchField).get('value')==field.get('value')) return true;
                }
                return false;
            }
        });
    },
    bindEvents: function () {
        this.parent();
        this.element.getElement('#username').addEvent('keypress', function (e) {
            if (e.key == 'enter') {
                this.element.getElement('#password').select();
            }
        }.bind(this));
        this.element.getElement('#password').addEvent('keypress', function (e) {
            if (e.key == 'enter') {
                this.element.getElement('#password2').select();
            }
        }.bind(this));
        this.element.getElement('#password2').addEvent('keypress:keys(enter)', this.signup.bind(this));
        this.element.getElement('#signup-button').addEvent('click', this.signup.bind(this));
        this.element.getElement('#login-button').addEvent('click', this.login.bind(this));
    },
    viewWillAppear:function(){
        this.element.removeClass('error');
        if(this.hasOwnProperty('validator')){
            this.validator.reset();
        }
    },
    validate: function () {
        return this.validator.validate();
    },
    login: function () {
        this.delegate.showLoginView();
    },
    signup: function () {
        this.element.removeClass('error');
        var data = this.serialize();
        if (this.validate()) {
            this.spinner = new Spinner(this.element);
            this.spinner.show();
            //(function(){ this.spinner.destroy(); this.signup()}).delay(1000, this);
            this.delegate.login(data);
        } else {
            this.element.addClass('error');
        }
        this.element.offsetWidth = this.element.offsetWidth;
    },
    serialize: function () {
        var result = {};
        Object.each(this.options.bindings, function (key, val) {
            result[key] = this.getValue(key);
        }.bind(this));
        return result;
    }
})


var Application = new Class({
    Extends: Milkyway.Application,
    Binds: ['showLoginView', 'showSignupView'],
    initialize: function (options) {
        this.parent(options);
    },
    applicationReady: function () {
        this.loginView = new LoginView({});
        this.loginView.delegate = this;
        this.rootView.addSubview(this.loginView);
    },
    login: function (data) {
        console.log(data);
        //this.rootView.removeSubview(this.loginView);
    },
    signup:function(data){

    },
    showLoginView: function () {
        this.rootView.removeSubview(this.signupView);
        if (!this.hasOwnProperty('loginView')) {
            this.loginView = new LoginView({});
            this.loginView.delegate = this;
        }
        this.rootView.addSubview(this.loginView);
    },
    showSignupView: function () {
        this.rootView.removeSubview(this.loginView);
        if (!this.hasOwnProperty('signupView')) {
            this.signupView = new SignupView({});
            this.signupView.delegate = this;
        }
        this.rootView.addSubview(this.signupView);
    }
})
var application = new Application();

