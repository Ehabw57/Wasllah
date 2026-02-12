import { useState } from "react";
import { FileInput } from "./components/FileInput";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { TransferPage } from "./pages/TransferPage";

function App() {
  const [connected, setConnected] = useState(false);
  const connectedDevice = { name: "Xiaomi C67", platform: "Android" };

  const devices = [
    { id: 1, name: "Xiaomi C67", platform: "Android" },
    { id: 2, name: "iPhone 12", platform: "iOS" },
    { id: 3, name: "Dell XPS 15", platform: "Windows" },
    { id: 4, name: "MacBook Pro", platform: "macOS" },
    { id: 5, name: "Ubuntu Laptop", platform: "Linux" },
  ];

  const transfers = [
    {
      id: 0,
      progress: 80,
      name: "file0.zip",
      size: "20 MB",
      status: "in_progress",
      direction: "send",
    },
    {
      id: 1,
      name: "file1.jpg",
      progress: 100,
      status: "completed",
      direction: "send",
    },
    {
      id: 2,
      name: "file2.pdf",
      progress: 75,
      status: "in_progress",
      direction: "receive",
    },
    {
      id: 3,
      name: "file3.mp4",
      progress: 40,
      status: "in_progress",
      direction: "send",
    },
    {
      id: 4,
      name: "file4.mp3",
      progress: 0,
      status: "pending",
      size: "5 MB",
      direction: "receive",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3" dir="rtl">
      <button onClick={() => setConnected((prev) => !prev)}>
        {connected ? "Disconnect" : "Connect"}
      </button>
      {!connected ? (
        <DiscoveryPage devices={devices} onConnect={(device) => console.log(device)} />
      ) : (
        <TransferPage
          connectedDevice={connectedDevice}
          transfers={transfers}
          onSendFile={(file) => {
            console.log("send file", file);
          }}
          onDisconnect={() => {
            console.log("disconnect");
          }}
          onClearCompleted={() => {
            console.log("clear completed");
          }}
        />
      )}
    </div>
  );
}

export default App;
