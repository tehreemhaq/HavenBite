import { useState, useEffect } from "react";
import ProcessCard from "./ProcessCard";
import { processSteps } from "./ProcessData";

const STEP_DURATION = 2500 // ms each card stays highlighted

const TheProcess = () => {
  const [activeStep, setActiveStep] = useState(0) // index 0-3

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % processSteps.length)
    }, STEP_DURATION)

    return () => clearInterval(interval) // cleanup on unmount
  }, [])

  return (
    <section className="w-full bg-[#FAF9F3] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">The Process</h2>
          <span className="mt-3 w-30 h-1 bg-[#2D5016] rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          {processSteps.map((item, index) => (
            <ProcessCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              isHighlighted={activeStep === index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default TheProcess