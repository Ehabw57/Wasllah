import { useState } from "react";
import DeviceList from "./components/DeviceCard";
import Searching from "./components/Searching";
import { FileInput } from "./components/FileInput";
import { TransferCard } from "./components/TransferCard";

function App() {
  const [connected, setConnected] = useState(false);
  const devices = [
    { id: 1, name: "Xiaomi C67", platform: "Android" },
    { id: 2, name: "iPhone 12", platform: "iOS" },
    { id: 3, name: "Dell XPS 15", platform: "Windows" },
    { id: 4, name: "MacBook Pro", platform: "macOS" },
    { id: 5, name: "Ubuntu Laptop", platform: "Linux" },
  ];

  const transfers = [
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
    <>
      <h1>{connected ? "متصل" : "غير متصل"}</h1>
      {/* <Searching />
      <DeviceList /> 
      <FileInput onFile={(file) => console.log("Received file:", file)}  /> */}
      {transfers.map((t) => (
        <TransferCard key={t.id} transfer={t} />
      ))}
    </>
  );
}

export default App;
