export const environment = {
  production: true,
  wsEndpoint: 'wss://localhost:8081',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'turn:turnserver:3478',
        username: 'user',
        credential: 'password'
      }
    ]
  }
};