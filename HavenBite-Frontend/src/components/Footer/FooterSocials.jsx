import { useState } from "react";
import { Mail, Github, Copy, Check } from "lucide-react";

const EMAIL = "havenbite0@gmail.com";

const socials = [
  {
    icon: Mail,
    type: "email",
    value: EMAIL,
    label: "Email",
    display: EMAIL,
  },
  {
    icon: Github,
    type: "link",
    value: "https://github.com/tehreemhaq",
    label: "GitHub",
    display: "github.com/tehreemhaq",
  },
];

export default function FooterSocials() {
  const [hovered, setHovered] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative flex items-center gap-4">
      {socials.map((social) => {
        const { icon: Icon, type, value, label } = social;
        const wrapperClass = "relative pt-6 -mt-6 pb-1";

        if (type === "email") {
          return (
            <div
              key={label}
              className={wrapperClass}
              onMouseEnter={() => setHovered(social)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                type="button"
                onClick={handleCopy}
                aria-label={label}
                className="block text-[#999] hover:text-[#2D5016] transition-colors duration-200"
              >
                <Icon size={18} strokeWidth={1.8} />
              </button>
            </div>
          );
        }

        return (
          <div
            key={label}
            className={wrapperClass}
            onMouseEnter={() => setHovered(social)}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="block text-[#999] hover:text-[#2D5016] transition-colors duration-200"
            >
              <Icon size={18} strokeWidth={1.8} />
            </a>
          </div>
        );
      })}

      {/* Tooltip for GitHub - Shows address */}
      {hovered?.type === "link" && (
        <div
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2
            flex items-center gap-2.5
            bg-white rounded-xl shadow-sm border border-[#E8E2D9]
            px-3.5 py-2 whitespace-nowrap
            transition-all duration-150 ease-in-out
          `}
        >
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-sm border-r border-b border-[#E8E2D9]"
            aria-hidden="true"
          />
          <Github size={11} strokeWidth={2} className="text-[#2D5016] shrink-0" />
          <span className="text-[11px] text-[#4a4a4a] font-mono tracking-tight select-all">
            {hovered?.display}
          </span>
        </div>
      )}

      {/* Tooltip for Email - Shows "Click to copy" message */}
      {hovered?.type === "email" && (
        <div
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2
            flex items-center gap-2.5
            bg-white rounded-xl shadow-sm border border-[#E8E2D9]
            px-3.5 py-2 whitespace-nowrap
            transition-all duration-150 ease-in-out
          `}
        >
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-sm border-r border-b border-[#E8E2D9]"
            aria-hidden="true"
          />
          <Copy size={11} strokeWidth={2} className="text-[#2D5016] shrink-0" />
          <span className="text-[11px] text-[#4a4a4a] font-mono tracking-tight">
            Click to copy email
          </span>
        </div>
      )}

      {/* Success message for email copy */}
      {copied && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#2D5016] rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <Check size={14} strokeWidth={2.5} className="text-white" />
            <span className="text-sm text-white">Email copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}