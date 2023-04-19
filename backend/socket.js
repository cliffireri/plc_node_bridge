const { Server } = require("socket.io");

let io;

const init = function(server, options) {
    io = new Server(server, options);
    return io;
}

const getIO = function() {
   if(!io) {
    throw new Error("Can't get io instance before callong init")
   }

   return io;
}

module.exports = { init, getIO }