const Logo = ()=> {
  return (
    <a href="/" className="flex items-center gap-2 shrink-0">
      <div className="w-7 h-7 bg-[#2D5016] rounded-sm flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2v5c0 1.1.9 2 2 2v7h2v-7c1.1 0 2-.9 2-2V2H8v4H6V2H4z" fill="white" />
          <path d="M13 2c-1.66 0-3 1.34-3 3v4h2v5h2V2h-1z" fill="white" />
        </svg>
      </div>
      <span className="text-[#1a1a1a] font-semibold text-base tracking-tight">
        HavenBite
      </span>
    </a>
  );
}


export default  Logo