import { FaMobileAlt } from "react-icons/fa";
export function DeviceCard({ device, onConnect }) {
  return (
    <div className=" bg-white rounded-xl px-4 py-6 shadow-sm flex items-center justify-start">
      <div className="w-15 h-15 bg-gray-100 rounded-lg flex items-center justify-center">
        <FaMobileAlt className="text-gray-500" size={20} />
      </div>
      <div className="mr-4">
        <h4 className="text-md font-bold text-gray-800">{device.name}</h4>
        <span className="text-xs text-green-600 py-1 ">
          {`جهاز ${device.platform ? device.platform : "غير معروف"}`}
        </span>
      </div>

      <button
        onClick={() => onConnect(device)}
        className="bg-blue-500 hover:bg-blue-600 mr-auto w-20 text-white py-2 px-5 rounded-2xl"
      >
        توصيل
      </button>
    </div>
  );
}
