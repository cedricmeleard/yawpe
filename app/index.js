var app = new Vue({
    el: '#myApp',
    data: {
        page: 0,
        author : '',
        title : '',
        sections : [],
        part : 0
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
            if (!this.current  || !this.current.sections)
                return;
            if (this.part > 0)
                this.part--;
        },
        down: function () {
            if (!this.current  || !this.current.sections)
                return;
            if (this.part < this.current.sections.length - 1)
                this.part++;
        }
    }
});

//TODO à modifier
//inject config
app.title = config.title;
app.author = config.author;
app.sections = config.sections;

//add event navigation
window.addEventListener('keydown',
    function (e) {
        if (e.keyCode == 37) { // left
            app.previous();
        }
        else if (e.keyCode == 39) { // right
            app.next();
        }
        else if (e.keyCode == 40) { // down
            app.down();
        }
        else if (e.keyCode == 38) { // up
            app.up();
        }
    }, false);
