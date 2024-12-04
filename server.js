const express = require("express")
const {createServer} = require("node:http")
const {join} = require("node:path")
const socketio = require("socket.io")

const app = express();
// const server = createServer(app);

app.use(express.static(join(__dirname, "/public")))

const expressServer = app.listen(3000)
const io = socketio(expressServer)

io.on("connect", (socket) => {
    console.log(socket.id)

    socket.on("newMessage", (data) => {
        console.log(data)
        io.emit("newMessage", {
            ...data
        })
    })
})


// client_socket ===> server_socket_board