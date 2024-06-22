module.exports = function withErrorHandling(socket, handler) {
  return async (...args) => {
    try {
      await handler(...args);
    }
    catch (error) {
      console.error('Error handling socket event:', error.message);
      socket.emit('error', { message: error.message });
    }
  };
};
