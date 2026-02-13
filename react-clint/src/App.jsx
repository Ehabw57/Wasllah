import Navbar from "./components/Navbar";
import { TransferCard } from "./components/TransferCard";
import { useWasslah } from "./hooks/useWasllah";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { TransferPage } from "./pages/TransferPage";

function App() {
  const wasslah = useWasslah();
  console.log("APP RERENDERD :");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-8 px-4 md:px-6 lg:px-15 xl:px-30">
        {wasslah.status === "discovering" ? (
          <DiscoveryPage
            devices={wasslah.devices}
            deviceName={wasslah.deviceName}
            onConnect={wasslah.connectToDevice}
          />
        ) : (
          <TransferPage
            connectedDevice={wasslah.connectedDevice}
            transfers={wasslah.transfers}
            onSendFile={wasslah.sendFile}
            onDisconnect={wasslah.disconnect}
            onClearCompleted={wasslah.clearCompleted}
          />
        )}
      </div>
    </>
  );
}

export default App;
