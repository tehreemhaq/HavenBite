import ManualWayCard from "./ManualWayCard";

import HavenBiteWayCard from "./HavenBiteWayCard";


 const ComparisonBlock = ()=> {
  return (
    <section className="w-full bg-[#FAF9F3] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">Traditional Cooking vs HavenBite</h2>
<p className="text-sm text-[#888] mt-3">See why HavenBite is a smarter choice.</p>
        </div>

        {/* Two-panel comparison card */}
        <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md max-w-3xl mx-auto">
          <ManualWayCard />
          <HavenBiteWayCard />
        </div>

      </div>
    </section>
  );
}


export default ComparisonBlock