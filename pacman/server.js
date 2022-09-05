var express = require('express');
const app = express();

app.set('/views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

const server = app.listen(8000);

const io = require('socket.io')(server)

let pacmanCurrentIndex = 490;
const width = 28;
let count_id = 0;

let ghost_index = 348;

let players = []

let score = 0;

let messages = []

io.on('connection', function(socket) {
    socket.on('message', function(data) {
        io.emit('allMessage', {user:data.user, msg:data.msg})
    })

    players.push(socket.id)
    socket.on('socket_id', function(data) {
        // io.emit('index', {indexx:pacmanCurrentIndex, player: players, ghost_index:ghost_index})

        if(count_id==0) {
            io.emit('index', {indexx:pacmanCurrentIndex, player: socket.id})
            count_id += 1;
        } else {
            io.emit('ghost_index', {ghost_index:ghost_index, player: socket.id})
            io.emit('index', {indexx:pacmanCurrentIndex})
            // count_id += 1;
        }
    })

    socket.on('eat', function(data) {
        score += 1;
        io.emit('remove_dot', {pacmanCurrentIndex:data.pacmanCurrentIndex, score:score})
    })

    socket.on('gameover', function(data) {
        io.emit('game',{pacmanCurrentIndex:pacmanCurrentIndex})
    })

    socket.on('key_37', function(data) {
        pacmanCurrentIndex -= 1;
        io.emit('update_key_37', {index: pacmanCurrentIndex})
    });

    socket.on('key_38', function(data) {
        pacmanCurrentIndex -= width;
        io.emit('update_key_38', {index: pacmanCurrentIndex})
    });

    socket.on('key_39', function(data) {
        pacmanCurrentIndex += 1;
        io.emit('update_key_39', {index: pacmanCurrentIndex})
    });

    socket.on('key_40', function(data) {
        pacmanCurrentIndex += width;
        io.emit('update_key_40', {index: pacmanCurrentIndex})
    });

/////////////////////// GHOST /////////////////////////////////////////////

    socket.on('ghost_key_37', function(data) {
        ghost_index -= 1;
        io.emit('ghost_update_key_37', {index: ghost_index})
    });

    socket.on('ghost_key_38', function(data) {
        ghost_index -= width;
        io.emit('ghost_update_key_38', {index: ghost_index})
    });

    socket.on('ghost_key_39', function(data) {
        ghost_index += 1;
        io.emit('ghost_update_key_39', {index: ghost_index})
    });

    socket.on('ghost_key_40', function(data) {
        ghost_index += width;
        io.emit('ghost_update_key_40', {index: ghost_index})
    });
});




app.get('/', function(request, response) {
    response.render('index', {});
});