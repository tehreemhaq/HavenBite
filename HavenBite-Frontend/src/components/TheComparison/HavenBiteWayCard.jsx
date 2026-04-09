import { HavenBiteWayPoints } from "./ComparisonData";

const HavenBiteWayCard = ()=> {
  return (
    <div className="flex-1 bg-[#2D5016] rounded-r-2xl rounded-l-none px-8 py-8 flex flex-col gap-6">

      {/* Title */}
      <div className="flex items-center gap-2">
        {/* Lightning bolt icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#86efac">
          <path d="M13 2L4.09 12.97A1 1 0 0 0 5 14h7l-1 8 8.91-10.97A1 1 0 0 0 19 10h-7l1-8z"/>
        </svg>
        <h3 className="text-base font-bold text-white">The HavenBite Way</h3>
      </div>

      {/* Points */}
      <ul className="flex flex-col gap-4">
        {HavenBiteWayPoints.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Green checkmark circle */}
            <svg className="mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span className="text-sm text-green-100 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}


export default HavenBiteWayCard