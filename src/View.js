(function () {
    Milkyway.View = new Class({
        Implements: [Options, Events],
        Synthesizes: [],
        options: {
            init: true,
            bindings: {}
        },
        subviews: [],
        initialize: function (options) {
            this.setOptions(options);
            if (!this.options.template) {
                this.options.template = this.options.id
            }
            /*this.Synthesizes.each((function (prop) {
             var setterName = "set" + prop.capitalize();
             if (!this.hasOwnProperty(setterName)) {
             this[setterName] = function (val) {
             this[prop] = val;
             }
             }
             }).bind(this));*/
            if (this.options.init) {
                this.initViewFromTemplate();
            } else {
                this.initViewFromDOM();
                1
            }
            this.bindEvents();
            //this.bindValues();
        },
        initViewFromTemplate: function () {
            this.loadTemplate();
            this.loadData();
            this.renderView();
        },
        initViewFromDOM: function () {
            this.element = $(this.options.id);
        },
        loadTemplate: function () {
            this.template = Handlebars.templates[this.options.template];
        },
        loadData: function () {
            this.data = {};
        },
        renderView: function () {
            this.element = new Element("div", {
                id: this.options.id,
                html: this.template(this.data)
            });
        },
        toElement: function () {
            return $(this.element);
        },
        addSubview: function (view) {
            this.subviews.push(view);
            this.element.grab(view);
        },
        bindEvents: function () {
        },
        getValue: function (name) {
            return $(this.options.bindings[name]).get('value');
        },
        setValue: function (name, value) {
            $(this.options.bindings[name]).set('value', value);
        }
//        bindValues: function(){
//            Object.each(this.options.bindings, function(key, val){
//
//            });
//        }
    });
})();