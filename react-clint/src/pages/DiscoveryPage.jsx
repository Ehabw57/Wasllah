import DeviceList from "../components/DeviceCard";
import Searching from "../components/Searching";

export function DiscoveryPage({ devices, onConnect, className }) {
  return (
    <div className={`max-w-[80%] mx-auto ${className}`}>
      <Searching className="mb-8 bg-white py-8 rounded-3xl" />

      <DeviceList devices={devices} onConnect={onConnect} />
    </div>
  );
}
