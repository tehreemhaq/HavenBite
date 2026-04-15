export default function ProfileFormInput({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-widest text-[#8A9183] uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#F9F7F3] border border-[#DDD9CF] rounded-xl px-4 py-3.5 text-sm text-[#2C3A2A] placeholder-[#B5B0A6] focus:outline-none focus:ring-2 focus:ring-[#3B5036]/30 focus:border-[#3B5036] transition-all duration-200"
      />
    </div>
  );
}