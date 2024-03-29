const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const morgan = require("morgan");
const router = require("./routes/index");

dotenv.config({ path : "../.env" });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("jwt-secret", process.env.KEY);

app.use("/", router);

db = require("./models/index");
    db.mongoose.connect(process.env.URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true, 
            // useFindAndModify: false,
        }).then(() => {
            console.log('MongoDB 연결 성공')})
        .catch((err) => {
            console.error(err);
        });
        require("./models");

http.listen(PORT, () => {
    console.log(PORT, "번 포트에서 대기 중");
});


// let rooms = [];
// let roomName;

// let num = [];
// let count = 0;

// app.get('/', (req, res) => {
//     console.log("유저가 접속했니다.");
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket)=>{
//     socket.on('request_message', (msg) => {
//         // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
//         io.emit('response_message', '익명 : ' +  msg);
//     });

//     socket.on("req_join_room", async (msg) => {
//         roomName = 'Room_' + msg;
//         if(!rooms.includes(roomName)) {
//             rooms.push(roomName);
//         }

//         num.push(count++);
//         const number = num[num.length - 1];
        
//         socket.join(roomName);
//         io.to(roomName).emit('noti_join_room', number + "번 님이 방에 입장하셨습니다.");
//     });

//     socket.on("req_room_message", async(msg) => {
//         // let userCurrentRoom = getUserCurrentRoom(socket);
//         const number = num[num.length - 1];

//         io.to(roomName).emit('noti_room_message', number + ' : ' + msg);
//     });

//     socket.on('disconnect', async () => {
//         console.log('유저 연결 끊김');
//     });
// });

// // function getUserCurrentRoom(socket){
// //     let currentRoom = '';
// //     let socketRooms = Object.keys(socket.rooms);

// //     for(let i = 0 ; i < socketRooms.length; i++) {
// //         if(socketRooms[i].indexOf('Room_') !== -1) {
// //             currentRoom = socketRooms[i];
// //             break;
// //         } 
// //     }
// //     return currentRoom;
// // }