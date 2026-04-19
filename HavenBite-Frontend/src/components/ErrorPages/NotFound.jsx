import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-16 text-center">

      {/* Large muted 404 */}
      <p className="text-[120px] sm:text-[160px] font-bold leading-none text-[#EAE6DE] select-none">
        404
      </p>

      {/* Icon */}
      <div className="w-14 h-14 bg-[#E8E2D9] rounded-2xl flex items-center justify-center -mt-4 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3">
        Page not found
      </h1>

      <p className="text-sm text-[#888] max-w-xs leading-relaxed mb-8">
        Looks like this recipe doesn't exist. The page you're looking for may have been moved or never existed.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </Link>

    </main>
  );
}