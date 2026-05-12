interface DeleteItemModalProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
  onDelete: () => void;
}

function DeleteItemModal({ message, onClose, isOpen, onDelete }: DeleteItemModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[var(--lightest_pink)] rounded-3xl shadow-2xl p-8 w-96 max-w-[90vw] flex flex-col gap-6 items-center animate-in fade-in zoom-in-70 duration-300">
        {/* Message */}
        <div className="text-center text-lg font-medium text-[var(--darker_pink)]">
          {message}
        </div>
        
        {/* OK Button */}
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 bg-pink-dark text-pink-light font-medium text-lg px-6 py-3 rounded-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-lg select-none"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-pink-dark text-pink-light font-medium text-lg px-6 py-3 rounded-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-lg select-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteItemModal