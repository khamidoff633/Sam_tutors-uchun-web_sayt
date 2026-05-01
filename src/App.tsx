import { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Send, 
  ChevronRight, 
  Users, 
  Award, 
  BookOpen, 
  Star, 
  Menu, 
  X,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- CUSTOM COMPONENTS ---

const SamTutorsLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} bg-zinc-900 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-yellow-400/20 group-hover:border-yellow-400 transition-all duration-300`}>
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyi9X7yHC69fg-biLuYD2P4GPqJR1ODISmqAjm-ZPvf8_B83Vv" 
      alt="Sam Tutors Logo" 
      className="w-full h-full object-cover"
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.documentElement.style.overflow = ""; 
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Asosiy", href: "#home" },
    { name: "Nega biz?", href: "#why-us" },
    { name: "Aloqa", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-xl py-2 shadow-2xl border-b border-white/5" : "bg-transparent py-6"}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center transition-all duration-500 ${scrolled ? "scale-90 opacity-90" : "scale-100 opacity-100"}`}>
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group relative z-[1100]">
          <SamTutorsLogo className={`transition-all duration-500 ${scrolled ? "w-8 h-8" : "w-10 h-10 sm:w-14 sm:h-14"}`} />
          <span className={`font-black tracking-tighter text-white transition-all duration-500 ${scrolled ? "text-lg" : "text-xl sm:text-2xl"}`}>
            Sam<span className="text-yellow-400">Tutors</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-[13px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
              {link.name}
            </a>
          ))}
          <a href="tel:+998992660033" className="bg-yellow-400 text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-yellow-300 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <Phone size={16} />
            +998 99 266 00 33
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden focus:outline-none transition-all duration-500 rounded-full p-2 h-14 w-14 flex items-center justify-center ${isOpen ? "fixed top-8 right-6 sm:right-10 z-[3000] bg-zinc-900 border-2 border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.3)]" : "relative z-[2000] text-white hover:bg-white/5"}`}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-8 h-8 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 items-end w-7"
              >
                <div className="h-1 bg-white rounded-full w-full" />
                <div className="h-1 bg-yellow-400 rounded-full w-3/4" />
                <div className="h-1 bg-white rounded-full w-1/2" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[1010] md:hidden bg-black flex flex-col p-6 pt-24 overflow-y-auto"
          >
            {/* Decorated background for menu */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-400/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col items-center justify-center min-h-full gap-8 w-full relative z-10 py-10">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl sm:text-5xl font-black text-white hover:text-yellow-400 transition-colors tracking-tighter text-center"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs mt-8 pt-10 border-t border-white/10 flex flex-col items-center"
              >
                <a href="tel:+998992660033" className="flex items-center justify-center gap-3 bg-yellow-400 text-black w-full py-5 rounded-2xl font-black text-xl shadow-[0_15px_30px_rgba(250,204,21,0.2)] active:scale-95 transition-all text-center">
                  <Phone size={24} />
                  Bog'lanish
                </a>
                <p className="text-gray-500 text-center mt-6 font-bold tracking-widest">+998 99 266 00 33</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 pb-12 lg:py-20 overflow-hidden bg-black w-full">
    {/* Abstract background elements */}
    <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-yellow-400/10 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-yellow-400/5 rounded-full blur-[80px] sm:blur-[120px]" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center lg:text-left order-2 lg:order-1"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400/5 border border-yellow-400/20 rounded-full text-yellow-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 sm:mb-8 mx-auto lg:mx-0 shadow-lg shadow-black/40"
        >
          <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          Muvaffaqiyatli qabul ochiq
        </motion.div>
        
        <h1 className="text-[clamp(2.2rem,10vw,5.5rem)] font-black text-white leading-[1.05] mb-5 sm:mb-8 tracking-[-0.04em]">
          Kelajagingizni biz bilan <br className="hidden sm:block" />
          <span className="text-yellow-400 italic">boshlang 🚀</span>
        </h1>
        
        <p className="text-sm sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
          Since 2022 • 4000+ o'quvchi ishonchini oqlagan <span className="text-white">Sam Tutors Group</span>. Sifatli ta'lim va kafolatlangan natija.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
          <a 
            href="https://t.me/sam_tutors_admin" 
            target="_blank" 
            className="group flex items-center justify-center gap-3 bg-yellow-400 text-black px-6 py-4 rounded-xl font-black text-base sm:text-lg hover:bg-yellow-300 transition-all active:scale-95 shadow-[0_15px_35px_rgba(250,204,21,0.25)] w-full sm:w-auto"
          >
            Telegramda yozilish
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="tel:+998992660033" 
            className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white px-6 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto backdrop-blur-sm"
          >
            <Phone size={20} className="text-yellow-400" />
            +998 99 266 00 33
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative block order-1 lg:order-2 px-4 sm:px-0"
      >
        <div className="relative z-10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-[6px] sm:border-[12px] border-white/5 aspect-square lg:aspect-[5/4] bg-zinc-900 shadow-2xl group">
           <img 
             src="https://www.theteflacademy.com/wp-content/uploads/2021/08/AdobeStock_254378815-1.jpeg.webp" 
             alt="Sam Tutors English Class" 
             className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
        </div>
        
        {/* Floating badge */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-2 sm:-bottom-10 sm:-left-10 bg-zinc-950 border-2 border-yellow-400/50 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="text-3xl sm:text-5xl font-black text-yellow-400 mb-1 leading-none tracking-tighter">4000+</p>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-black">Talabalar Isbonchini oqlagan</p>
            </div>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-400/20">
               <Award className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Stats = () => {
  const stats = [
    { label: "O'quvchilar", value: "4000+", color: "bg-black text-yellow-400" },
    { label: "Top Natijalar (A+)", value: "15+", color: "bg-white text-black" },
    { label: "Yaxshi Natijalar (A)", value: "10+", color: "bg-black text-yellow-400" },
    { label: "C1 Sertifikatlar", value: "4+", color: "bg-white text-black" },
    { label: "B2 Sertifikatlar", value: "30+", color: "bg-black text-yellow-400" },
    { label: "Oliy O'quv Yurti", value: "50+", color: "bg-white text-black" },
  ];

  return (
    <section className="bg-black py-4 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex lg:grid lg:grid-cols-6 gap-4 sm:gap-6 min-w-max lg:min-w-0 pb-4 lg:pb-0">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`w-48 lg:w-auto h-40 sm:h-48 flex flex-col items-center justify-center rounded-[2rem] sm:rounded-[3rem] p-6 text-center ${stat.color} border border-white/5 shadow-2xl`}
            >
              <p className="text-4xl sm:text-5xl font-black mb-2 tracking-tighter leading-none">{stat.value}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-60 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const points = [
    { icon: <Users size={32} />, title: "Tajribali ustozlar", desc: "Ko'p yillik tajribaga ega, kuchli metodikaga ega professionallar." },
    { icon: <BookOpen size={32} />, title: "Amaliy darslar", desc: "Har bir mavzuni mantiqiy tushunish va testlar ustida ishlash." },
    { icon: <Award size={32} />, title: "Yuqori Natijalar", desc: "IELTS 7.5, 8.0, 8.5 ko'rsatkichlarini kafolatlaymiz!" },
    { icon: <Star size={32} />, title: "Kuchli Motivatsiya", desc: "Orzuingizdagi natijaga erishish uchun maxsus darslar." },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-32 bg-[#020202] relative overflow-hidden min-h-[100dvh] flex items-center w-full">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center lg:text-left mb-10 lg:mb-20 flex flex-col lg:flex-row items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 sm:gap-6 max-w-2xl px-2"
          >
            <h2 className="text-[clamp(1.8rem,8vw,4.5rem)] font-black text-white leading-[1] tracking-tighter uppercase italic">
              Nega aynan <br /><span className="text-yellow-400">bizni tanlashadi?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-xl leading-relaxed font-medium">
              Sam Tutors - bu shunchaki o'quv markazi emas, bu sizning muvaffaqiyatli kelajagingiz poydevori.
            </p>
          </motion.div>
          <div className="hidden lg:block w-32 h-[1px] bg-yellow-400/50 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8">
          {points.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 sm:p-12 bg-white/[0.02] border border-white/5 rounded-[2rem] sm:rounded-[3.5rem] hover:bg-white/[0.04] hover:border-yellow-400/20 transition-all group flex flex-col sm:flex-row gap-4 sm:gap-10"
            >
              <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400 border border-yellow-400/10 group-hover:bg-yellow-400 group-hover:text-black transition-all group-hover:scale-110 duration-500">
                {p.icon}
              </div>
              <div>
                <h4 className="text-xl font-black text-white mb-2 tracking-tight">{p.title}</h4>
                <p className="text-gray-500 text-xs sm:text-lg leading-relaxed font-medium">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Doniyor Abdullayev", text: "IELTS natijamda Sam Tutors ning hissasi katta. 8.0 ball olishimda ustozlarimning professional metodikasi va daldasi sababchi bo'ldi.", role: "Talaba (IELTS 8.0+)" },
    { name: "Mohira Sodiqova", text: "Matematika darslaridan so'ng bilimlari ancha mustahkamlandi. Har bir misolning eng oson yechimlarini o'rgandim.", role: "Oliy O'quv Yurti Talabasi" },
    { name: "Otabek G'iyosov", text: "CEFR C1 darajasiga chiqishimda ushbu markazning roli beqiyos. Atmosfera va bilim berish darajasi juda yuqori.", role: "C1 Sertifikat sohibi" },
  ];

  return (
    <section className="py-20 sm:py-32 bg-black overflow-hidden relative min-h-[100dvh] flex items-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center lg:text-left mb-16 sm:mb-20">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-white mb-6 uppercase italic tracking-tighter">O'quvchilarimiz <br className="sm:hidden" /> <span className="text-yellow-400">fikrlari</span></h2>
          <div className="flex justify-center lg:justify-start gap-1">
             {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-950/50 backdrop-blur-sm p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] border border-white/5 relative group hover:border-yellow-400/20 transition-all duration-500"
            >
              <div className="text-yellow-400/5 absolute top-8 right-10 text-8xl font-black italic select-none">"</div>
              <p className="text-gray-400 italic mb-10 relative z-10 leading-relaxed text-base sm:text-xl font-medium group-hover:text-gray-200 transition-colors">"{t.text}"</p>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-black text-xl sm:text-2xl shadow-xl shadow-yellow-400/10">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="text-white font-black text-lg sm:text-xl tracking-tight">{t.name}</h5>
                  <p className="text-[10px] sm:text-xs text-yellow-400 font-black uppercase tracking-[0.2em] mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-12 sm:py-32 bg-[#020202] min-h-[100dvh] flex items-center">
    <div className="max-w-[1600px] mx-auto px-4 sm:px-10 w-full">
      <div className="bg-yellow-400 rounded-[2.5rem] sm:rounded-[5rem] p-6 sm:p-20 lg:p-32 overflow-hidden relative shadow-[0_30px_100px_rgba(250,204,21,0.15)]">
        <div className="absolute top-0 right-[-5%] p-20 opacity-[0.03] pointer-events-none hidden lg:block">
          <Phone size={600} className="text-black" />
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-[clamp(1.75rem,7vw,4rem)] font-black text-black italic uppercase leading-[1.05] mb-8 sm:mb-16 tracking-tighter">
              Biz bilan <br className="hidden sm:block" /> bog'laning <br /> va hoziroq <br className="hidden sm:block" /> boshlang!
            </h2>
            <div className="space-y-5 sm:space-y-10">
              <a href="tel:+998992660033" className="flex items-center gap-4 sm:gap-6 text-black hover:translate-x-3 transition-transform duration-500 group">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-[1.2rem] sm:rounded-[2.5rem] flex items-center justify-center text-yellow-400 shrink-0 shadow-2xl shadow-black/20">
                  <Phone size={28} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] sm:text-xs font-black uppercase text-black/40 tracking-[0.3em] mb-1">Telefon raqam</p>
                  <p className="text-xl sm:text-4xl font-black tracking-tighter">+998 99 266 00 33</p>
                </div>
              </a>
              <a href="https://t.me/sam_tutors_admin" target="_blank" className="flex items-center gap-4 sm:gap-6 text-black hover:translate-x-3 transition-transform duration-500 group">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-black rounded-[1.2rem] sm:rounded-[2.5rem] flex items-center justify-center text-yellow-400 shrink-0 shadow-2xl shadow-black/20">
                  <Send size={28} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] sm:text-xs font-black uppercase text-black/40 tracking-[0.3em] mb-1">Telegramda yozing</p>
                  <p className="text-xl sm:text-4xl font-black tracking-tighter truncate max-w-[200px] sm:max-w-none">@sam_tutors_admin</p>
                </div>
              </a>
              <div className="flex items-center gap-6 text-black">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center text-yellow-400 shrink-0 shadow-2xl shadow-black/20">
                  <MapPin size={32} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs font-black uppercase text-black/40 tracking-[0.3em] mb-1">Manzilimiz</p>
                  <p className="text-xl sm:text-3xl font-black italic tracking-tight">Dagbetskiy ko'chasi</p>
                  <p className="text-black/60 font-bold">(Bank kollej yonida)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a 
                href="https://maps.app.goo.gl/VP4soVhNCuv8bwxd7" 
                target="_blank" 
                className="bg-black text-yellow-400 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-between hover:bg-zinc-900 transition-all font-black text-xl sm:text-2xl group shadow-2xl"
              >
                <span>Xarita orqali <br className="sm:hidden" /> topish</span>
                <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
            <p className="text-center text-black/40 font-black uppercase tracking-[0.2em] text-xs">Sam Tutors Group - 2026</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 sm:py-12 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
      <div className="flex items-center gap-2 group">
        <SamTutorsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
        <span className="text-lg sm:text-xl font-bold tracking-tighter text-white">
          Sam<span className="text-yellow-400">Tutors</span>
        </span>
      </div>
      <p className="text-gray-500 text-[10px] sm:text-sm font-medium text-center sm:text-left">© {new Date().getFullYear()} Sam Tutors Group. Barcha huquqlar himoyalangan.</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-black font-sans selection:bg-yellow-400/30 selection:text-yellow-400 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <Navbar />
      <div className="snap-start min-h-[100dvh]">
        <Hero />
      </div>
      <div className="snap-start">
        <Stats />
      </div>
      <div className="snap-start min-h-[100dvh]">
        <WhyUs />
      </div>
      <div className="snap-start min-h-[100dvh]">
        <Testimonials />
      </div>
      <div className="snap-start min-h-[100dvh]">
        <Contact />
      </div>
      <div className="snap-start">
        <Footer />
      </div>
      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/sam_tutors_admin" 
        target="_blank" 
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 transition-transform active:scale-95 z-[100]"
      >
        <Send size={24} className="sm:hidden" />
        <Send size={28} className="hidden sm:block" />
      </a>
    </div>
  );
}
