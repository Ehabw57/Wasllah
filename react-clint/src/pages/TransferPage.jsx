import { FileInput } from "../components/FileInput";
import { TransferCard } from "../components/TransferCard";

export function TransferPage({
  connectedDevice,
  transfers,
  onSendFile,
  onDisconnect,
  onClearCompleted,
}) {
  const activeTransfers = transfers.filter((t) => t.status !== "completed");
  const completedTransfers = transfers.filter((t) => t.status === "completed");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Connection Status */}
      <div className="bg-success-light border border-success rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-success rounded-full animate-pulse" />
          <span className="text-success">
            متصل بـ {connectedDevice?.name}
          </span>
        </div>
        <button
          onClick={onDisconnect}
          className="text-danger hover:text-danger text-sm"
        >
          قطع الاتصال
        </button>
      </div>

      <FileInput onFile={onSendFile} />

      {activeTransfers.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary mb-3">النقل الجاري</h3>
            <div className="space-x-3">
              <button className="text-sm text-primary bg-primary-light px-3 py-.5 rounded-lg">
                إلغاء الجميع
              </button>
              <button
                onClick={onClearCompleted}
                className="text-sm text-text-muted hover:text-text-secondary"
              >
                مسح المكتمل
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {activeTransfers.map((transfer) => (
              <TransferCard key={transfer.id} transfer={transfer} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Transfers */}
      {completedTransfers.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3"></div>
          <div className="space-y-3">
            {completedTransfers.map((transfer) => (
              <TransferCard key={transfer.id} transfer={transfer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
