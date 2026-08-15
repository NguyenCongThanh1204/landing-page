import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

import CompanyOverview from '../components/CompanyOverview';
import HRPolicy from '../components/HRPolicy';
import LeadershipHierarchy from '../components/LeadershipHierarchy';

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

const tabs = [
  {
    id: 'overview',
    label: 'Tổng quan công ty',
    icon: Building2,
    component: CompanyOverview,
  },
  {
    id: 'leadership',
    label: 'Cán bộ chủ chốt',
    icon: Users,
    component: LeadershipHierarchy,
  },
  {
    id: 'policy',
    label: 'Chính sách nhân sự',
    icon: FileText,
    component: HRPolicy,
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🎯 Tạo Ref để xác định vị trí đỉnh của khu vực Tab Content
  const tabSectionRef = useRef(null);

  // ⏱️ Tự động chuyển Slide mỗi 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // 🚀 TÍNH NĂNG MỚI: Tự động cuộn mượt về đầu khu vực Tab khi đổi tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabSectionRef.current) {
      // Tính toán khoảng cách cẩn thận trừ bớt height của Sticky Navbar/Header (tránh bị che)
      const yOffset = -100; // Thay đổi con số này nếu bị đè bởi Header/Navbar
      const element = tabSectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % customSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + customSlides.length) % customSlides.length);
  };

  const currentSlide = customSlides[currentIndex];
  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || CompanyOverview;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      
      {/* 1. SLIDESHOW FULL MÀN HÌNH */}
      <section className="relative w-full h-screen overflow-hidden bg-slate-950 select-none group">
        
        {/* 📸 Hiệu ứng Crossfade & Zoom nhẹ */}
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

        {/* Lớp phủ mờ nhẹ tinh tế */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* 🔘 NÚT CHUYỂN SLIDE BÊN TRÁI */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Slide trước"
          className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#EB323A] backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          <ChevronLeft size={26} strokeWidth={1.5} />
        </button>

        {/* 🔘 NÚT CHUYỂN SLIDE BÊN PHẢI */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Slide tiếp theo"
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#EB323A] backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          <ChevronRight size={26} strokeWidth={1.5} />
        </button>
      </section>

      {/* 2. KHU VỰC TAB & NỘI DUNG */}
      {/* 📍 Đặt ref tại đây để làm mốc đỉnh cho hành động cuộn */}
      <div ref={tabSectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        
        {/* THANH TAB NAVIGATION CỐ ĐỊNH (STICKY TOP) */}
        <div className="sticky top-30 sm:top-24 z-30 bg-[#F8FAFC]/95 backdrop-blur-md pt-2 pb-[1px] border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-t-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#EB323A] border-t-2 border-x border-[#EB323A] border-x-slate-200 border-b-white -mb-[1px] shadow-xs z-10'
                      : 'bg-slate-100/80 text-slate-600 hover:text-[#0F172A] hover:bg-slate-200/60 border border-slate-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#EB323A]' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. NỘI DUNG THÀNH PHẦN */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-xs mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}