import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";

export default function DeviceList({ devices = [], onConnect }) {
  return (
    <>
      {/* Devices Grid */}
      {devices.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          <MdOutlineDevices size={50} className="mx-auto mb-4" />
          <p>لا توجد أجهزة متاحة</p>
          <p className="text-sm mt-2">
            تأكد من أن الأجهزة الأخرى متصلة بنفس الشبكة
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-text-primary mb-4">
            الأجهزة المكتشفة
            <span className="text-sm font-normal text-text-secondary">
              {" "}
              ({devices.length} أجهزة متاحة)
            </span>
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
  let type;
  let platform = device.name.split(" - ")[0];
  switch (platform) {
    case "Android":
    case "iOS":
      icon = <FaMobileAlt size={30} className="text-secondary" />;
      type = "جهاز محمول";
      break;
    case "Windows":
    case "macOS":
    case "Linux":
      icon = <FaDesktop size={30} className="text-secondary" />;
      type = "جهاز حاسوب";
      break;
    default:
      icon = <MdOutlineDevices size={30} className="text-secondary" />;
      type = "جهاز غير معروف";
  }
  return (
    <div className=" bg-surface rounded-3xl px-4 py-4 shadow-sm flex items-center justify-start">
      <div className="w-15 h-15 bg-muted rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div className="mr-4">
        <h4 className="text-md font-bold text-text-primary">{device.name}</h4>
        <span className="text-xs text-success py-1 ">{type}</span>
      </div>

      <button
        onClick={() => onConnect(device)}
        className="text-sm font-semibold bg-primary hover:bg-primary-hover mr-auto w-20 text-white py-2 px-2 rounded-2xl"
      >
        توصيل
      </button>
    </div>
  );
}
