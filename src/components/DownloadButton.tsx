import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  label?: string;
}

function DownloadButton({ onClick, label = 'Baixar minhas respostas (PDF)' }: DownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#80298F] px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-[#6c2178]"
    >
      <Download size={20} />
      {label}
    </button>
  );
}

export default DownloadButton;
