import { useEffect } from 'react';

interface TerminalAlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function TerminalAlert({ message, type, onClose }: TerminalAlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isError = type === 'error';
    const borderColor = isError ? 'border-red-500' : 'border-[#33ff00]';
    const textColor = isError ? 'text-red-500' : 'text-[#33ff00]';
    const bgColor = isError ? 'bg-red-500/10' : 'bg-[#33ff00]/10';

    return (
        <div className={`fixed bottom-6 right-6 border-2 ${borderColor} ${bgColor} ${textColor} p-4 font-mono z-50 shadow-[0_0_15px_currentColor] animate-pulse`}>
        <div className="font-bold uppercase tracking-widest mb-2 border-b border-dashed border-current pb-1 flex justify-between gap-4">
            <span>{isError ? '[!] SYS_ERROR' : '[OK] SYS_SUCCESS'}</span>
            <button onClick={onClose} className="hover:bg-current hover:text-black px-1">X</button>
        </div>
        <div className="text-sm uppercase font-bold">
            &gt; {message}
        </div>
        </div>
    );
}