$(document).ready(function(){
    $('#results').hide()


    const socket = io();

    socket.emit('socket_id', {msg:'yow'})

    $('#send').click(function() {
        let message = $('#texbox').val()
        socket.emit('message', {user:socket.id, msg:message})
    })

    socket.on('allMessage', function(data) {
        if(socket.id == data.user) {
            let to_append = `<p class="user_message">${data.msg}</p>`
            $('#chatbox').append(to_append)
            $('#texbox').val('')
        }
        else {
            let to_append = `<p class="message">${data.msg}</p>`
            $('#chatbox').append(to_append)
            $('#texbox').val('')
        }
        
        
    });

    const grid = document.querySelector('.grid')
    

    const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 0, 1, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 0, 0, 1, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 0, 0, 1, 0, 1,
                    1, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
                    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
                    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const squares = []

    function createBoard() {
        for(let i=0; i<layout.length; i++) {
            const square = document.createElement('div');
            grid.appendChild(square)
            squares.push(square)

            if(layout[i] == 0) {
                squares[i].classList.add('pac-dot')
            } 
            else if(layout[i] == 1) {
                squares[i].classList.add('wall');
            }
            else if(layout[i] == 2) {
                squares[i].classList.add('ghost-lair')
            }
            else if(layout[i] == 3) {
                squares[i].classList.add('power-pellet')
            }
        }
    }

    createBoard()

    //pacman

    socket.on('index', function(data) {
        console.log(`player 1:`, socket.id)
        let pacmanCurrentIndex = data.indexx
        let player_1 = socket.id
        const width = 28;
        squares[pacmanCurrentIndex].classList.add('pac-man')


        
        socket.on('update_key_37', function(data) {
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            // console.log(pacmanCurrentIndex)
            console.log(player_1)
            if (pacmanCurrentIndex % width != 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
                pacmanCurrentIndex = data.index;
            }
            squares[pacmanCurrentIndex].classList.add('pac-man')
            $('.pac-man').css({'transform':'rotate(180deg)'})
        })

        socket.on('update_key_38', function(data) {
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            // console.log(pacmanCurrentIndex)
            console.log(player_1)
            if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall')) {
                pacmanCurrentIndex = data.index
            }
            squares[pacmanCurrentIndex].classList.add('pac-man')
            $('.pac-man').css({'transform':'rotate(270deg)'})
        })

        socket.on('update_key_39', function(data) {
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            // console.log(pacmanCurrentIndex)
            console.log(player_1)
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall')) {
                pacmanCurrentIndex = data.index;
            }
            squares[pacmanCurrentIndex].classList.add('pac-man')
            $('.pac-man').css({'transform':'rotate(0deg)'})
        })

        socket.on('update_key_40', function(data) {
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            // console.log(pacmanCurrentIndex)
            console.log(player_1)
            if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall')) {
                pacmanCurrentIndex = data.index;
            }
            squares[pacmanCurrentIndex].classList.add('pac-man')
            $('.pac-man').css({'transform':'rotate(90deg)'})
        })

    


        

        function movePacman(e) {
            
            if(e.keyCode == 37) {
                
                socket.emit('key_37', {keyCode: e.keyCode})
                
            } 
            else if(e.keyCode == 38) {
                socket.emit('key_38', {keyCode: e.keyCode});
            }
            else if(e.keyCode == 39) {
                
                socket.emit('key_39', {keyCode: e.keyCode});
            }
            else if(e.keyCode == 40) {
                socket.emit('key_40', {keyCode: e.keyCode});
            }

            coins()
            // gameOver()
        }


        console.log(data.player)

        if(player_1 == data.player) {
            document.addEventListener('keydown', movePacman)
        }
        
        //// COINS ////
        function coins() {
            if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
                console.log(pacmanCurrentIndex)
                socket.emit('eat', {pacmanCurrentIndex: pacmanCurrentIndex})
                
                squares[pacmanCurrentIndex].classList.remove('pac-dot');
            }
        }

        socket.on('game', function(data) {
        //    $('#gameover').text('Game Over Ghost Wins')
            $('#results').fadeIn(1000)
           $('#results').text('Game Over: Ghost Wins')
        });

    })

    ///////////////////////////////////////////////// PLAYER 2: GHOST /////////////////////////////////////////////////////////

    socket.on('ghost_index', function(data) {
        console.log(`player 2:`,socket.id)
        console.log(data)
        let player_2 = socket.id

        let ghost_index = data.ghost_index;
        const width = 28;
        squares[ghost_index].classList.add('blinky')

        socket.on('ghost_update_key_37', function(data) {
            squares[ghost_index].classList.remove('blinky')
            console.log(player_2)
            if (ghost_index % width != 0 && !squares[ghost_index - 1].classList.contains('wall')) {
                ghost_index = data.index;
            }
            squares[ghost_index].classList.add('blinky')
        })

        socket.on('ghost_update_key_38', function(data) {
            squares[ghost_index].classList.remove('blinky')
           console.log(player_2)
            if (ghost_index - width >= 0 && !squares[ghost_index - width].classList.contains('wall')) {
                ghost_index = data.index
            }
            squares[ghost_index].classList.add('blinky')
        })

        socket.on('ghost_update_key_39', function(data) {
            squares[ghost_index].classList.remove('blinky')
            console.log(player_2)
            if (ghost_index % width < width - 1 && !squares[ghost_index + 1].classList.contains('wall')) {
                ghost_index = data.index;
            }
            squares[ghost_index].classList.add('blinky')
        })

        socket.on('ghost_update_key_40', function(data) {
            squares[ghost_index].classList.remove('blinky')
            console.log(player_2)
            if (ghost_index + width < width * width && !squares[ghost_index + width].classList.contains('wall')) {
                ghost_index = data.index;
            }
            squares[ghost_index].classList.add('blinky')
        })

        function moveGhost(e) {
           
            if(e.keyCode == 37) {
                console.log(player_2)
                socket.emit('ghost_key_37', {keyCode: e.keyCode})
                console.log(data.player)
            } 
            else if(e.keyCode == 38) {
                socket.emit('ghost_key_38', {keyCode: e.keyCode});
            }
            else if(e.keyCode == 39) {
                socket.emit('ghost_key_39', {keyCode: e.keyCode});
            }
            else if(e.keyCode == 40) {
                socket.emit('ghost_key_40', {keyCode: e.keyCode});
            }
            gameOver()
        }

        console.log(data.player)
        
        if(player_2 == data.player) {
            document.addEventListener('keydown', moveGhost)
        }

        function gameOver() {
            console.log(123)
            if(squares[ghost_index].classList.contains('pac-man')) {
                socket.emit('gameover', {ghost_index:ghost_index})
                console.log('game over')
            }
        }

        

        socket.on('remove_dot', function(data) {
            squares[data.pacmanCurrentIndex].classList.remove('pac-dot');
            $('#score > span').text(data.score)
            if(data.score == 19) {
                $('#results').fadeIn(1000)
                $('#results').text('Game Over: PacMan Wins')
            }

        })  
        
    })

    

    

    
    
});