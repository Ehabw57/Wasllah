import { config } from '../config';

export function createSignaling({ onMessage, onOpen, onClose, onError }) {
  const socket = new WebSocket(config.signalingServer);
  
  socket.onopen = () => {
    console.log('[Signaling] Connected');
    onOpen?.();
  };
  
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessage?.(message);
  };
  
  socket.onclose = () => {
    console.log('[Signaling] Disconnected');
    onClose?.();
  };
  
  socket.onerror = (error) => {
    console.error('[Signaling] Error:', error);
    onError?.(error);
  };
  
  return {
    send: (message) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    close: () => socket.close(),
    isOpen: () => socket.readyState === WebSocket.OPEN,
  };
}

export function getDeviceName() {
  const ua = navigator.userAgent;
  let os = 'Device';
  
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS/i.test(ua)) os = 'Mac';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  
  const id = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${os} - ${id}`;
}