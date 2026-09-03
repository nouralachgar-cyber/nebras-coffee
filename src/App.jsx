import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Coffee,
  Heart,
  Sparkles,
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
  Code2,
  Palette,
  Zap,
  ArrowRight,
  Camera,
  Users,
  Music2,
  Quote,
  Flame,
  Leaf,
  CupSoda,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SpotlightNew } from "@/components/aceternity/spotlight"
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid"
import { HoverEffect } from "@/components/aceternity/hover-effect"
import { MovingBorderCard, GlowCard } from "@/components/aceternity/moving-border"
import { GridPattern, FloatingDots } from "@/components/aceternity/background-beams"

const menuData = [
  { id: 1, name: "Espresso", category: "Coffee", price: 18, desc: "Rich and bold single shot brewed from Ethiopian fine beans.", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600" },
  { id: 2, name: "Americano", category: "Coffee", price: 20, desc: "Espresso diluted with hot water for a smooth velvet flavor.", img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=600" },
  { id: 3, name: "Cappuccino", category: "Coffee", price: 22, desc: "Creamy espresso topped with steamed milk foam & cocoa dust.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600" },
  { id: 4, name: "Latte", category: "Coffee", price: 24, desc: "Silky milk poured over rich espresso with latte art.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600" },
  { id: 5, name: "Caramel Latte", category: "Coffee", price: 25, desc: "Smooth espresso with caramel syrup and steamed milk.", img: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=600" },
  { id: 7, name: "Iced Coffee", category: "Coffee", price: 23, desc: "Chilled espresso over ice with a hint of vanilla sweet milk.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600" },
  { id: 8, name: "Orange Juice", category: "Fresh Juices", price: 18, desc: "100% freshly squeezed natural orange juice.", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600" },
  { id: 9, name: "Strawberry Juice", category: "Fresh Juices", price: 20, desc: "Fresh strawberry juice packed with natural sweetness.", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600" },
  { id: 10, name: "Lemonade", category: "Fresh Juices", price: 18, desc: "Zesty refreshing lemon drink served chilled with mint.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600" },
  { id: 11, name: "Healthy Drink", category: "Fresh Juices", price: 28, desc: "Rich avocado smoothie made with milk and honey.", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600" },
  { id: 12, name: "Mango Juice", category: "Fresh Juices", price: 25, desc: "Tropical fresh mango puree blending pure sweetness.", img: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600" },
  { id: 13, name: "Chocolate Cake", category: "Desserts", price: 28, desc: "Soft chocolate cake topped with dark cocoa glaze.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" },
  { id: 14, name: "Cheesecake", category: "Desserts", price: 30, desc: "Classic New York style creamy cheesecake with berry sauce.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600" },
  { id: 15, name: "Brownie", category: "Desserts", price: 22, desc: "Fudgy chocolate brownie with crunchy walnuts.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600" },
  { id: 16, name: "Cookies", category: "Desserts", price: 15, desc: "Freshly baked chocolate chip cookies with gooey center.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600" },
  { id: 18, name: "Croissant", category: "Desserts", price: 16, desc: "Flaky buttery French pastry baked to perfection.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600" },
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
    showToast(`${product.name} added to cart ✦`)
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

  return (
    <div className="min-h-screen bg-[#FFF7F0] text-[#3E2921] selection:bg-[#FF4D8D] selection:text-white">
      {/* Announcement */}
      <div className="w-full bg-[#3E2921] text-[#FFF9F3] text-xs py-2.5 px-4 flex items-center justify-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D8D]/20 via-transparent to-[#C8B6FF]/20" />
        <span className="relative flex items-center gap-2 font-medium tracking-wide">
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-[10px]"> <Code2 className="h-3 w-3" /> dev girl era</span>
          <span>✦ Coded with lattes, love & a little pink magic — free mini cookie on orders &gt; 60 DH this week!</span>
        </span>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-40 glass border-b border-[#FFD6E7]/60">
        <div className="max-w-[1220px] mx-auto px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-[#FF4D8D] text-white grid place-items-center shadow-[0_4px_16px_rgba(255,77,141,0.35)] group-hover:rotate-6 transition-transform">
              <Coffee className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="font-serif font-extrabold text-[18px] tracking-tight">Nebras Coffee</h1>
              <p className="text-[11px] tracking-[0.14em] font-semibold text-[#FF4D8D] -mt-1">BARISTA × DEVELOPER</p>
            </div>
            <span className="hidden sm:inline-flex ml-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)] animate-pulse" />
          </a>

          <ul className="hidden lg:flex items-center gap-1 bg-white border border-[#FFD6E7] p-1 rounded-full shadow-sm">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Offers", href: "#combo" },
              { label: "Menu", href: "#menu" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#FFF0F6] hover:text-[#FF4D8D] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-white border border-[#FFD6E7] rounded-full px-1 py-1 shadow-sm">
              <span className="pl-3 pr-1 text-xs font-bold text-[#8B6B5E]">EN</span>
              <div className="h-4 w-[1px] bg-[#FFD6E7]" />
              <span className="pr-3 text-xs font-bold text-[#FF4D8D]">MA</span>
            </div>

            <Button onClick={() => setIsCartOpen(true)} className="rounded-full h-10 px-5 hidden sm:flex">
              <ShoppingBag className="h-4 w-4" /> Cart
              {totalItems > 0 && (
                <span className="ml-1 bg-white text-[#FF4D8D] text-xs font-extrabold px-2 py-0.5 rounded-full">{totalItems}</span>
              )}
            </Button>

            <button onClick={() => setIsCartOpen(true)} className="sm:hidden relative h-10 w-10 rounded-full bg-[#FF4D8D] text-white grid place-items-center shadow-md">
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-[#3E2921] text-white text-[10px] font-bold h-5 w-5 grid place-items-center rounded-full border-2 border-white">{totalItems}</span>}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden h-10 w-10 rounded-full bg-white border border-[#FFD6E7] grid place-items-center">
              {mobileOpen ? <X className="h-4 w-4" /> : <span className="space-y-1"><span className="block h-0.5 w-4 bg-[#3E2921] mx-auto" /><span className="block h-0.5 w-4 bg-[#3E2921] mx-auto" /><span className="block h-0.5 w-3 bg-[#3E2921] mx-auto" /></span>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-[#FFD6E7] bg-white/80 backdrop-blur">
              <div className="px-5 py-4 flex flex-col gap-2">
                {["Home", "About", "Offers", "Menu", "Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="py-2.5 px-4 rounded-xl hover:bg-[#FFF0F6] font-medium flex justify-between">
                    {l} <ArrowRight className="h-4 w-4 text-[#FF4D8D]" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <SpotlightNew />
        <GridPattern />
        <FloatingDots />
        <div className="max-w-[1220px] mx-auto px-5 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center relative">
          {/* left */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2">
              <Badge variant="soft" className="rounded-full px-3 py-1 gap-1.5 text-xs">
                <Sparkles className="h-3.5 w-3.5" /> welcome to Nebras — dev girl built
              </Badge>
              <span className="inline-flex items-center gap-1.5 bg-[#3E2921] text-white px-3 py-1 rounded-full text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> open till 22:00
              </span>
            </div>

            <h2 className="font-serif font-black tracking-[-0.03em] leading-[0.95] text-[38px] sm:text-[52px] lg:text-[62px]">
              <span className="block text-[#3E2921]">A Little</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] via-[#FF7AA2] to-[#C8B6FF] italic font-light">Sweetness</span>
              <span className="block text-[#3E2921]">in Every Sip.</span>
            </h2>

            <p className="text-[15px] lg:text-[16px] leading-7 text-[#8B6B5E] max-w-[520px]">
              Crafted by a barista who codes. Discover your favorite coffee, fresh juices & desserts in a warm, soft-pink sanctuary. Built with precision, served with love.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-[15px]">
                <a href="#menu">Explore Menu <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button variant="pill" size="lg" asChild className="h-12 px-7 border-[#FFD6E7] bg-white hover:bg-[#FFF0F6]">
                <a href="#about">Our Story</a>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
                <div className="h-9 w-9 rounded-full bg-[#FF4D8D] border-2 border-white grid place-items-center text-white text-xs font-bold">+2k</div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 font-bold"><Star className="h-4 w-4 fill-[#FFB700] text-[#FFB700]" /> 4.9/5 <span className="font-normal text-[#8B6B5E]">from 1,847 reviews</span></div>
                <p className="text-xs text-[#8B6B5E]">loved by dev girls & coffee heads</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-auto bg-white border border-[#FFD6E7] rounded-full px-3 py-1.5 shadow-sm">
                <div className="h-8 w-8 rounded-full bg-[#FFF0F6] grid place-items-center text-[#FF4D8D]"><CupSoda className="h-4 w-4" /></div>
                <div className="text-xs leading-tight"><p className="font-bold">1,200+ cups</p><p className="text-[#8B6B5E]">served weekly</p></div>
              </div>
            </div>
          </motion.div>

          {/* right */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative lg:h-[560px] flex items-center justify-center">
            {/* code window floating */}
            <div className="absolute -top-2 left-2 lg:left-0 z-20 w-[94%] sm:w-[380px] rounded-2xl overflow-hidden border border-[#FFD6E7] bg-[#0B0B12] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.04]">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" /><span className="h-3 w-3 rounded-full bg-[#FFBD2E]" /><span className="h-3 w-3 rounded-full bg-[#27CA3F]" />
                <span className="ml-3 text-xs font-mono text-white/60">nebras.config.ts — soft girl build</span>
                <span className="ml-auto text-[10px] bg-[#FF4D8D] text-white px-2 py-0.5 rounded-full font-bold">● live</span>
              </div>
              <div className="p-4 font-mono text-xs leading-5">
                <div className="text-white/50">// brew with intention</div>
                <div><span className="text-[#C8B6FF]">const</span> <span className="text-white">order</span> <span className="text-white/60">=</span> <span className="text-[#FF7AA2]">await</span> <span className="text-[#7DD3FC]">nebras</span>.<span className="text-[#FDE68A]">brew</span>({"{"}</div>
                <div className="pl-4 text-[#A7F3D0]">mood: <span className="text-[#FDE68A]">&quot;soft girl&quot;</span>,</div>
                <div className="pl-4 text-[#A7F3D0]">shot: <span className="text-[#FDE68A]">&quot;extra sweet&quot;</span>,</div>
                <div className="pl-4 text-[#A7F3D0]">aesthetic: <span className="text-[#FDE68A]">&quot;cozy × pink&quot;</span></div>
                <div className="text-white">{"}"})</div>
                <div className="mt-2 inline-flex items-center gap-2 bg-[#FF4D8D]/20 border border-[#FF4D8D]/30 text-[#FFB5D0] px-2.5 py-1 rounded-full text-[11px]">✦ compiled successfully — 0 errors</div>
              </div>
            </div>

            <div className="relative mt-28 sm:mt-32 w-full max-w-[520px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D8D]/20 via-[#FFB5D0]/20 to-[#C8B6FF]/20 blur-[30px] rounded-[2rem]" />
              <img src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=900" alt="Latte art" className="relative w-full h-[380px] lg:h-[440px] object-cover rounded-[1.9rem] border-[6px] border-white shadow-[0_24px_64px_rgba(62,41,33,0.18)]" />

              {/* floating cards */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-3 lg:-left-6 bottom-10 bg-white border border-[#FFD6E7] rounded-2xl p-3 shadow-xl flex items-center gap-3 w-[210px]">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200" alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="text-xs"><p className="font-bold">Caramel Latte</p><p className="text-[#8B6B5E]">most loved ✦ 4.9</p><p className="font-bold text-[#FF4D8D]">25 DH</p></div>
                <div className="ml-auto h-7 w-7 rounded-full bg-[#FF4D8D] text-white grid place-items-center"><Plus className="h-3.5 w-3.5" /></div>
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, delay: 0.4 }} className="absolute -right-2 lg:-right-4 top-10 bg-[#3E2921] text-white rounded-2xl p-3 shadow-xl flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-white/10 grid place-items-center">☕</span>
                <div className="text-xs pr-1"><p className="font-bold">Freshly brewed</p><p className="text-white/70">in 2:30 mins</p></div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </motion.div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#FFD6E7] rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-xs font-bold whitespace-nowrap">
                <span className="h-6 w-6 rounded-full bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center text-[#FF4D8D]"><Heart className="h-3.5 w-3.5 fill-[#FF4D8D]" /></span>
                made with love & precision
                <span className="bg-[#FF4D8D] text-white px-2 py-0.5 rounded-full text-[10px]">v2.0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* marquee */}
        <div className="border-y border-[#FFD6E7] bg-white/60 backdrop-blur overflow-hidden">
          <div className="py-2.5 flex gap-6 animate-[marquee_18s_linear_infinite] whitespace-nowrap text-xs font-bold tracking-widest uppercase text-[#3E2921]/60">
            <span>✦ specialty coffee</span><span>✦ fresh juices</span><span>✦ artisan desserts</span><span>✦ dev girl aesthetic</span><span>✦ brewed with code</span><span>✦ soft girl era</span><span>✦ nebras coffee</span>
            <span>✦ specialty coffee</span><span>✦ fresh juices</span><span>✦ artisan desserts</span><span>✦ dev girl aesthetic</span><span>✦ brewed with code</span>
          </div>
        </div>
      </section>

      {/* ABOUT - BENTO */}
      <section id="about" className="max-w-[1220px] mx-auto px-5 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="soft" className="mb-3 rounded-full"><Palette className="h-3.5 w-3.5" /> our story — bento edition</Badge>
            <h3 className="font-serif font-black text-[30px] lg:text-[40px] leading-none tracking-tight">More Than Just <span className="text-[#FF4D8D] italic font-light">Coffee</span></h3>
            <p className="text-[#8B6B5E] text-sm mt-2 max-w-[560px]">A dev girl sanctuary where coffee meets code, soft pinks meet rich browns, and every detail is pixel-perfected — by a woman who brews and builds.</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono bg-[#0B0B12] text-white px-4 py-2 rounded-full border border-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 3 pillars • crafted 2024 • v2.1
          </div>
        </div>

        <BentoGrid>
          <BentoGridItem
            title="The Ritual"
            description="From bean to brew, every step is a commit. We source, roast & pull with the patience of debugging at 2am — but cuter."
            icon={<Coffee className="h-4 w-4" />}
            header={
              <div className="h-full min-h-[8rem] rounded-xl overflow-hidden border border-[#FFD6E7] bg-gradient-to-br from-[#FFF0F6] to-[#FFE4EF] p-0 relative">
                <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600" alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="relative p-4 flex flex-col justify-end h-full">
                  <div className="inline-flex w-fit bg-white border border-[#FFD6E7] rounded-full px-2.5 py-1 text-xs font-bold gap-1"><Flame className="h-3.5 w-3.5 text-[#FF4D8D]" /> slow bar • specialty</div>
                </div>
              </div>
            }
          />
          <BentoGridItem
            title="Dev Girl Energy"
            description="Coded, designed & curated by a woman in tech. Soft, powerful, detail-obsessed. If you know, you know."
            icon={<Code2 className="h-4 w-4" />}
            header={
              <div className="h-full min-h-[8rem] rounded-xl bg-[#0B0B12] border border-white/10 p-4 font-mono text-xs relative overflow-hidden">
                <div className="flex gap-1 mb-3"><span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#27CA3F]" /></div>
                <div className="text-white/40">// she codes & she brews</div>
                <div className="text-[#FF7AA2]">girl<span className="text-white">.power</span> = <span className="text-[#FDE68A]">&quot;∞&quot;</span></div>
                <div className="text-[#7DD3FC]">coffee<span className="text-white">.aesthetic</span>++</div>
                <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-[#FF4D8D]/20 blur-xl" />
              </div>
            }
          />
          <BentoGridItem
            title="The Vibe"
            description="Think: soft pink banquettes, latte art, low-fi beats & warm lighting that makes your selfie glow without a filter."
            icon={<Heart className="h-4 w-4" />}
            header={
              <div className="h-full min-h-[8rem] rounded-xl overflow-hidden border border-[#FFD6E7] relative">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur border border-[#FFD6E7] rounded-full px-2.5 py-1 text-xs font-bold flex items-center gap-1"><Sparkles className="h-3 w-3 text-[#FF4D8D]" /> cozy • instagrammable</div>
              </div>
            }
          />
        </BentoGrid>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            { k: "4.9★", v: "avg rating", d: "1,800+ reviews" },
            { k: "100%", v: "fresh daily", d: "baked & squeezed" },
            { k: "8am–10pm", v: "we’re awake", d: "for your cravings" },
          ].map((s) => (
            <div key={s.v} className="bg-white border border-[#FFD6E7] rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center font-black text-[#FF4D8D] text-sm">{s.k}</div>
              <div><p className="text-sm font-bold">{s.v}</p><p className="text-xs text-[#8B6B5E]">{s.d}</p></div>
              <Zap className="ml-auto h-4 w-4 text-[#FFD6E7]" />
            </div>
          ))}
        </div>
      </section>

      {/* COMBO */}
      <section id="combo" className="max-w-[1220px] mx-auto px-5 lg:px-8">
        <MovingBorderCard className="max-w-[1220px]">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-7 lg:p-9 space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-[#FF4D8D]">🌸 limited — this week</Badge>
                <Badge variant="soft" className="rounded-full">save 12 DH</Badge>
              </div>
              <h3 className="font-serif font-black text-[28px] lg:text-[34px] leading-none">Sweet Coffee <span className="text-[#FF4D8D] italic font-light">Moments</span></h3>
              <p className="text-sm text-[#8B6B5E] leading-6">Coffee + a little sweetness = the perfect pause. Our dev-girl favorite combo — built for study sessions, gossip & glow-ups.</p>

              <GlowCard className="p-4 flex items-center gap-4 !rounded-2xl">
                <div className="h-12 w-12 rounded-xl bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center text-xl">☕</div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Coffee & Cake Combo</p>
                  <p className="text-xs text-[#8B6B5E]">أي قهوة من اختيارك + Mini Cake</p>
                </div>
                <div className="text-right">
                  <p className="text-xs line-through text-[#8B6B5E]">47 DH</p>
                  <p className="text-xl font-black text-[#FF4D8D]">35 DH</p>
                </div>
              </GlowCard>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {["Any coffee size M", "Choice of 3 mini cakes", "Free pink sticker pack", "Served in 7 mins"].map((x) => (
                  <li key={x} className="flex items-center gap-2 bg-[#FFF0F6] border border-[#FFD6E7] rounded-full px-3 py-2 font-medium"><span className="h-5 w-5 rounded-full bg-[#FF4D8D] text-white grid place-items-center text-[10px]">✓</span> {x}</li>
                ))}
              </ul>

              <Button size="lg" className="w-full sm:w-auto h-11" onClick={() => { showToast("Combo added! Pick your coffee ☕"); document.querySelector('#menu')?.scrollIntoView({behavior:'smooth'}) }}>
                Claim Combo — 35 DH <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative bg-[#FFF0F6] p-6 lg:p-7 flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-[1.4rem] border border-[#FFD6E7] flex-1">
                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=700" alt="Combo" className="w-full h-full min-h-[280px] object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border border-[#FFD6E7] rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-emerald-500" /> fresh • limited batch</div>
                <div className="absolute bottom-3 left-3 right-3 bg-[#3E2921] text-white rounded-2xl p-3 flex items-center justify-between">
                  <div className="text-xs"><p className="font-bold">Barista pick</p><p className="text-white/70">Latte + Cheesecake = 🤍</p></div>
                  <span className="h-8 w-8 rounded-full bg-[#FF4D8D] grid place-items-center">✦</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { t: "⏱ 7m", s: "avg serve" },
                  { t: "★ 4.9", s: "1.2k votes" },
                  { t: "♡ 2.4k", s: "saved" },
                ].map((x) => (
                  <div key={x.t} className="bg-white border border-[#FFD6E7] rounded-2xl p-3 text-center">
                    <p className="font-black text-sm">{x.t}</p>
                    <p className="text-[11px] text-[#8B6B5E]">{x.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MovingBorderCard>
      </section>

      {/* MENU */}
      <section id="menu" className="max-w-[1220px] mx-auto px-5 lg:px-8 py-12 lg:py-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="soft" className="rounded-full mb-3">🥐 menu — curated with love</Badge>
          <h3 className="font-serif font-black text-[30px] lg:text-[42px] leading-none">Explore Our <span className="text-[#FF4D8D] italic font-light">Delicious</span> Menu</h3>
          <p className="text-sm text-[#8B6B5E] mt-2">Filter by vibe, search your craving, tap a card to customize. Every item is plated for the feed and brewed for the soul.</p>
        </div>

        <div className="bg-white border border-[#FFD6E7] rounded-[1.6rem] p-3 lg:p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Coffee", "Fresh Juices", "Desserts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${activeCategory === cat ? "bg-[#FF4D8D] text-white border-[#FF4D8D] shadow-md" : "bg-[#FFF0F6] text-[#3E2921] border-[#FFD6E7] hover:bg-white"}`}
              >
                {cat === "All" ? "✦ All" : cat === "Coffee" ? "☕ Coffee" : cat === "Fresh Juices" ? "🍓 Juices" : "🍰 Desserts"}
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
          <p className="text-[#8B6B5E]"><span className="font-bold text-[#3E2921]">{filteredMenu.length}</span> items • {activeCategory} {searchQuery && `• “${searchQuery}”`}</p>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFF0F6] border border-[#FFD6E7] rounded-full px-3 py-1 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> live menu</span>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="bg-white border border-dashed border-[#FFD6E7] rounded-[1.6rem] p-10 text-center">
            <p className="font-serif font-bold text-lg">No sips found</p>
            <p className="text-sm text-[#8B6B5E]">Try a different search or category.</p>
            <Button variant="soft" className="mt-4" onClick={() => { setSearchQuery(""); setActiveCategory("All") }}>Clear filters</Button>
          </div>
        ) : (
          <HoverEffect items={filteredMenu} onSelect={(item) => { setSelectedProduct(item); setQuantity(1); setSelectedSize("Medium") }} />
        )}
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="max-w-[1220px] mx-auto px-5 lg:px-8">
        <div className="rounded-[1.8rem] bg-[#3E2921] text-[#FFF9F3] p-6 lg:p-8 grid lg:grid-cols-[1.2fr_1.8fr] gap-6 items-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D8D]/20 via-transparent to-[#C8B6FF]/20 pointer-events-none" />
          <div className="relative">
            <Badge className="bg-white/10 border-white/20 text-white rounded-full backdrop-blur">♡ community love</Badge>
            <h4 className="font-serif font-black text-2xl lg:text-3xl leading-tight mt-3">Built by a <span className="text-[#FFB5D0] italic font-light">dev girl</span>, loved by the city.</h4>
            <p className="text-sm text-white/70 mt-2">Real words from our regulars — the ones who code, study & sip here daily.</p>
          </div>
          <div className="relative grid sm:grid-cols-2 gap-3">
            {[
              { n: "Aya • CS student", t: "The pink latte is literally my personality now. And the wifi? chef's kiss for late commits.", a: "photo-1438761681033-6461ffad8d80" },
              { n: "Salma • Designer", t: "Soft girl aesthetic meets serious coffee. My go-to for client calls & croissants.", a: "photo-1544005313-94ddf0286df2" },
            ].map((q) => (
              <div key={q.n} className="bg-white text-[#3E2921] rounded-2xl p-4 border border-white/20 relative">
                <Quote className="h-4 w-4 text-[#FF4D8D]/30 absolute top-3 right-3" />
                <div className="flex items-center gap-2 mb-2">
                  <img src={`https://images.unsplash.com/${q.a}?q=80&w=100`} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <p className="text-xs font-bold">{q.n}</p>
                  <span className="ml-auto flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#FFB700] text-[#FFB700]" />)}</span>
                </div>
                <p className="text-xs leading-5 text-[#6B4534]">“{q.t}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-[1220px] mx-auto px-5 lg:px-8 py-12 lg:py-16">
        <div className="rounded-[1.9rem] bg-white border border-[#FFD6E7] shadow-[0_12px_40px_rgba(255,77,141,0.08)] overflow-hidden grid lg:grid-cols-2">
          <div className="p-7 lg:p-9 space-y-6">
            <div>
              <Badge variant="soft" className="rounded-full">📍 visit the studio</Badge>
              <h3 className="font-serif font-black text-[30px] leading-none mt-3">Come <span className="text-[#FF4D8D] italic font-light">Visit</span> Us</h3>
              <p className="text-sm text-[#8B6B5E] mt-2">Soft lighting, warm wood, pink neon. Bring your laptop, your bestie, or just your craving.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Location", value: "Casablanca, Morocco", sub: "Beaulieu • near Twin Center" },
                { icon: Phone, label: "Phone", value: "+212 6 12 34 56 78", sub: "WhatsApp preferred" },
                { icon: Mail, label: "Email", value: "hello@nebras.coffee", sub: "we reply in < 2h" },
                { icon: Clock, label: "Hours", value: "08:00 — 22:00", sub: "Every day • late nights Fri" },
              ].map((c) => (
                <div key={c.label} className="bg-[#FFF7F0] border border-[#FFD6E7] rounded-2xl p-4 flex gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white border border-[#FFD6E7] grid place-items-center text-[#FF4D8D] shrink-0"><c.icon className="h-4 w-4" /></div>
                  <div className="text-xs leading-tight">
                    <p className="font-bold text-[#3E2921]">{c.label}</p>
                    <p className="font-semibold">{c.value}</p>
                    <p className="text-[#8B6B5E]">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild><a href="https://wa.me/212612345678" target="_blank" rel="noreferrer">WhatsApp us <ArrowRight className="h-4 w-4" /></a></Button>
              <Button variant="soft" asChild><a href="mailto:hello@nebras.coffee">Send email</a></Button>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-[#FFD6E7]/60">
              <p className="text-xs font-bold">Follow the brew:</p>
              <div className="flex gap-2">
                {[
                  { Icon: Camera, href: "#" },
                  { Icon: Users, href: "#" },
                  { Icon: Music2, href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="h-8 w-8 rounded-full bg-[#3E2921] text-white grid place-items-center hover:bg-[#FF4D8D] transition-colors">
                    <s.Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <span className="ml-auto text-xs font-mono bg-[#0B0B12] text-white px-2.5 py-1 rounded-full">neb.ras.coffee</span>
            </div>
          </div>

          <div className="relative bg-[#FFF0F6] p-3 lg:p-4 flex flex-col gap-3">
            <div className="rounded-[1.3rem] overflow-hidden border border-[#FFD6E7] flex-1 min-h-[320px] shadow-inner relative">
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
                <span className="h-2 w-2 rounded-full bg-[#FF4D8D] animate-pulse" /> Live location • Casablanca
              </div>
            </div>
            <div className="bg-[#3E2921] text-white rounded-2xl p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center">✦</div>
              <div className="text-xs">
                <p className="font-bold">Need directions?</p>
                <p className="text-white/70">We’re 5 mins from Casa Port Tram • Parking available</p>
              </div>
              <Button size="sm" variant="soft" className="ml-auto bg-white text-[#3E2921] hover:bg-[#FFF0F6] border-white" asChild><a href="https://maps.google.com/?q=Casablanca" target="_blank" rel="noreferrer">Open Maps</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-6">
        <div className="max-w-[1220px] mx-auto px-5 lg:px-8">
          <div className="rounded-t-[1.9rem] bg-[#3E2921] text-[#FFF9F3] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D8D]/15 via-transparent to-[#C8B6FF]/15 pointer-events-none" />
            <div className="absolute -top-20 -right-20 h-60 w-60 bg-[#FF4D8D]/20 blur-[50px] rounded-full" />
            <div className="relative p-7 lg:p-9 grid lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-[#FF4D8D] grid place-items-center">☕</div>
                  <span className="font-serif font-black text-xl">Nebras Coffee</span>
                  <span className="bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest">EST 2024</span>
                </div>
                <p className="text-sm text-white/70 leading-6 max-w-[360px]">A dev girl’s dream brewed into reality. Coffee, sweetness & good moments — built with code, served with heart. Deployed from Casablanca with love.</p>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> system healthy • 99.9% uptime • v2.1.0
                </div>
              </div>

              <div>
                <h5 className="font-bold text-[#FFB5D0] text-sm mb-3">Navigate</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#home" className="hover:text-white">Home</a></li>
                  <li><a href="#about" className="hover:text-white">About</a></li>
                  <li><a href="#menu" className="hover:text-white">Menu</a></li>
                  <li><a href="#contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-[#FFB5D0] text-sm mb-3">Social</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><a href="#" className="hover:text-white flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> Instagram</a></li>
                  <li><a href="#" className="hover:text-white flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Facebook</a></li>
                  <li><a href="#" className="hover:text-white flex items-center gap-1.5"><Music2 className="h-3.5 w-3.5" /> TikTok</a></li>
                </ul>
              </div>

              <div className="bg-white text-[#3E2921] rounded-2xl p-4 border border-white/20">
                <p className="font-bold text-sm">Join the pink list ✦</p>
                <p className="text-xs text-[#8B6B5E]">Get drops, secret menu & 10% off first order.</p>
                <div className="flex gap-2 mt-3">
                  <Input placeholder="your@email.com" className="h-9 bg-[#FFF7F0] border-[#FFD6E7]" />
                  <Button size="sm" className="h-9 shrink-0">Join</Button>
                </div>
                <p className="text-[11px] text-[#8B6B5E] mt-2">No spam. Unsubscribe anytime. Built with consent.</p>
              </div>
            </div>

            <div className="relative border-t border-white/10 px-7 lg:px-9 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
              <p>© {new Date().getFullYear()} Nebras Coffee. All rights reserved. Made with <Heart className="inline h-3 w-3 fill-[#FF4D8D] text-[#FF4D8D]" /> & VS Code.</p>
              <p className="flex items-center gap-2 font-mono"><Code2 className="h-3.5 w-3.5" /> crafted by dev girl • Casablanca, MA</p>
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
              className="relative bg-white rounded-[1.7rem] max-w-[460px] w-full border border-[#FFD6E7] shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white border border-[#FFD6E7] grid place-items-center shadow-sm z-10 hover:bg-[#FFF0F6]">
                <X className="h-4 w-4" />
              </button>
              <div className="h-56 relative overflow-hidden">
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
                  Add to Cart • {selectedProduct.price * quantity} DH <ShoppingBag className="h-4 w-4" />
                </Button>
                <p className="text-center text-[11px] text-[#8B6B5E] font-mono">✦ free sticker pack on orders over 60 DH</p>
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
                <p className="text-xs text-[#8B6B5E] mt-1">Review & checkout — we’ll brew it fresh in minutes.</p>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-[#FFF0F6] border border-[#FFD6E7] grid place-items-center mx-auto text-2xl">🛍️</div>
                    <p className="font-bold">Your cart is empty</p>
                    <p className="text-xs text-[#8B6B5E]">Add something sweet — you deserve it.</p>
                    <Button variant="soft" onClick={() => setIsCartOpen(false)} className="mt-2">Browse menu</Button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="bg-white border border-[#FFD6E7] rounded-2xl p-3 flex gap-3 items-center">
                      <img src={item.img} alt={item.name} className="h-14 w-14 rounded-xl object-cover border border-[#FFD6E7]" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm leading-tight truncate">{item.name}</p>
                        <p className="text-xs text-[#8B6B5E]">{item.size} • {item.price} DH</p>
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
                  <Button className="w-full h-11" onClick={() => { showToast("Order placed! 🎉 We’re brewing now"); setCart([]); setIsCartOpen(false) }}>
                    Checkout • {totalCartPrice} DH <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-[11px] text-[#8B6B5E]">Secure checkout • Cash & card • 15-20 min prep</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-[#3E2921] text-white px-4 py-2.5 rounded-full shadow-xl border border-white/10 text-sm font-medium flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-[#FF4D8D] grid place-items-center text-xs">✦</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
