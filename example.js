const deviceListener = require('./index.js');

const config = {
  iface: 'en0',
  devices: {
    '18:f6:43:7e:62:fc': {
      webhook: 'http://localhost:3000/sockets/5ccf7f22703d/toggle'
    }
  }
};

deviceListener.startServer(config);
