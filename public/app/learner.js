/**
 * Created by cedric on 15/01/17.
 */
var app = new Vue({
    el: '#myApp',
    data: {
        page: 0,
        author: '',
        title: '',
        sections: [],
        part: 0
    },
    computed: {
        current() {
            if (this.sections.length > this.page)
                return this.sections[this.page];
            return {};
        },
        loading() {
            return this.sections.length === 0;
        }
    },
    methods: {
        next: function () {
            this.part = 0;
            if (this.page < this.sections.length - 1)
                this.page++;
        },
        previous: function () {
            this.part = 0;
            if (this.page > 0)
                this.page--;
        },
        up: function () {
            if (!this.current || !this.current.sections)
                return;
            if (this.part > 0)
                this.part--;
        },
        down: function () {
            if (!this.current || !this.current.sections)
                return;
            if (this.part < this.current.sections.length - 1)
                this.part++;
        },
        navigate: function (keyCode) {
            if (keyCode == 37) { // left
                this.previous();
            }
            else if (keyCode == 39) { // right
                this.next();
            }
            else if (keyCode == 40) { // down
                this.down();
            }
            else if (keyCode == 38) { // up
                this.up();
            }
        }
    }
});

var socket = io();
socket.on('start presentation', function (config) {
    app.title = config.title;
    app.author = config.author;
    app.sections = config.sections;
});
socket.on('move presentation', function (keycode) {
    app.navigate(keycode);
});