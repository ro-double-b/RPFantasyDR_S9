import Peer from 'peerjs';

const peer = new Peer({ key: 'dyf2h2fyul2nvcxr' });

// Returns a Promise that is resolved with this peer's ID, assigned by the signaling server.
const getMyId = () => new Promise((resolve, reject) => {
  peer.on('open', resolve);
  peer.on('error', reject);
});

// Returns a Promise that is resolved with an active peer.js DataConnection.
// If sourceId is specified, this will connect to an existing peer with that source ID.
// If sourceId is not specified, this will listen for an incoming connection.
const establishPeerConnection = (sourceId) => new Promise((resolve, reject) => {
  const connect = () => {
    if (sourceId) {
      const conn = peer.connect(sourceId, { reliable: true });

      conn.on('open', () => {
        console.log('RTC data connection established - acting as receiver');
        resolve(conn);
      });

      conn.on('error', (error) => {
        reject(error);
      });
    } else {
      peer.on('connection', (conn) => {
        conn.on('open', () => {
          console.log('RTC data connection established - acting as source');
          resolve(conn);
        });
      });

      peer.on('error', (error) => {
        reject(error);
      });
    }
  };

  peer.on('open', connect);
  peer.on('error', reject);
});

export {
  getMyId,
  establishPeerConnection,
};
