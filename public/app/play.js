var socket = io();

var app = new Vue({
    el: '#myApp',
    data: {
        page: 0,
        author: '',
        title: '',
        sections: [],
        part: 0,
        started: false
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
        start: function () {
            //move to first page
            this.page = 0;
            this.part = 0;
            var datas = {
                author: this.author,
                title: this.title,
                sections: this.sections
            };
            socket.emit('start', datas);
            this.started = true;
        },
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
            var moveAccepted = false;
            switch (keyCode) {
                case 37 :
                    this.previous();
                    moveAccepted = true;
                    break;
                case 38 :
                    this.up();
                    moveAccepted = true;
                    break;
                case 39 :
                    this.next();
                    moveAccepted = true;
                    break;
                case 40 :
                    this.down();
                    moveAccepted = true;
                    break;
            }

            if (this.started && moveAccepted)
                socket.emit('move', keyCode);
        }
    }
});

function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(JSON.parse(this.responseText))
    };
    xhr.open("GET", url, true);
    xhr.send();
}
var locals = localStorage.getItem('temp-save-datas');
if (locals) {
    var savedDatas = JSON.parse(locals);
    app.title = savedDatas.title;
    app.author = savedDatas.author;
    app.sections = savedDatas.sections;
}
else {
    getJSON('app/config/config.json', data => {
//inject config
        app.title = data.title;
        app.author = data.author;
        app.sections = data.sections;
    });
}


//map keyboard navigation event
addEventListener('keydown', e => {
    app.navigate(e.keyCode);
});
//listen on move event triggered
app.$on('move', function (keycode) {
    app.navigate(keycode);
});


window.addEventListener('load', function () {

    var touchsurface = document.getElementById('swipe'),
        startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();// record time when finger first makes contact with surface
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault(); // prevent scrolling when inside DIV
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime;// get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100);
        app.navigate(swiperightBol ? 37 : 39);
        e.preventDefault();
    }, false);

}, false); // end window.onload