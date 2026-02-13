import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";


export default function DeviceList({ devices = [], onConnect }) {
  return (
    <>
      {/* Devices Grid */}
      {devices.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <MdOutlineDevices size={50} className="mx-auto mb-4" />
          <p>لا توجد أجهزة متاحة</p>
          <p className="text-sm mt-2">
            تأكد من أن الأجهزة الأخرى متصلة بنفس الشبكة
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            الأخهزة المكتشفة
           <span className="text-sm font-normal text-gray-500"> ({devices.length} أجهزة متاحة)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onConnect={onConnect}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function DeviceCard({ device, onConnect }) {
  let icon;
  let platform = device.name.split(" - ")[0];
  switch (platform) {
    case "Android":
    case "iOS":
      icon = <FaMobileAlt size={20} className="text-gray-500" />;
      break;
    case "Windows":
    case "macOS":
    case "Linux":
      icon = <FaDesktop size={20} className="text-gray-500" />;
      break;
    default:
      icon = <MdOutlineDevices size={20} className="text-gray-500" />;
  }
  return (
    <div className=" bg-white rounded-3xl px-4 py-6 shadow-sm flex items-center justify-start">
      <div className="w-15 h-15 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="mr-4">
        <h4 className="text-md font-bold text-gray-800">{device.name}</h4>
        <span className="text-xs text-green-600 py-1 ">
          {`جهاز ${platform ? platform : "غير معروف"}`}
        </span>
      </div>

      <button
        onClick={() => onConnect(device)}
        className="font-semibold bg-blue-500 hover:bg-blue-600 mr-auto w-24 text-white py-2 px-5 rounded-full"
      >
        توصيل
      </button>
    </div>
  );
}
