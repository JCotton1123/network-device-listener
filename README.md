# Network Device Listener

Use this library to execute a webhook or custom callback when a device joins your network.

For most home or small networks you can deploy this service anywhere in your network. For larger networks with multiple subnets you must put some consideration into where you deploy this service. Device detection is handled using an ARP listener so this service must be placed within the same subnet (broadcast domain) the device its listening for will join.

## Example

See [example.js](example.js).

