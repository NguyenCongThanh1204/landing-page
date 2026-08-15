import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://www.tanminhnhan.com.vn/images/ap-smart-layerslider/homepage/ANH%20WEB.jpg',
    // subtitle: 'Architecture • Interior • Construction',
    // titleMain: 'WE DESIGN',
    // titleSub: 'THE FUTURE',
    // location: 'Zurich, Switzerland',
  },
  {
    id: 2,
    image: 'https://www.tanminhnhan.com.vn/images/ap-smart-layerslider/homepage/van-phong-tan-minh-nhan-phoi-canh-tren-cao.jpg',
    // subtitle: 'Parametric Urbanism • Sustainable Megastructures',
    // titleMain: 'SCULPTING',
    // titleSub: 'SANCTUARIES',
    // location: 'Tokyo, Japan',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide sau mỗi 7 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-dark select-none">
      {/* Background Image Slideshow (Bỏ mode="wait" để 2 ảnh hòa trộn trực tiếp không bị hở nền) */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
              scale: { duration: 7, ease: "linear" } // Hiệu ứng Ken Burns nhẹ nhàng không giật
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.titleMain}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay đè trực tiếp lên ảnh */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-dark/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content (Xuất hiện NỐI TIẾP sau khi ảnh đã lên hình) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, // Trì hoãn 0.3s để ảnh xuất hiện mượt trước, chữ theo sau
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="max-w-5xl"
          >
            {/* Subtitle */}
            {/* <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-accent">
                {activeSlide.subtitle}
              </span>
            </div> */}

            {/* Typography Tiêu Đề */}
            {/* <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9] mb-8">
              {activeSlide.titleMain} <br />
              <span className="italic font-normal text-accent">{activeSlide.titleSub}</span>
            </h1> */}

            {/* Vị trí dự án */}
            {/* <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-10">
              Featured Landmark: <span className="text-white font-semibold">{activeSlide.location}</span>
            </p> */}

            {/* CTA Button */}
            {/* <div className="flex flex-wrap items-center gap-6">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center border border-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-bold text-white overflow-hidden transition-all duration-300 hover:border-accent"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  Explore Portfolio <ArrowUpRight size={16} />
                </span>
              </a>
            </div> */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Controls & Progress Bar */}
      <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 z-20 flex justify-between items-end">
        {/* Chỉ số Slide */}
        <div className="flex items-center gap-4">
          <span className="font-heading text-3xl font-bold text-accent">
            0{currentSlide + 1}
          </span>
          <div className="w-16 h-[2px] bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-accent w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
              key={currentSlide}
              transition={{ duration: 7, ease: 'linear' }}
            />
          </div>
          <span className="font-heading text-xl font-light text-white/50">
            0{slides.length}
          </span>
        </div>

        {/* Nút Điều Hướng Trái / Phải */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-12 h-12 border border-white/20 hover:border-accent hover:bg-accent text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-12 h-12 border border-white/20 hover:border-accent hover:bg-accent text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}