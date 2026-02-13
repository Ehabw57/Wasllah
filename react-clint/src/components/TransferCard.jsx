import {
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFile,
  FaFileArchive,
  FaFilePdf,
  FaFileAlt,
} from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { formatBytes } from "../utils/formaters";

export function TransferCard({ transfer }) {
  const isComplete = transfer.status === "completed";
  const icon = (() => {
    const ext = transfer.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(ext))
      return <FaFileImage size={20} className="text-primary " />;
    if (["mp4", "avi", "mkv"].includes(ext))
      return <FaFileVideo size={20} className="text-text-primary" />;
    if (["mp3", "wav", "ogg"].includes(ext))
      return <FaFileAudio size={20} className="text-warning" />;
    if (ext === "pdf") return <FaFilePdf size={20} className="text-danger" />;
    if (["zip", "rar"].includes(ext))
      return <FaFileArchive size={20} className="text-text-primary" />;
    if (["txt", "doc", "docx"].includes(ext))
      return <FaFileAlt size={20} className="text-text-primary" />;
    return <FaFile size={20} className="text-text-primary" />;
  })();

  return (
    <div
      className={`bg-surface rounded-xl p-4 shadow-md ${isComplete ? " opacity-50" : ""}`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary-light rounded-lg flex justify-center items-center">
          {icon}
        </div>
        <div className="mr-3">
          <h3 className="font-semibold text-sm">{transfer.name}</h3>
          <p className="font-normal text-secondary text-xs">
            {isComplete
              ? formatBytes(transfer.size)
              : formatBytes(transfer.transferred)}{" "}
            من أصل {formatBytes(transfer.size)}
          </p>
        </div>
        <div
          className={`mr-auto ${isComplete ? "text-success" : "text-text-secondary"}`}
        >
          {!isComplete ? (
            <>
              <p className="font-bold text-sm text-primary text-left">
                {transfer.progress}%
              </p>
              <p className="font-normal text-text-muted text-sm">
                جاري {transfer.direction === "send" ? "الإرسال" : "الاستقبال"}
              </p>
            </>
          ) : (
            <MdOutlineDone size={20} />
          )}
        </div>
      </div>

      {!isComplete && (
        <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-3">
          <div
            className="bg-primary h-1.5 rounded-full transition-all"
            style={{ width: `${transfer.progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
