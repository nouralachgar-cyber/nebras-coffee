import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Coffee,
  Search,
  ShoppingBag,
  X,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SpotlightNew } from "@/components/aceternity/spotlight"
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid"
import { HoverEffect } from "@/components/aceternity/hover-effect"
import { GridPattern } from "@/components/aceternity/background-beams"

const menuData = [
  { id: 1, name: "Espresso", category: "Coffee", price: 18, desc: "Rich single shot from Ethiopian beans — bold and aromatic.", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600" },
  { id: 2, name: "Americano", category: "Coffee", price: 20, desc: "Espresso with hot water for a smooth, velvety finish.", img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=600" },
  { id: 3, name: "Cappuccino", category: "Coffee", price: 22, desc: "Espresso with steamed milk foam and a dusting of cocoa.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600" },
  { id: 4, name: "Latte", category: "Coffee", price: 24, desc: "Silky steamed milk over espresso with latte art.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600" },
  { id: 5, name: "Caramel Latte", category: "Coffee", price: 25, desc: "Espresso with caramel syrup and steamed milk.", img: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=600" },
  { id: 7, name: "Iced Coffee", category: "Coffee", price: 23, desc: "Chilled espresso over ice with a hint of vanilla.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600" },
  { id: 8, name: "Orange Juice", category: "Fresh Juices", price: 18, desc: "100% freshly squeezed orange juice.", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600" },
  { id: 9, name: "Strawberry Juice", category: "Fresh Juices", price: 20, desc: "Fresh strawberries blended with natural sweetness.", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600" },
  { id: 10, name: "Lemonade", category: "Fresh Juices", price: 18, desc: "Zesty lemon drink with fresh mint, served chilled.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600" },
  { id: 12, name: "Mango Juice", category: "Fresh Juices", price: 25, desc: "Tropical mango puree — sweet and refreshing.", img: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600" },
  { id: 13, name: "Chocolate Cake", category: "Desserts", price: 28, desc: "Soft chocolate cake with dark cocoa glaze.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" },
  { id: 14, name: "Cheesecake", category: "Desserts", price: 30, desc: "New York style cheesecake with berry coulis.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600" },
  { id: 15, name: "Brownie", category: "Desserts", price: 22, desc: "Fudgy brownie with crunchy walnuts.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600" },
  { id: 16, name: "Cookies", category: "Desserts", price: 15, desc: "Chocolate chip cookies with a gooey center.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600" },
  { id: 18, name: "Croissant", category: "Desserts", price: 16, desc: "Flaky buttery French pastry, baked fresh daily.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600" },
]

const HOURS = [
  { day: "Monday – Thursday", time: "08:00 – 22:00" },
  { day: "Friday – Saturday", time: "08:00 – 23:00" },
  { day: "Sunday", time: "09:00 – 22:00" },
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("Medium")
  const [quantity, setQuantity] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const filteredMenu = useMemo(() =>
    menuData.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }), [activeCategory, searchQuery])

  const addToCart = (product, size = "Medium", qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size)
      if (idx > -1) {
        const c = [...prev]
        c[idx].qty += qty
        return c
      }
      return [...prev, { ...product, size, qty }]
    })
    setSelectedProduct(null)
    setIsCartOpen(true)
    showToast(`${product.name} added to cart`)
  }

  const updateCartQty = (id, size, change) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id && item.size === size) {
        const newQty = item.qty + change
        return newQty > 0 ? { ...item, qty: newQty } : null
      }
      return item
    }).filter(Boolean))
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalItems = cart.reduce((a, c) => a + c.qty, 0)

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Hours", href: "#hours" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-[#FFF7F0] text-[#3E2921] selection:bg-[#FF4D8D] selection:text-white">
      {/* Announcement */}
      <div className="w-full bg-[#3E2921] text-[#FFF9F3] text-xs py-2.5 px-4 flex items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center gap-2 font-medium tracking-wide">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
          Open daily 8:00–22:00 · Free cookie on orders over 60 DH this week
        </span>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-[rgba(255,249,243,0.85)] backdrop-blur-xl border-b border-[#FFD6E7]/60">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-[#FF4D8D] text-white grid place-items-center shadow-[0_4px_16px_rgba(255,77,141,0.35)] group-hover:rotate-6 transition-transform">
              <Coffee className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="font-serif font-extrabold text-[18px] tracking-tight">Nebras Coffee</h1>
              <p className="text-[11px] tracking-[0.14em] font-semibold text-[#8B6B5E] -mt-1">CASABLANCA · SINCE 2024</p>
            </div>
            <span className="hidden sm:inline-flex ml-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(52,211,153,0.2)] animate-pulse" />
          </a>

          <ul className="hidden lg:flex items-center gap-1 bg-white border border-[#FFD6E7] p-1 rounded-full shadow-sm">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#FFF0F6] hover:text-[#FF4D8D] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCartOpen(true)} className="rounded-full h-10 px-5 hidden sm:inline-flex">
              <ShoppingBag className="h-4 w-4" /> Cart
              {totalItems > 0 && (
                <span className="ml-1 bg-white text-[#FF4D8D] text-xs font-extrabold px-2 py-0.5 rounded-full">{totalItems}</span>
              )}
            </Button>

            <button onClick={() => setIsCartOpen(true)} aria-label="Open cart" className="sm:hidden relative h-10 w-10 rounded-full bg-[#FF4D8D] text-white grid place-items-center shadow-md">
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-[#3E2921] text-white text-[10px] font-bold h-5 w-5 grid place-items-center rounded-full border-2 border-white">{totalItems}</span>}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="lg:hidden h-10 w-10 rounded-full bg-white border border-[#FFD6E7] grid place-items-center">
              {mobileOpen ? <X className="h-4 w-4" /> : <span className="space-y-1"><span className="block h-0.5 w-4 bg-[#3E2921] mx-auto" /><span className="block h-0.5 w-4 bg-[#3E2921] mx-auto" /><span className="block h-0.5 w-3 bg-[#3E2921] mx-auto" /></span>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-[#FFD6E7] bg-white/95 backdrop-blur overflow-hidden">
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="py-2.5 px-4 rounded-xl hover:bg-[#FFF0F6] font-medium flex justify-between items-center text-sm">
                    {l.label} <ArrowRight className="h-4 w-4 text-[#FF4D8D]" />
                  </a>
                ))}
                <Button onClick={() => { setMobileOpen(false); setIsCartOpen(true) }} className="mt-2 w-full">View cart · {totalItems} items</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <SpotlightNew />
        <GridPattern />
        <div className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2">
              <Badge variant="soft" className="rounded-full px-3 py-1 gap-1.5 text-xs">
                <Leaf className="h-3.5 w-3.5" /> specialty coffee · fresh juices · desserts
              </Badge>
              <span className="inline-flex items-center gap-1.5 bg-[#3E2921] text-white px-3 py-1 rounded-full text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> open till 22:00
              </span>
            </div>

            <h2 className="font-serif font-black tracking-[-0.03em] leading-[0.95] text-[36px] sm:text-[50px] lg:text-[60px]">
              <span className="block text-[#3E2921]">A Little</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] via-[#FF7AA2] to-[#C8B6FF] italic font-light">Sweetness</span>
              <span className="block text-[#3E2921]">in Every Sip.</span>
            </h2>

            <p className="text-[15px] lg:text-[16px] leading-7 text-[#8B6B5E] max-w-[520px]">
              Specialty coffee, fresh juices and artisan desserts in a warm neighborhood spot in Casablanca. Carefully sourced, freshly brewed, served with care.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-[15px] w-full sm:w-auto">
                <a href="#menu">Explore Menu <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button variant="pill" size="lg" asChild className="h-12 px-7 border-[#FFD6E7] bg-white hover:bg-[#FFF0F6] w-full sm:w-auto">
                <a href="#location">Find Us</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="flex text-[#FFB700]">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#FFB700] text-[#FFB700]" />)}</span>
                <span className="font-bold">4.9/5</span>
                <span className="text-[#8B6B5E] hidden sm:inline">from 1,800+ reviews</span>
              </div>
              <span className="hidden sm:inline h-4 w-[1px] bg-[#FFD6E7]" />
              <span className="inline-flex items-center gap-2 bg-white border border-[#FFD6E7] rounded-full px-3 py-1.5 shadow-sm text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Dine-in · Takeaway · Delivery
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D8D]/20 via-[#FFB5D0]/20 to-[#C8B6FF]/20 blur-[30px] rounded-[2rem]" />
              <img src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=900" alt="Latte art at Nebras Coffee" className="relative w-full h-[340px] sm:h-[380px] lg:h-[440px] object-cover rounded-[1.9rem] border-[6px] border-white shadow-[0_24px_64px_rgba(62,41,33,0.18)]" />

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-2 sm:-left-4 bottom-8 bg-white border border-[#FFD6E7] rounded-2xl p-3 shadow-xl flex items-center gap-3 w-[200px] sm:w-[210px]">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200" alt="Caramel Latte" className="h-12 w-12 rounded-xl object-cover" />
                <div className="text-xs"><p className="font-bold">Caramel Latte</p><p className="text-[#8B6B5E]">best seller · 4.9★</p><p className="font-bold text-[#FF4D8D]">25 DH</p></div>
                <button onClick={() => { const p = menuData.find(m=>m.name==="Caramel Latte"); if(p){ setSelectedProduct(p); setQuantity(1); setSelectedSize("Medium") } }} className="ml-auto h-7 w-7 rounded-full bg-[#FF4D8D] text-white grid place-items-center shrink-0"><Plus className="h-3.5 w-3.5" /></button>
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, delay: 0.4 }} className="absolute -right-2 sm:-right-4 top-6 bg-[#3E2921] text-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-white/10 grid place-items-center text-sm">☕</span>
                <div className="text-xs pr-1"><p className="font-bold">Freshly brewed</p><p className="text-white/70">served in ~3 mins</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="border-y border-[#FFD6E7] bg-white/60 backdrop-blur overflow-hidden">
          <div className="py-2.5 flex gap-6 animate-[marquee_18s_linear_infinite] whitespace-nowrap text-xs font-bold tracking-widest uppercase text-[#3E2921]/60">
            <span>✦ specialty coffee</span><span>✦ fresh juices</span><span>✦ artisan desserts</span><span>✦ croissants & cookies</span><span>✦ Casablanca</span><span>✦ dine-in · takeaway</span>
            <span>✦ specialty coffee</span><span>✦ fresh juices</span><span>✦ artisan desserts</span><span>✦ croissants & cookies</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="soft" className="mb-3 rounded-full">About us</Badge>
            <h3 className="font-serif font-black text-[28px] lg:text-[40px] leading-none tracking-tight">More Than Just <span className="text-[#FF4D8D] italic font-light">Coffee</span></h3>
            <p className="text-[#8B6B5E] text-sm mt-2 max-w-[560px]">A cozy neighborhood café in Casablanca — focused on great beans, fresh ingredients and a warm place to pause, meet or work.</p>
          </div>
        </div>

        <BentoGrid>
          <BentoGridItem
            title="The Ritual"
            description="Carefully sourced beans, precise roasting and a slow bar. Every cup pulled with attention to freshness and balance."
            icon={<Coffee className="h-4 w-4" />}
            header={
              <div className="h-full min-h-[8rem] rounded-xl overflow-hidden border border-[#FFD6E7] bg-gradient-to-br from-[#FFF0F6] to-[#FFE4EF] relative">
                <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600" alt="Brewing coffee" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="relative p-4 flex flex-col justify-end h-full">
                  <div className="inline-flex w-fit bg-white border border-[#FFD6E7] rounded-full px-2.5 py-1 text-xs font-bold gap-1">Specialty · slow bar</div>
                </div>
              </div>
            }
          />
          <BentoGridItem
            title="Warm Space"
            description="Soft lighting, comfortable seating and fast Wi-Fi. Perfect for a quick break, study session or catching up."
            icon={<Heart className="h-4 w-4" />}
            header={
              <div className="h-full min-h-[8rem] rounded-xl overflow-hidden border border-[#FFD6E7] relative">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600" alt="Café interior" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur border border-[#FFD6E7] rounded-full px-2.5 py-1 text-xs font-bold flex items-center gap-1">cozy · welcoming</div>
              </div>
            }
          />
        </BentoGrid>

      </section>

      {/* MENU */}
      <section id="menu" className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="soft" className="rounded-full mb-3">Menu</Badge>
          <h3 className="font-serif font-black text-[28px] lg:text-[42px] leading-none">Explore Our <span className="text-[#FF4D8D] italic font-light">Menu</span></h3>
          <p className="text-sm text-[#8B6B5E] mt-2">Filter by category or search. Tap any item to choose size and quantity.</p>
        </div>

        <div className="bg-white border border-[#FFD6E7] rounded-[1.6rem] p-3 lg:p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Coffee", "Fresh Juices", "Desserts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${activeCategory === cat ? "bg-[#FF4D8D] text-white border-[#FF4D8D] shadow-md" : "bg-[#FFF0F6] text-[#3E2921] border-[#FFD6E7] hover:bg-white"}`}
              >
                {cat === "All" ? "All" : cat === "Coffee" ? "☕ Coffee" : cat === "Fresh Juices" ? "🍓 Juices" : "🍰 Desserts"}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6B5E]" />
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search — try 'latte' or 'cake'" className="pl-10 h-10 bg-[#FFF7F0] border-[#FFD6E7]" />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white border border-[#FFD6E7] grid place-items-center"><X className="h-3.5 w-3.5" /></button>}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs">
          <p className="text-[#8B6B5E]"><span className="font-bold text-[#3E2921]">{filteredMenu.length}</span> items · {activeCategory} {searchQuery && `· “${searchQuery}”`}</p>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFF0F6] border border-[#FFD6E7] rounded-full px-3 py-1 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> live menu</span>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="bg-white border border-dashed border-[#FFD6E7] rounded-[1.6rem] p-10 text-center">
            <p className="font-serif font-bold text-lg">No items found</p>
            <p className="text-sm text-[#8B6B5E]">Try a different search or category.</p>
            <Button variant="soft" className="mt-4" onClick={() => { setSearchQuery(""); setActiveCategory("All") }}>Clear filters</Button>
          </div>
        ) : (
          <HoverEffect items={filteredMenu} onSelect={(item) => { setSelectedProduct(item); setQuantity(1); setSelectedSize("Medium") }} />
        )}
      </section>

      {/* HOURS + LOCATION + CONTACT */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8 pb-12 lg:pb-16 space-y-6">
        {/* Hours */}
        <div id="hours" className="rounded-[1.9rem] bg-white border border-[#FFD6E7] shadow-[0_12px_40px_rgba(255,77,141,0.08)] overflow-hidden grid lg:grid-cols-2">
          <div className="p-6 sm:p-7 lg:p-9 space-y-6">
            <div>
              <Badge variant="soft" className="rounded-full"><Clock className="h-3.5 w-3.5" /> hours</Badge>
              <h3 className="font-serif font-black text-[26px] sm:text-[30px] leading-none mt-3">Opening <span className="text-[#FF4D8D] italic font-light">Hours</span></h3>
              <p className="text-sm text-[#8B6B5E] mt-2">We’re here every day. Kitchen closes 30 minutes before closing.</p>
            </div>

            <div className="divide-y divide-[#FFD6E7] border border-[#FFD6E7] rounded-2xl overflow-hidden">
              {HOURS.map((h) => (
                <div key={h.day} className="flex items-center justify-between px-4 py-3.5 bg-[#FFF7F0] even:bg-white">
                  <span className="text-sm font-semibold">{h.day}</span>
                  <span className="text-sm font-bold text-[#FF4D8D] bg-white border border-[#FFD6E7] px-3 py-1 rounded-full">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#3E2921] text-white rounded-2xl p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center shrink-0"><Clock className="h-5 w-5" /></div>
              <div className="text-xs">
                <p className="font-bold">Late nights Friday & Saturday</p>
                <p className="text-white/70">We stay open until 23:00 on weekends</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF0F6] p-4 lg:p-6 flex flex-col justify-center">
            <div className="bg-white border border-[#FFD6E7] rounded-2xl p-5 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><Star className="h-4 w-4 text-[#FF4D8D]" /> Good to know</h4>
              <ul className="space-y-2.5 text-sm text-[#6B4534]">
                <li className="flex gap-2"><span className="text-[#FF4D8D]">•</span> Free Wi-Fi and power outlets available</li>
                <li className="flex gap-2"><span className="text-[#FF4D8D]">•</span> Takeaway and local delivery</li>
                <li className="flex gap-2"><span className="text-[#FF4D8D]">•</span> Card and cash accepted</li>
                <li className="flex gap-2"><span className="text-[#FF4D8D]">•</span> Orders prepared in 10–15 minutes</li>
              </ul>
              <Button asChild className="w-full"><a href="#menu">Order now <ArrowRight className="h-4 w-4" /></a></Button>
            </div>
          </div>
        </div>

        {/* Location + Contact */}
        <div className="rounded-[1.9rem] bg-white border border-[#FFD6E7] shadow-[0_12px_40px_rgba(255,77,141,0.08)] overflow-hidden grid lg:grid-cols-2">
          <div id="location" className="p-6 sm:p-7 lg:p-9 space-y-6">
            <div>
              <Badge variant="soft" className="rounded-full"><MapPin className="h-3.5 w-3.5" /> location</Badge>
              <h3 className="font-serif font-black text-[26px] sm:text-[30px] leading-none mt-3">Find <span className="text-[#FF4D8D] italic font-light">Us</span></h3>
              <p className="text-sm text-[#8B6B5E] mt-2">Central Casablanca — easy to reach by tram or car. Parking nearby.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Address", value: "Casablanca, Morocco", sub: "Beaulieu · near Twin Center" },
                { icon: Clock, label: "Hours", value: "08:00 – 22:00", sub: "Every day" },
              ].map((c) => (
                <div key={c.label} className="bg-[#FFF7F0] border border-[#FFD6E7] rounded-2xl p-4 flex gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white border border-[#FFD6E7] grid place-items-center text-[#FF4D8D] shrink-0"><c.icon className="h-4 w-4" /></div>
                  <div className="text-xs leading-tight min-w-0">
                    <p className="font-bold text-[#3E2921]">{c.label}</p>
                    <p className="font-semibold truncate">{c.value}</p>
                    <p className="text-[#8B6B5E]">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div id="contact" className="space-y-3 pt-2">
              <h4 className="font-bold text-sm">Contact & Ordering</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Phone, label: "Phone / WhatsApp", value: "+212 6 12 34 56 78", href: "https://wa.me/212612345678" },
                  { icon: Mail, label: "Email", value: "hello@nebras.coffee", href: "mailto:hello@nebras.coffee" },
                ].map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="bg-[#FFF7F0] border border-[#FFD6E7] rounded-2xl p-4 flex gap-3 hover:bg-[#FFF0F6] transition-colors">
                    <div className="h-9 w-9 rounded-xl bg-white border border-[#FFD6E7] grid place-items-center text-[#FF4D8D] shrink-0"><c.icon className="h-4 w-4" /></div>
                    <div className="text-xs leading-tight min-w-0">
                      <p className="font-bold text-[#3E2921]">{c.label}</p>
                      <p className="font-semibold truncate">{c.value}</p>
                      <p className="text-[#FF4D8D] font-medium">Contact us →</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button asChild className="w-full sm:w-auto"><a href="https://wa.me/212612345678" target="_blank" rel="noreferrer">WhatsApp to order <ArrowRight className="h-4 w-4" /></a></Button>
                <Button variant="soft" asChild className="w-full sm:w-auto"><a href="mailto:hello@nebras.coffee">Send email</a></Button>
                <Button variant="pill" onClick={() => setIsCartOpen(true)} className="w-full sm:w-auto bg-white border-[#FFD6E7]">View cart ({totalItems})</Button>
              </div>
            </div>
          </div>

          <div className="relative bg-[#FFF0F6] p-3 lg:p-4 flex flex-col gap-3">
            <div className="rounded-[1.3rem] overflow-hidden border border-[#FFD6E7] flex-1 min-h-[320px] lg:min-h-[460px] shadow-inner relative bg-white">
              <iframe
                title="Nebras Coffee Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72621379768!2d-7.669394017772718!3d33.57311041935564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute top-3 left-3 bg-white border border-[#FFD6E7] rounded-full px-3 py-1.5 text-xs font-bold shadow-md flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF4D8D] animate-pulse" /> Casablanca
              </div>
            </div>
            <div className="bg-[#3E2921] text-white rounded-2xl p-4 flex flex-wrap items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center shrink-0">✦</div>
              <div className="text-xs">
                <p className="font-bold">Need directions?</p>
                <p className="text-white/70">5 mins from Casa Port Tram · Parking available</p>
              </div>
              <Button size="sm" variant="soft" className="ml-auto bg-white text-[#3E2921] hover:bg-[#FFF0F6] border-white w-full sm:w-auto" asChild><a href="https://maps.google.com/?q=Casablanca" target="_blank" rel="noreferrer">Open Maps</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-4">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-5 lg:px-8">
          <div className="rounded-t-[1.9rem] bg-[#3E2921] text-[#FFF9F3] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D8D]/10 via-transparent to-[#C8B6FF]/10 pointer-events-none" />
            <div className="relative p-6 sm:p-7 lg:p-9 grid sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr] gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-[#FF4D8D] grid place-items-center">☕</div>
                  <span className="font-serif font-black text-xl">Nebras Coffee</span>
                  <span className="bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest">EST 2024</span>
                </div>
                <p className="text-sm text-white/70 leading-6 max-w-[360px]">Specialty coffee, fresh juices and desserts. A warm neighborhood spot in Casablanca — open every day.</p>
              </div>

              <div>
                <h5 className="font-bold text-[#FFB5D0] text-sm mb-3">Explore</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#menu" className="hover:text-white">Menu</a></li>
                  <li><a href="#about" className="hover:text-white">About</a></li>
                  <li><a href="#hours" className="hover:text-white">Hours</a></li>
                  <li><a href="#location" className="hover:text-white">Location</a></li>
                  <li><a href="#contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-[#FFB5D0] text-sm mb-3">Visit</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-[#FFB5D0]" /> Casablanca, Beaulieu</li>
                  <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-[#FFB5D0]" /> 08:00–22:00 daily</li>
                  <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-[#FFB5D0]" /> +212 6 12 34 56 78</li>
                  <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-[#FFB5D0]" /> hello@nebras.coffee</li>
                </ul>
              </div>
            </div>

            <div className="relative border-t border-white/10 px-6 sm:px-7 lg:px-9 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60 text-center sm:text-left">
              <p>© {new Date().getFullYear()} Nebras Coffee. All rights reserved.</p>
              <p className="flex items-center gap-2"><Heart className="h-3 w-3 fill-[#FF4D8D] text-[#FF4D8D]" /> Made with care in Casablanca</p>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#3E2921]/50 backdrop-blur-[6px]" onClick={() => setSelectedProduct(null)} />
            <motion.div
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              className="relative bg-white rounded-[1.7rem] max-w-[460px] w-full border border-[#FFD6E7] shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden max-h-[90dvh] overflow-y-auto"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white border border-[#FFD6E7] grid place-items-center shadow-sm z-10 hover:bg-[#FFF0F6]">
                <X className="h-4 w-4" />
              </button>
              <div className="h-56 relative overflow-hidden shrink-0">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <Badge className="bg-white/90 backdrop-blur text-[#FF4D8D] border-white rounded-full">{selectedProduct.category}</Badge>
                  <span className="bg-[#3E2921] text-white text-sm font-black px-3 py-1 rounded-full">{selectedProduct.price} DH</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-serif font-black text-xl leading-none">{selectedProduct.name}</h3>
                  <p className="text-xs text-[#8B6B5E] mt-1.5 leading-relaxed">{selectedProduct.desc}</p>
                </div>

                {selectedProduct.category === "Coffee" && (
                  <div>
                    <p className="text-xs font-bold mb-2">Size</p>
                    <div className="flex gap-2">
                      {["Small", "Medium", "Large"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`flex-1 h-9 rounded-full text-xs font-bold border transition-all ${selectedSize === sz ? "bg-[#FF4D8D] text-white border-[#FF4D8D] shadow-md" : "bg-[#FFF0F6] border-[#FFD6E7] hover:bg-white"}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between bg-[#FFF7F0] border border-[#FFD6E7] rounded-full p-1">
                  <span className="text-xs font-bold px-3">Quantity</span>
                  <div className="flex items-center gap-2 bg-white border border-[#FFD6E7] rounded-full p-1">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-7 w-7 rounded-full bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center font-black text-sm">{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)} className="h-7 w-7 rounded-full bg-[#FF4D8D] text-white grid place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </div>

                <Button className="w-full h-11 text-[15px]" onClick={() => addToCart(selectedProduct, selectedSize, quantity)}>
                  Add to Cart · {selectedProduct.price * quantity} DH <ShoppingBag className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#3E2921]/40 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-[100dvh] w-full max-w-[420px] bg-[#FFFCFA] z-50 flex flex-col border-l border-[#FFD6E7] shadow-2xl"
            >
              <div className="p-5 border-b border-[#FFD6E7] bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-black text-lg flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-[#FF4D8D]" /> Your Order <span className="bg-[#FF4D8D] text-white text-xs px-2 py-0.5 rounded-full">{totalItems}</span></h3>
                  <button onClick={() => setIsCartOpen(false)} className="h-8 w-8 rounded-full bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center"><X className="h-4 w-4" /></button>
                </div>
                <p className="text-xs text-[#8B6B5E] mt-1">Review and checkout — prepared fresh in minutes.</p>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center mx-auto text-2xl">☕</div>
                    <p className="font-bold">Your cart is empty</p>
                    <p className="text-xs text-[#8B6B5E]">Add something from the menu to get started.</p>
                    <Button variant="soft" onClick={() => setIsCartOpen(false)} className="mt-2">Browse menu</Button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="bg-white border border-[#FFD6E7] rounded-2xl p-3 flex gap-3 items-center">
                      <img src={item.img} alt={item.name} className="h-14 w-14 rounded-xl object-cover border border-[#FFD6E7]" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm leading-tight truncate">{item.name}</p>
                        <p className="text-xs text-[#8B6B5E]">{item.size} · {item.price} DH</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <button onClick={() => updateCartQty(item.id, item.size, -1)} className="h-6 w-6 rounded-full bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center"><Minus className="h-3 w-3" /></button>
                          <span className="text-xs font-black w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, item.size, 1)} className="h-6 w-6 rounded-full bg-[#FF4D8D] text-white grid place-items-center"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-[#FF4D8D]">{item.price * item.qty} DH</p>
                        <p className="text-[11px] text-[#8B6B5E]">{item.qty} × {item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-[#FFD6E7] bg-white space-y-3">
                  <div className="bg-[#FFF0F6] border border-[#FFD6E7] rounded-2xl p-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#8B6B5E]">Subtotal</span><span className="font-bold">{totalCartPrice} DH</span></div>
                    <div className="flex justify-between"><span className="text-[#8B6B5E]">Delivery</span><span className="text-xs bg-white border border-[#FFD6E7] px-2 py-0.5 rounded-full">calculated at checkout</span></div>
                    <div className="h-[1px] bg-[#FFD6E7]" />
                    <div className="flex justify-between text-base font-black"><span>Total</span><span className="text-[#FF4D8D]">{totalCartPrice} DH</span></div>
                  </div>
                  <Button className="w-full h-11" onClick={() => { showToast("Order placed! We’re brewing now ☕"); setCart([]); setIsCartOpen(false) }}>
                    Checkout · {totalCartPrice} DH <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-[11px] text-[#8B6B5E]">Cash & card · 10–15 min preparation</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-[#3E2921] text-white px-4 py-2.5 rounded-full shadow-xl border border-white/10 text-sm font-medium flex items-center gap-2 max-w-[90vw]">
            <span className="h-6 w-6 rounded-full bg-[#FF4D8D] grid place-items-center text-xs shrink-0">✦</span> <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
