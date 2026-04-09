import { manualWayPoints } from "./ComparisonData";

const  ManualWayCard = ()=> {
  return (
    <div className="flex-1 bg-white rounded-l-2xl rounded-r-none px-8 py-8 flex flex-col gap-6 border border-[#E8E2D9]">

      {/* Title */}
      <div className="flex items-center gap-2">
        {/* Clock icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <h3 className="text-base font-bold text-[#888]">The Manual Way</h3>
      </div>

      {/* Points */}
      <ul className="flex flex-col gap-4">
        {manualWayPoints.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Red dot */}
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0" />
            <span className="text-sm text-[#666] leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}


export default ManualWayCard