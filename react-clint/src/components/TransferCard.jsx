import { FaFileImage } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { MdFolderZip } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
export function TransferCard({ transfer }) {
  const isComplete = transfer.status === "completed";
  const icon = (() => {
    const ext = transfer.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(ext))
      return <FaFileImage size={20} className="text-blue-800 " />;
    if (["mp4", "avi", "mkv"].includes(ext))
      return <FaFileVideo size={20} className="text-gray-800" />;
    if (["mp3", "wav", "ogg"].includes(ext))
      return <MdAudioFile size={20} className="text-yellow-900" />;
    if (ext === "pdf") return <FaFilePdf size={20} className="text-red-700" />;
    if (["zip", "rar"].includes(ext))
      return <MdFolderZip size={20} className="text-gray-800" />;
    if (["txt", "doc", "docx"].includes(ext))
      return <FaFileAlt size={20} className="text-gray-800" />;
    return <FaFile size={20} className="text-gray-800" />;
  })();

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-md ${isComplete ? " opacity-50" : ""}`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex justify-center items-center">
          {icon}
        </div>
        <div className="mr-3">
          <h3 className="font-semibold text-sm">{transfer.name}</h3>
          <p className="font-normal text-gray-500 text-sm">{transfer.size}</p>
        </div>
        <div
          className={`mr-auto ${isComplete ? "text-green-600" : "text-gray-500"}`}
        >
          {!isComplete ? (
            <>
              <p className="font-bold text-sm text-blue-600 text-left">
                {transfer.progress}%
              </p>
              <p className="font-normal text-gray-400 text-sm">متبقي 5 ثواني</p>
            </>
          ) : (
            <MdOutlineDone size={20} />
          )}
        </div>
      </div>

      {!isComplete && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all"
            style={{ width: `${transfer.progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
