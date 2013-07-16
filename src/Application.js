(function () {
    Milkyway.Application = new Class({
        Implements: [Options, Events],
        initialize: function (options) {
            this.setOptions(options);
            this.rootView = new Milkyway.View({
                id: "container",
                init: false
            });
            this.applicationReady();
        },
        applicationReady: function(){
            console.warn('Not Implemented');
        }
    });
})();