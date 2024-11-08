
const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const chatRoutes = require("./Routes/chatRoutes");
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoutes')
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errrorMIddleware");
const { Socket } = require("socket.io");



dotenv.config();
connectDB();
const app = express();


app.use(express.json())
app.use(
    cors({
     origin: JSON.parse(["http://localhost:3000", "https://devgupta0513.github.io"]),
      credentials: true,
      maxAge: 14400,
    })
  );

app.get('/', (req, res) => {
    res.json({
        "NAME":"BACKEND OF LinkUs",
    });
})

app.use('/api/user', (userRoutes))
app.use('/api/chat', (chatRoutes))
app.use('/api/message', (messageRoutes))

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT

const server = app.listen(5000, console.log(`server started on port ${PORT}`.blue.bold))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "https://devgupta0513.github.io",
        
    },
});


io.on("connection", (socket) => {
    console.log("Connected to socket.io".bgBlue.italic);
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
