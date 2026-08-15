import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/tmn_logo_r_png.png"; // Đường dẫn đến logo của bạn

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/about" },
  { name: "Dịch vụ", path: "/services" },
  { name: "Dự án", path: "/projects" },
  { name: "Tin tức", path: "/blog" },
  { name: "Tuyển dụng", path: "/careers" },
  { name: "Liên hệ", path: "/contact" },
];

export default function Navbar() {
  const [isNavDark, setIsNavDark] = useState(false); // State quản lý tông màu Navbar (Dark / Light)
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const isProjectDetailPage = location.pathname.startsWith("/projects/");

    if (isProjectDetailPage) {
      setIsNavDark(false);
      setIsScrolled(true);
      return () => {};
    }

    // 1. Lắng nghe trạng thái Scroll để thu nhỏ / thêm glass effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Thuật toán GSAP ScrollTrigger nhận diện màu nền Section đang bên dưới Navbar
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll("section, footer");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50px", // Khi mép trên của Section chạm đến vùng Navbar
          end: "bottom 50px",
          onToggle: (self) => {
            if (self.isActive) {
              // Lấy màu nền thực tế của Section
              const bgColor = window.getComputedStyle(section).backgroundColor;

              // Chuyển RGB sang độ sáng (Luminance) để phân biệt Nền Tối hay Nền Sáng
              const rgb = bgColor.match(/\d+/g);
              if (rgb) {
                const brightness =
                  (parseInt(rgb[0]) * 299 +
                    parseInt(rgb[1]) * 587 +
                    parseInt(rgb[2]) * 114) /
                  1000;
                // Nếu độ sáng < 128 => Nền Tối (Navbar chuyển sang Chữ Trắng)
                // Nếu độ sáng >= 128 => Nền Sáng (Navbar chuyển sang Chữ Xanh Navy / Đen)
                setIsNavDark(brightness < 128);
              }
            }
          },
        });
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, [location.pathname]);

  // Thiết lập class màu động dựa theo độ sáng nền bên dưới
  const isProjectDetailPage = location.pathname.startsWith("/projects/");
  const textColor = isNavDark ? "text-white" : "text-navy";
  const hoverTextColor = isNavDark ? "hover:text-accent" : "hover:text-accent";
  const glassBg = isNavDark
    ? "bg-dark/80 backdrop-blur-md border-b border-white/10"
    : "bg-white/80 backdrop-blur-md border-b border-navy/10";

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isProjectDetailPage
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-4 shadow-sm"
            : isScrolled
              ? `${glassBg} py-4 shadow-sm`
              : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo - Đổi màu động */}
          <Link to="/" className="group flex items-center gap-2">
            <motion.img
              src={logo} // Biến logo bạn đã import hoặc đường dẫn ảnh (vd: "/logo.png")
              alt="Logo"
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Menu - Đổi màu chữ động theo màu nền bên dưới */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-500 group py-2 ${
                    isActive ? "text-accent" : `${textColor} ${hoverTextColor}`
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] bg-accent transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Nút CTA - Tự thích ứng viền và màu chữ */}
          {/* <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className={`group relative inline-flex items-center justify-center overflow-hidden border px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
                isNavDark
                  ? "border-white text-white hover:border-accent"
                  : "border-navy text-navy hover:border-accent"
              }`}
            >
              <span className="absolute inset-0 w-full h-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Inquire Now <ArrowUpRight size={14} />
              </span>
            </Link>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden focus:outline-none p-2 transition-colors duration-500 ${textColor}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden border-b-4 border-accent ${
              isNavDark ? "bg-dark text-white" : "bg-subtle text-navy"
            }`}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-4xl font-bold hover:text-accent transition-colors block"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
