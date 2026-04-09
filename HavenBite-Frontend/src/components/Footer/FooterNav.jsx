import { Link } from "react-router-dom";

const navLinks = [
  { label: "About Us", href: "/about" },
];

const  FooterNav = ()=> {
  return (
    // <nav className="flex items-center gap-6">
    //   {navLinks.map(({ label, href }) => (
    //     <Link
    //       key={href}
    //       to={href}
    //       className="text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200"
    //     >
    //       {label}
    //     </Link>
    //   ))}
    // </nav>

    <span className="text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200">Contact Us</span>
  );
}

export default  FooterNav