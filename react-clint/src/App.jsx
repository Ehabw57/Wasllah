import { useState } from "react";
import DeviceList from "./components/DeviceCard";
import Searching from "./components/Searching";
import { FileInput } from "./components/FileInput";

function App() {
  const [connected, setConnected] = useState(false);
  const devices = [
    { id: 1, name: "Xiaomi C67", platform: "Android" },
    { id: 2, name: "iPhone 12", platform: "iOS" },
    { id: 3, name: "Dell XPS 15", platform: "Windows" },
    { id: 4, name: "MacBook Pro", platform: "macOS" },
    { id: 5, name: "Ubuntu Laptop", platform: "Linux" },
  ];

  return (
    <>
      <h1>{connected ? "متصل" : "غير متصل"}</h1>
      {/* <Searching />
      <DeviceList /> */}
      <FileInput onFile={(file) => console.log("Received file:", file)}  />
    </>
  );
}

export default App;
