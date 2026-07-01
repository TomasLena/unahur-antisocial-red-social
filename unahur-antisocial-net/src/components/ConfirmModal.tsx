interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div className="bg-black border border-[#33ff00] p-12 w-full max-w-2xl relative shadow-[0_0_20px_rgba(51,255,0,0.2)] overflow-hidden">
        
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(51, 255, 0, 0.4) 50%)`,
            backgroundSize: '100% 4px'
          }}
        />

        <div className="relative z-20">
          <h3 className="text-[#33ff00] font-mono mb-10 uppercase tracking-widest text-center text-xl">
            {title}
          </h3>
          
          <div className="flex justify-center gap-12">
            <button
              onClick={onClose}
              className="text-[#33ff00] border border-[#33ff00] px-8 py-2 uppercase font-bold text-lg transition-all duration-200 
              hover:bg-[#33ff00] hover:text-black hover:shadow-[0_0_15px_#33ff00] active:scale-95"
            >
              NO
            </button>
            <button
              onClick={onConfirm}
              className="text-red-500 border border-red-500 px-8 py-2 uppercase font-bold text-lg transition-all duration-200 
              hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_#ef4444] active:scale-95"
            >
              [X] CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}