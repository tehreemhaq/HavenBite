import { Link } from "react-router-dom";

export default function GroundedInFlavor() {
  return (
    <section className="w-full bg-[#FAF9F3] pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Full-bleed rounded banner */}
        <div className="relative rounded-3xl overflow-hidden min-h-85 flex items-end">

          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1400&q=80"
            alt="Kitchen ingredients"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Mint-sage gradient overlay — solid left, transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(200,213,196,0.97) 0%, rgba(200,213,196,0.97) 38%, rgba(200,213,196,0.65) 58%, rgba(200,213,196,0.15) 78%, transparent 100%)",
            }}
          />

          {/* Content — bottom left */}
          <div className="relative z-10 px-10 pb-10 pt-16 max-w-lg">

            {/* Top tag */}
            <p
              className="text-[#1a1a1a]/50 text-xs italic mb-3"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Tech
            </p>

            <h2
              className="text-5xl sm:text-6xl font-bold text-[#1a1a1a] leading-[1.05] mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Grounded in<br />flavor.
            </h2>

            <p className="text-[#1a1a1a]/65 text-sm leading-relaxed mb-8 max-w-sm">
              Our neural networks are trained on thousands of traditional recipes, learning the subtle art of seasoning and the science of substitution.
            </p>

            <Link
              to="/#generator"
              className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-xs font-bold px-7 py-3 rounded-md tracking-widest uppercase transition-colors duration-200"
            >
              Explore Our AI
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}