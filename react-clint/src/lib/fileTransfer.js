import { config } from "../config";

export async function sendFile(channel, file, onProgress) {
  channel.send(
    JSON.stringify({
      type: "file-start",
      name: file.name,
      size: file.size,
    }),
  );

  const buffer = await file.arrayBuffer();
  const totalChunks = Math.ceil(buffer.byteLength / config.chunkSize);
  let sentChunks = 0;

  for (
    let offset = 0;
    offset < buffer.byteLength;
    offset += config.chunkSize
  ) {
    while (channel.bufferedAmount > config.bufferLimit) {
        console.log('[Sender] Buffer full, waiting...');
      await waitForBuffer(channel); 
    }

    const chunk = buffer.slice(offset, offset + config.chunkSize);
    channel.send(chunk);
    sentChunks++;

    const progress = Math.round((sentChunks / totalChunks) * 99);
    onProgress?.(progress);
  }

  channel.send(JSON.stringify({ type: "file-end" }));
  onProgress?.(99);
}

async function waitForBuffer(channel) {
  if (channel.bufferedAmount <= config.bufferLimit) {
    return;
  }
  
  return new Promise((resolve) => {
    channel.onbufferedamountlow = () => {
      channel.onbufferedamountlow = null;
      resolve();
    };
  });
}

export function createFileReceiver(onProgress, onComplete, onMessage) {
  let metadata = null;
  let chunks = [];
  let receivedBytes = 0;

  return {
    handleMessage(data) {
      if (typeof data === "string") {
        const message = JSON.parse(data);

        if (message.type === "file-start") {
          console.log('[Receiver] File transfer started:', message.name, message.size);
          metadata = message;
          chunks = [];
          receivedBytes = 0;
          onProgress?.(0, message.name, message.size);
        }

        if (message.type === "file-end" && metadata) {
          const blob = new Blob(chunks);
          downloadBlob(blob, metadata.name);
          onComplete?.(metadata);
          metadata = null;
          chunks = [];
        }
        // todo implemnted cancel transfer
        onMessage?.(message);
        return;
      }


      if (metadata) {
        chunks.push(data);
        receivedBytes += data.byteLength;
        onProgress?.(receivedBytes, metadata.name, metadata.size);
      }
    },
  };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}