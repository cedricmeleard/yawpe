/**
 * Created by cedric on 15/01/17.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//express conf
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//socket io event
io.on('connection', function (socket) {
    socket.on('start', function (config) {
        //send start
        io.emit('start presentation', config);
    });
    socket.on('move', function (code) {
        io.emit('move presentation', code);
    });
});

//express routing
var router = express.Router();
//basic home rediection
router.get('/', function (req, res) {
    res.redirect('learner.html');
});
router.get('/play', function (req, res) {
    res.redirect('play.html');
});
router.get('/create', function (req, res) {
    res.redirect('edit.html');
});
//set router as default router
app.use(router);

//start server
http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});