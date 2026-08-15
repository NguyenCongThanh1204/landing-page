import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Services from '../components/Services';
import Projects from '../components/Projects';

// 🎯 DANH SÁCH 5 LINK ẢNH DỰ ÁN
const customSlides = [
  {
    id: 1,
    image: 'https://www.tanminhnhan.com.vn/images/sppagebuilder/van-phong-tan-minh-nhan-2021.jpg',
  },
  {
    id: 2,
    image: 'https://sunparadiseland.com/_next/image?url=https%3A%2F%2Fsun-ecommerce-cdn.azureedge.net%2Fecommerce%2Fservice-sites%2Fasset%2FSunParadiseLandPhuQuoc%2Fgoogle-doc%2Fpost_id_13826%2FAD_4nXfIqa0nuIpmvb94PHoYb7e0CIyPJ4TnFSOjom37ap3-nRmZYfj5hcd4-NvrfDcsZFEdibsRxpsnJGU22RP6hCnB3QqUpqh2U2d0kd-c3irjDOhJpGmTZuXSmeCdrpondtc7SFYoA6z_Khvc4Vj2g_M8VpgVs2ZWlgSxePGUdmu_eGHi.webp&w=1200&q=80',
  },
  {
    id: 3,
    image: 'https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/thumbnail/SunGroup/B%C3%A0i%20vi%E1%BA%BFt%202025/Th%C3%A1ng%2010%20-2025/Thumb/21784/image-thumb__21784__1600/B%E1%BA%A3n%20sao%20c%E1%BB%A7a%20Sun%20World%20Ba%20Na%20Hills%20%284%29.jpg',
  },
  {
    id: 4,
    image: 'https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/thumbnail/SunGroup/B%C3%A0i%20vi%E1%BA%BFt%202025/1.%20OLD/D%E1%BB%B1%20%C3%A1n/DNDT/21336/image-thumb__21336__1600/phoi-canh-du-an-da-nang-downtown.jpg',
  },
  {
    id: 5,
    image: 'https://sunurbancity.vn/wp-content/uploads/2024/10/BCG_27-Photo-min-scaled.jpg',
  },
];

export default function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển Slide mỗi 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % customSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + customSlides.length) % customSlides.length);
  };

  const currentSlide = customSlides[currentIndex];

  return (
    <div className="bg-white">
      
      {/* 🎯 SLIDESHOW FULL MÀN HÌNH (FULL VIEWPORT - 100vh & 100vw) */}
      <section className="relative w-full h-screen overflow-hidden bg-slate-950 select-none group">
        
        {/* 📸 Hiệu ứng Crossfade Mềm mại & Ken Burns Zoom nhẹ */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
            transition={{
              opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              scale: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
              filter: { duration: 0.8 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt="Slide dự án"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Lớp phủ mờ nhẹ tinh tế để nổi bật nút bấm */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* 🔘 NÚT CHUYỂN SLIDE BÊN TRÁI (Bo tròn Tinh tế) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Slide trước"
          className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#EB323A] backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          <ChevronLeft size={26} strokeWidth={1.5} />
        </button>

        {/* 🔘 NÚT CHUYỂN SLIDE BÊN PHẢI (Bo tròn Tinh tế) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Slide tiếp theo"
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#EB323A] backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          <ChevronRight size={26} strokeWidth={1.5} />
        </button>

        {/* 🔴 THANH CHẤM INDICATOR SANG TRỌNG NẰM ĐÁY */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 bg-black/25 backdrop-blur-md rounded-full border border-white/15">
          {customSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx 
                  ? 'w-10 bg-[#EB323A]' 
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div> */}

      </section>

      {/* CÁC COMPONENT DỊCH VỤ & DỰ ÁN CỦA TRANG */}
      <Services />
      <Projects />
    </div>
  );
}