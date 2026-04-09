import Logo from "../Logo";
import FooterNav from "./FooterNav";
import FooterSocials from "./FooterSocials";

const  Footer = ()=> {
  return (
    <footer className="w-full bg-[#FAF9F3] border-t border-[#E8E2D9]">

      {/* Main footer row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <Logo />
          <FooterNav />
          <FooterSocials />
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
          <p className="text-xs text-[#bbb]">
            © {new Date().getFullYear()} Halal recipe generation, powered by AI.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default  Footer