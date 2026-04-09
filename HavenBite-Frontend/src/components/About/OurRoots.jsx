export default function OurRoots() {
  return (
    <section className="w-full bg-[#FAF9F3] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="lg:w-[50%] relative">
            <div className="rounded-2xl overflow-hidden w-full h-80 lg:h-105 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
                alt="Spices and herbs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-4 lg:-right-6 w-[38%] rounded-xl overflow-hidden shadow-lg border-4 border-[#FAF9F3]">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80"
                  alt="Mortar and pestle"
                  className="w-full h-32 lg:h-40 object-cover"
                />
                
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="lg:w-[50%] flex flex-col gap-5 lg:pl-8">
            <h2
              className="text-4xl font-bold text-[#1a1a1a] leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our Roots
            </h2>

            {/* ✅ Updated — no Mediterranean overclaim, honest about what we built */}
            <p className="text-sm text-[#666] leading-relaxed">
              HavenBite started with a simple problem — finding recipes you can actually
              cook with what's at home, without worrying whether every ingredient is Halal.
              We built a platform that handles that for you.
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              Enter your ingredients, pick a cuisine style, and get a complete recipe with
              an AI-assisted Halal check, substitution suggestions for any doubtful items,
              and nutritional information — all in one place.
            </p>

            {/* <button className="self-start flex items-center gap-2.5 mt-2 group">
              <span className="w-7 h-7 rounded-full bg-[#2D5016] flex items-center justify-center group-hover:bg-[#3a6b1e] transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span
                className="text-sm font-semibold text-[#1a1a1a] italic group-hover:text-[#2D5016] transition-colors"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                The Haven Story
              </span>
            </button> */}
          </div>

        </div>
      </div>
    </section>
  );
}