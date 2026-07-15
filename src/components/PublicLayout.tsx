import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] font-sans text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-[#E8E4DC] bg-[#FAF8F3]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-7 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#B8932E] flex items-center justify-center text-white font-extrabold">
              DH
            </div>
            <span className="font-bold tracking-wide">DH ASSOCIATES</span>
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-[#4A4742]">
            <Link to="/" className="hover:text-[#B8932E] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#B8932E] transition-colors">About</Link>
            <Link to="/services" className="hover:text-[#B8932E] transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-[#B8932E] transition-colors">Contact</Link>
          </nav>

          <Link
            to="/login"
            className="text-sm font-semibold px-5 py-2.5 rounded-lg border-[1.5px] border-[#B8932E] text-[#B8932E] hover:bg-[#B8932E] hover:text-white transition-colors"
          >
            Staff Login
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-[#B5AFA3] mt-auto pt-16">
        <div className="max-w-6xl mx-auto px-7 pb-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-serif text-white text-xl font-semibold">DH Associates</div>
            <p className="text-[#C9A94A] text-sm mt-2 tracking-wide">Founded on Trust and Services</p>
            <p className="text-sm mt-4 leading-relaxed text-[#8A857C]">
              A Navi Mumbai based statutory-compliance and HR advisory firm.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-4">Contact</h4>
            <p className="text-sm leading-relaxed">Shop No. 5, Mansi CHS Ltd., Plot B-35, Sector-9, Diva Gaon, Airoli, Navi Mumbai – 400708</p>
            <p className="text-sm mt-2">(022) 27640413 · +91 99304 40413</p>
            <p className="text-sm mt-1">info@dhassociates.co.in</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-4">Hours</h4>
            <p className="text-sm">Monday – Friday</p>
            <p className="text-sm">9:00 AM – 5:30 PM</p>
          </div>
        </div>
        <div className="border-t border-[#322E28] py-6">
          <div className="max-w-6xl mx-auto px-7 text-xs text-[#6E695F]">
            © 2026 DH Associates. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}