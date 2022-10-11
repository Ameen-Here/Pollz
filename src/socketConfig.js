import io from "socket.io-client";

const socket = io("http://localhost:3001");
// "https://radiant-waters-34183.herokuapp.com"

export default socket;
