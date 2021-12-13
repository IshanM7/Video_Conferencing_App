const express = require('express')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')


app.set('view engine','ejs');
app.use(express.static('public'))

app.get('/meeting/chat/',(req,res) =>{
    res.redirect(`/meeting/chat/${uuidV4()}`)
})

app.get('/meeting/chat/:room',(req,res)=>{
    
    if(req.query.host == "true"){
        res.render('Hostroom',{roomId: req.params.room})
        console.log("Host");
    }else{
        res.render('room',{roomId: req.params.room})
        console.log("Guest");
    }
})

io.on('connection', socket => {
    socket.on('join-room',(roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
    })

    socket.on('initiate', () => {
        io.emit('initiate');
      });
})

server.listen(5000)