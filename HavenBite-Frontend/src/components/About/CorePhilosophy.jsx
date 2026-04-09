const pillars = [
  {
    title: "Halal-Focused",
    icon: "🌿",
    description:
      "Every recipe comes with an AI-assisted Halal check. Doubtful ingredients are flagged with suggested Halal-friendly alternatives so you can cook with confidence.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    imageAlt: "Fresh herbs being sprinkled",
    accent: "#2D5016",
    rotate: "-rotate-2",
  },
  {
    title: "AI-Powered",
    icon: "◎",
    description:
      "Recipes are generated using an AI model based on the ingredients you have and your preferred cuisine style — no database of fixed recipes, just dynamic generation.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    imageAlt: "Olive oil being poured",
    accent: "#C8572B",
    rotate: "rotate-1",
  },
  {
    title: "Informed",
    icon: "✦",
    description:
      "Beyond the recipe, we pull nutritional data via an external API so you know exactly what's on your plate — calories, protein, carbs, fat, and more.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    imageAlt: "Artisan bread and coffee",
    accent: "#2D5016",
    rotate: "-rotate-1",
  },
];



export default function CorePhilosophy() {
  return (
    <section className="w-full bg-[#FAF9F3] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <h2
            className="text-3xl font-bold text-[#1a1a1a]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Core Philosophy
          </h2>
          <div className="w-8 h-0.5 bg-[#C8572B] mt-3" />
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col gap-5">

              {/* Tilted image */}
              <div
                className={`rounded-2xl overflow-hidden h-56 w-full shadow-md transform ${pillar.rotate} hover:rotate-0 transition-transform duration-500 cursor-pointer`}
              >
                <img
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: pillar.accent }}>
                    {pillar.icon}
                  </span>
                  <h3 className="text-sm font-bold text-[#1a1a1a]">{pillar.title}</h3>
                </div>
                <p className="text-xs text-[#888] leading-relaxed">{pillar.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}