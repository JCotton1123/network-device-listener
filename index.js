const arpListener = require('arp-listener');
const request = require('request');

let logger = console;

let logDeviceMsg = (device, msg) => {
  logger.log(`(${device}) ${msg}`);
};

let startServer = (config) => {
  const devices = config.devices;
  const iface = config.iface || 'eth0';
  const timeout = config.timeout || 3000;
  let locks = {};

  logger.log('Device listener started');
  arpListener(iface, function (arpData) {
    var sender = arpData.sender_ha;
    if(sender in devices) {
      if(sender in locks) return;
      locks[sender] = true;

      logDeviceMsg(sender, 'device detected');
      let deviceConfig = devices[sender];

      if('callback' in deviceConfig) {
        return deviceConfig.callback(sender);
      }
      else if('webhook' in deviceConfig) {
        logDeviceMsg(sender, `calling webhook ${deviceConfig.webhook}`);
        request(deviceConfig.webhook, (error, res, body) => {
          logDeviceMsg(sender, 'webhook result ' + (error ? error : JSON.stringify(res))); 
        });
      }
      else {
        logDeviceMsg(sender, 'no action defined');
      }

      setTimeout(() => {
        delete locks[sender];
      }, timeout);
    }
  });
};

module.exports = {startServer: startServer};
