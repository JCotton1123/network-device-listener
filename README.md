# Network Device Listener

Use this application or library to execute a webhook or custom callback when a device joins your network.

## Deployment

For most home or small networks you can deploy this service anywhere in your network. For larger networks, with multiple subnets, this service must be deployed on the same subnet (broadcast domain) as the device you're listening for. This is b/c this service relies on ARP traffic to detect the device.
