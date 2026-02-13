import { config } from '../config';

export function createPeerConnection({ 
  onIceCandidate, 
  onDataChannel, 
  onStateChange 
}) {
  const pc = new RTCPeerConnection(config);
  
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate?.(event.candidate);
    }
  };
  
  pc.ondatachannel = (event) => {
    onDataChannel?.(event.channel);
  };
  
  pc.onconnectionstatechange = () => {
    console.log('[Peer] State changed to:', pc.connectionState);
    onStateChange?.(pc.connectionState);
  };
  
  return {
    async createOffer() {
      const channel = pc.createDataChannel('files');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      return { offer: pc.localDescription, channel };
    },
    
    async handleOffer(offer) {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      return pc.localDescription;
    },
    
    async handleAnswer(answer) {
      await pc.setRemoteDescription(answer);
    },
    
    async addIceCandidate(candidate) {
      await pc.addIceCandidate(candidate);
    },
    
    close() {
      pc.close();
    }
  };
}



