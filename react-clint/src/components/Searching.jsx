import { IoMdWifi } from "react-icons/io";

export default function Searching({ className }) {
  return (
    <div
      className={`flex flex-col h-100 justify-center items-center ${className}`}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-100 relative w-20 h-20 flex items-center rounded-full p-4 shadow-lg"> 
          <IoMdWifi size={40} className="mx-auto text-blue-400 " />
          <div className="inset-0 absolute  rounded-full border-blue-500 animate-ping [animation-duration:3s] "></div>
          <div className="inset-0 absolute  rounded-full  border-blue-500 animate-ping [animation-duration:3s] [animation-delay:.5s]"></div>
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mt-4">
        جاري البحث عن الأجهزة...
      </h3>
      <p className="text-gray-400 max-w-110 text-md text-center">
        تأكد من أن الأجهزة الأخري متصلة بنفس الشبكة المحلية ومفمتوحه علي
        التطبيق.
      </p>
    </div>
  );
}
