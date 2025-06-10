interface ViewToggleProps {
  is3D: boolean;
  onToggle: () => void;
}

export default function ViewToggle({ is3D, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
    >
      {/* 3D Icon */}
      <div
        className={`transition-all duration-300 ${
          !is3D ? "text-blue-600 scale-110" : "text-gray-400 scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9H21" />
          <path d="M9 21V9" />
        </svg>
      </div>

      {/* Toggle Switch */}
      <div className="relative w-14 h-7">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            is3D ? "from-blue-400 to-blue-600" : "from-gray-300 to-gray-400"
          } rounded-full transition-colors duration-300`}
        />
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            is3D ? "translate-x-7" : "translate-x-0"
          } flex items-center justify-center`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              is3D ? "bg-blue-600/20" : "bg-gray-400/20"
            }`}
          />
        </div>
      </div>

      {/* 2D Icon */}
      <div
        className={`transition-all duration-300 ${
          is3D ? "text-blue-600 scale-110" : "text-gray-400 scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3L3 8.5L12 14L21 8.5L12 3Z" />
          <path d="M3 15.5L12 21L21 15.5" />
          <path d="M3 12L12 17.5L21 12" />
        </svg>
      </div>
    </button>
  );
}
