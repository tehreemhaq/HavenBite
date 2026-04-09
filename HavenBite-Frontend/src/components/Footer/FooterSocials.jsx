import { Mail, Github, Twitter } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:hello@havenbite.com", label: "Email" },
  { icon: Github, href: "https://github.com/havenbite", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/havenbite", label: "Twitter" },
];

export default function FooterSocials() {
  return (
    <div className="flex items-center gap-4">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[#999] hover:text-[#2D5016] transition-colors duration-200"
        >
          <Icon size={18} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}