import { useState, useEffect, useCallback, useRef } from "react";
import { createSignaling, getDeviceName } from "../lib/signaling";
import { createPeerConnection } from "../lib/webRTC";
import { sendFile, createFileReceiver } from "../lib/fileTransfer";
import { config } from "../config";

export function useWasslah() {
  const [status, setStatus] = useState("discovering");
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [transfers, setTransfers] = useState([]);

  const signalingRef = useRef(null);
  const peerRef = useRef(null);
  const channelRef = useRef(null);
  const deviceName = useRef(getDeviceName());

  const addTransfer = useCallback((id, name, size, direction) => {
    setTransfers((prev) => [
      ...prev,
      { id, name, size, progress: 0, status: "active", direction, transferred: 0 },
    ]);
  }, []);

  const updateProgress = useCallback((id, progress, transferred) => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, progress, transferred } : t)),
    );
  }, []);

  const completeTransfer = useCallback((id) => {
    setTransfers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "completed", progress: 100 } : t,
      ),
    );
  }, []);

  const handleSignalingMessage = useCallback(
    async (message) => {
      switch (message.type) {
        case "connectedClients":
          setDevices(message.clients || []);
          break;

        case "connection":
          setDevices((prev) => [
            ...prev,
            { id: message.id, name: message.name },
          ]);
          break;

        case "disconnection":
          setDevices((prev) => prev.filter((d) => d.id !== message.id));
          if (connectedDevice?.id === message.id) {
            setStatus("discovering");
            setConnectedDevice(null);
          }
          break;

        case "offer":
          await handleIncomingOffer(message);
          break;

        case "answer":
          await peerRef.current?.handleAnswer(message.answer);
          break;

        case "ice-candidate":
          await peerRef.current?.addIceCandidate(message.candidate);
          break;
      }
    },
    [peerRef],
  );

  const setupPeer = useCallback(
    (targetId) => {
      peerRef.current = createPeerConnection({
        onIceCandidate: (candidate) => {
          signalingRef.current?.send({
            type: "ice-candidate",
            candidate,
            targetId,
          });
        },
        onDataChannel: (channel) => {
          setupDataChannel(channel);
        },
        onStateChange: (state) => {
          if (state === "connected") setStatus("connected");
          if (state === "disconnected" || state === "failed") {
            console.log('[Peer] Connection lost');
            setConnectedDevice(null);
            channelRef.current?.close();
            channelRef.current = null;
            peerRef.current?.close();
            peerRef.current = null;
            setTransfers([]);
            setStatus("discovering");
          }
        },
      });
    },
    [peerRef],
  );

  const setupDataChannel = useCallback(
    (channel) => {
      console.log("[DataChannel] Channel opened");
      channel.binaryType = "arraybuffer";
      channel.bufferedAmountLowThreshold = config.bufferLimit;

      channelRef.current = channel;

      const receiver = createFileReceiver(
        (recived, name, size) => {
          const id = `recv-${name}`;
          if (recived === 0) {
            ("[progress]: Starting new transfer for", recived);
            addTransfer(id, name, size, "receive");
          } else {
            updateProgress(id, Math.round((recived / size) * 100), recived);
          }
        },
        (metadata) => {
          completeTransfer(`recv-${metadata.name}`);
        },
        (data) => {
            console.log('[Receiver] Message received:', data);
            if(data.type ==='disconnect') {
                setConnectedDevice(null);
                channelRef.current?.close();
                channelRef.current = null;
                peerRef.current?.close();
                peerRef.current = null;
                setTransfers([]);
                setStatus('discovering');
            }
        }
      );

      channel.onmessage = (event) => receiver.handleMessage(event.data);
    },
    [addTransfer, updateProgress, completeTransfer], 
  );

  const handleIncomingOffer = useCallback(
    async (message) => {
      const device = devices.find((d) => d.id === message.from);
      if (device) {
        setConnectedDevice(device);
      }

      setupPeer(message.from);
      const answer = await peerRef.current.handleOffer(message.offer);

      signalingRef.current?.send({
        type: "answer",
        answer,
        targetId: message.from,
      });
    },
    [devices, setupPeer],
  );

  const connectToDevice = useCallback(
    async (device) => {
      setConnectedDevice(device);
      setupPeer(device.id);

      const { offer, channel } = await peerRef.current.createOffer();
      setupDataChannel(channel);

      signalingRef.current?.send({
        type: "offer",
        offer,
        targetId: device.id,
      });
    },
    [setupPeer, setupDataChannel],
  );

  const sendFileToDevice = useCallback(
    async (file) => {
      if (!channelRef.current || channelRef.current.readyState !== "open") {
        console.error("Data channel not open");
        return;
      }

      const id = `send-${file.name}-${Date.now()}`;
      addTransfer(id, file.name, file.size, "send");

      await sendFile(channelRef.current, file, (progress, transferred) => {
        updateProgress(id, progress, transferred);
      });

      completeTransfer(id);
    },
    [addTransfer, updateProgress, completeTransfer],
  );

  const disconnect = useCallback(() => {
    channelRef?.current?.send(JSON.stringify({ type: "disconnect" }));
    setStatus("discovering");
  }, []);

  const clearCompleted = useCallback(() => {
    setTransfers((prev) => prev.filter((t) => t.status !== "completed"));
  }, []);

  useEffect(() => {
    signalingRef.current = createSignaling({
      onOpen: () => {
        signalingRef.current?.send({
          type: "auth",
          name: deviceName.current,
        });
      },
      onMessage: handleSignalingMessage,
    });

    return () => {
      signalingRef.current?.close();
      peerRef.current?.close();
    };
  }, [handleSignalingMessage]);

  return {
    status,
    devices,
    connectedDevice,
    transfers,
    deviceName: deviceName.current,

    connectToDevice,
    sendFile: sendFileToDevice,
    disconnect,
    clearCompleted,
  };
}
