export default function HeroSection() {
  return (
    <section className="w-full bg-[#FAF9F3] pt-14 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

          {/* ── Left text block ───────────────────────────── */}
          <div className="lg:w-[36%] flex flex-col  lg:self-center">
            <p
              className="text-xs font-semibold text-[#C8572B] mb-3 italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              A Culinary Sanctuary
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold text-[#1a1a1a] leading-[1.05] mb-5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Art of<br />HavenBite
            </h1>
            <p className="text-sm text-[#888] leading-relaxed mb-8 max-w-65">
             An AI-assisted recipe platform built for Halal-conscious 
    home cooks.
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#bbb] font-semibold">
              — Est. 2025
            </p>
          </div>

          {/* ── Right photo grid ──────────────────────────── */}
          <div className="lg:w-[64%] flex flex-col gap-3">

            {/* Top row — two equal images */}
            <div className="flex gap-3">
              <div className="w-1/2 rounded-2xl overflow-hidden h-48 sm:h-56">
                <img
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&q=80"
                  alt="Olive oil and herbs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 rounded-2xl overflow-hidden h-48 sm:h-56">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
                  alt="Dates"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom row — creamy card left, image right */}
            <div className="flex gap-3">

              {/* Left — creamy background card with shadow */}
              <div
                className="w-1/2 rounded-2xl flex flex-col justify-end px-5 pb-5 pt-8 h-48 sm:h-56"
                style={{
                  backgroundColor: "#F0EBE0",
                  boxShadow: "0 4px 24px 0 rgba(180,160,120,0.13)",
                }}
              >
                <h3
                  className="text-sm font-bold text-[#1a1a1a] mb-1"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Halal Roots
                </h3>
                <p className="text-[10px] text-[#999] leading-relaxed max-w-37.5">
                  Deeply grounded in the purity of ingredients.
                </p>
              </div>

              {/* Right — image */}
              <div className="w-1/2 rounded-2xl overflow-hidden h-48 sm:h-56">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                  alt="Clean kitchen"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}