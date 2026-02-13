// All configuration in one simple file
export const config = {
  signalingServer: 'ws://192.168.1.72:3000',
  
  rtcConfig: {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  },
  
  chunkSize: 256 * 1024,      // 256KB per chunk
  bufferLimit: 512 * 1024,    // Pause when buffer exceeds 512KB
};