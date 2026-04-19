import { Link } from "react-router-dom";

// reason prop — "server" | "ai" — lets you show context-specific message
// defaults to "server" if not passed
export default function ServerError({ reason = "server" }) {
  const isAI = reason === "ai";

  return (
    <main className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-16 text-center">

      {/* Large muted 500 */}
      <p className="text-[120px] sm:text-[160px] font-bold leading-none text-[#EAE6DE] select-none">
        500
      </p>

      {/* Icon */}
      <div className="w-14 h-14 bg-[#E8E2D9] rounded-2xl flex items-center justify-center -mt-4 mb-6">
        {isAI ? (
          // Sparkle / AI icon
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
          </svg>
        ) : (
          // Server icon
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3">
        {isAI ? "AI service unavailable" : "Something went wrong"}
      </h1>

      <p className="text-sm text-[#888] max-w-xs leading-relaxed mb-8">
        {isAI
          ? "The recipe generation service is temporarily unavailable. Please try again in a few moments."
          : "Our servers are having a moment. We're on it — please try again shortly."
        }
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Try Again
        </button>

        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-[#DDD9CF] hover:border-[#2D5016] text-[#555] hover:text-[#2D5016] text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>

    </main>
  );
}