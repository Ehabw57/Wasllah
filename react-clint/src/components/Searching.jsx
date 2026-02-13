import { RiScan2Line } from "react-icons/ri";

export default function Searching({ className }) {
  return (
    <div
      className={`flex flex-col h-100 justify-center items-center shadow-sm px-2 ${className}`}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-neutral-50 relative w-20 h-20 flex items-center rounded-full p-4 shadow-md"> 
          <RiScan2Line size={40} className="mx-auto text-primary " />
          <div className="inset-0 absolute  rounded-full border-primary animate-ping [animation-duration:2s] "></div>
          <div className="inset-0 absolute  rounded-full  border-primary animate-ping [animation-duration:2s] [animation-delay:.9s]"></div>
        </div>
      </div>
      <h3 className="text-lg font-bold text-text-primary mt-15">
        جاري البحث عن الأجهزة...
      </h3>
      <p className="text-text-secondary max-w-110 text-md text-center">
        تأكد من أن الأجهزة الأخري متصلة بنفس الشبكة المحلية ومفمتوحه علي
        التطبيق.
      </p>
    </div>
  );
}
