import ProfileFormInput from "./ProfileFormInput";

export default function AccountIdentitySection({ data, onChange }) {
  return (
    <section className="bg-white rounded-2xl border border-[#DDD9CF] overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="flex-1 h-px bg-[#DDD9CF]" />
        <h2 className="font-serif italic text-lg text-[#2D5016] whitespace-nowrap">
          Account Identity
        </h2>
        <div className="flex-1 h-px bg-[#DDD9CF]" />
      </div>

      {/* Fields */}
      <div className="px-6 pb-6 space-y-5">
        <ProfileFormInput
          label="Username"
          type="text"
          id="username"
          placeholder="Your username"
          value={data.username}
          onChange={(e) => onChange("username", e.target.value)}
        />
        <ProfileFormInput
          label="Email Address"
          type="email"
          id="email"
          placeholder="Your email address"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
    </section>
  );
}