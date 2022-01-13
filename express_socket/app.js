const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8000;
let rooms = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
    socket.on('request_message', (msg) => {
        // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
        io.emit('response_message', msg);
    });

    socket.on("req_join_room", async (msg) => {
        let roomName = 'Room_' + msg;
        if(!rooms.includes(roomName)) {
            rooms.push(roomName);
        } else { }
        socket.join(roomName);
        io.to(roomName).emit('noti_join_room', "방에 입장하셨습니다.");
    });

    socket.on("req_room_message", async(msg) => {
        let userCurrentRoom = getUserCurrentRoom(socket);
        io.to(userCurrentRoom).emit('noti_room_message', msg);
    });

    socket.on('disconnect', async () => {
        console.log('유저 연결 끊김');
    });
});

function getUserCurrentRoom(socket){
    let currentRoom = '';
    let socketRooms = Object.keys(socket.rooms);

    for(let i = 0 ; i < socketRooms.length; i++) {
        if(socketRooms[i].indexOf('Room_') !== -1) {
            currentRoom = socketRooms[i];
            break;
        } 
    }
    return currentRoom;
}

http.listen(PORT, () => {
    console.log(PORT, "번 포트에서 대기 중");
});