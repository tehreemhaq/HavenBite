 const  IngredientsInput =({ value, onChange })=> {
  return (
    <div className="w-full h-full flex flex-col">
      <label className="block text-xs font-semibold text-[#333] uppercase tracking-wider mb-2">
        Your Ingredients
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chicken, Bell Peppers, Rice, Soy Sauce..."
        rows={3}
        className="w-full flex-1 resize-none border border-[#E0DAD0] rounded-lg px-4 py-3 text-sm text-[#333] placeholder-[#bbb] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200"
      />
    </div>
  );
}


export default IngredientsInput