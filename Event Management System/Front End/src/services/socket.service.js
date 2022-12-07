import socketIOClient from 'socket.io-client'

export default {
  socket: null,
  connect: function () {    
    if (!this.socket) {
      this.socket = socketIOClient(process.env.REACT_APP_SOCKET_SERVER)
    }

    return this.socket
  },
}
