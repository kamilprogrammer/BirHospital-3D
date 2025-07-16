import { useEffect } from "react";

interface FloorPanelProps {
  floor: number;
  setFloor: (floor: number) => void;
}

const floors = [
  {
    number: 0,
    icon: "0️⃣",
    name: "UnderGround Floor",
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
  },

  {
    number: 1,
    icon: "1️⃣",
    name: "First Floor",
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
  },
  {
    number: 2,
    icon: "2️⃣",
    name: "Second Floor",
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
  },
  {
    number: 3,
    icon: "3️⃣",
    name: "Third Floor",
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
  },
];

export default function FloorPanel({ floor, setFloor }: FloorPanelProps) {
  useEffect(() => {
    console.log(floor);
  }, [floor]);
  return (
    <div className="h-full bg-slate-900/95 backdrop-blur-xl p-5 border-r border-slate-800">
      <h2 className="text-sm font-bold mb-6 text-slate-300 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        Floor Selection
      </h2>
      <div className="space-y-4">
        {floors.map((floorObj) => (
          <button
            key={floorObj.number}
            onClick={() => {
              setFloor(floorObj.number);
            }}
            className={`w-full group relative overflow-hidden rounded-xl transition-all duration-500 ${
              floorObj.number === floor
                ? `${floorObj.color} ring-2 ring-white/10 shadow-lg`
                : `bg-slate-800/50 ${floorObj.hoverColor} text-slate-300`
            }`}
          >
            <div className="relative z-10 flex items-center p-3">
              <div className="relative">
                <span className="text-xl transition-all duration-500 group-hover:scale-110 block">
                  {floorObj.icon}
                </span>
                <div
                  className={`absolute -inset-2 rounded-full blur-xl transition-opacity duration-500 ${
                    floor === floorObj.number ? "opacity-30" : "opacity-0"
                  } ${floorObj.color}`}
                />
              </div>
              <div className="text-left ml-3">
                <p className="font-black text-xs tracking-wide">
                  {floorObj.name}
                </p>
                <p
                  className={`text-[10px] mt-0.5 ${
                    floor === floorObj.number
                      ? "text-white/70"
                      : "text-slate-400"
                  }`}
                >
                  Level {floorObj.number}
                </p>
              </div>
              <div
                className={`ml-auto transition-all duration-500 ${
                  floor === floorObj.number
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
