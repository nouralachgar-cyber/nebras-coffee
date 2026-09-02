export default function App() {
  return (
    <div className="min-h-screen bg-[#F5EBDD] text-[#3E2921]">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 bg-[#FFF9F3]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#F4C6CE]/40 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <h1 className="text-2xl font-bold tracking-wide text-[#6B4534] font-serif">
            Nebras Coffee
          </h1>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-base font-medium">
          <li>
            <a href="#home" className="text-[#6B4534] hover:text-[#3E2921] transition-colors border-b-2 border-[#6B4534] pb-1">
              Home
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-[#6B4534] transition-colors">
              Menu
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#6B4534] transition-colors">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#6B4534] transition-colors">
              Contact
            </a>
          </li>
        </ul>

        <button type="button" className="bg-[#6B4534] text-[#FFF9F3] hover:bg-[#3E2921] px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md">
          View Menu
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-right md:text-left">
          <span className="inline-block px-4 py-1.5 bg-[#F4C6CE]/50 text-[#6B4534] text-sm font-semibold rounded-full border border-[#F4C6CE]">
            Welcome to Nebras
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-[#3E2921]">
            A Little Sweetness <br />
            <span className="text-[#6B4534] italic">in Every Sip.</span>
          </h2>
          <p className="text-lg text-[#6B4534]/90 max-w-lg leading-relaxed">
            Discover your favorite coffee, fresh juices and delicious desserts at Nebras Coffee.
          </p>
          <div className="pt-2">
            <button type="button" className="bg-[#F4C6CE] text-[#3E2921] hover:bg-[#6B4534] hover:text-[#FFF9F3] px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300 shadow-md">
              Explore Our Menu
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -z-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#F4C6CE]/40 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFF9F3] max-w-md">
            <img
              src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop"
              alt="Cappuccino and Dessert"
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#FFF9F3]/90 backdrop-blur-md p-4 rounded-2xl border border-[#F4C6CE]/50 flex items-center justify-between shadow-lg">
              <div>
                <p className="font-bold text-[#6B4534]">Special Duo</p>
                <p className="text-xs text-[#3E2921]/80">Cappuccino + Fresh Cake</p>
              </div>
              <span className="bg-[#F4C6CE] text-[#3E2921] text-xs font-bold px-3 py-1.5 rounded-full">
                Cozy Mood ✨
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}