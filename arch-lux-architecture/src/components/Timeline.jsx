import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const timelineEvents = [
  {
    year: '2011',
    title: 'Thành lập Tân Minh Nhân',
    desc: 'Khởi đầu hành trình kiến tạo không gian sống đẳng cấp, đặt nền móng cho sự phát triển bền vững.',
    code: '5 nhân sự',
    highlight: 'Nền móng',
  },
  {
    year: '2015',
    title: 'Mở rộng & Phát triển',
    desc: 'Mở rộng các studio chủ lực thành các trung tâm quốc tế, thúc đẩy các kế hoạch tổng thể linh hoạt.',
    code: '50 nhân sự',
    highlight: 'Quy mô x10',
  },
  {
    year: '2021',
    title: 'Sáng tạo & Đổi mới',
    desc: 'Thay đổi tên thương hiệu, áp dụng các giải pháp thiết kế bền vững và công nghệ tiên tiến.',
    code: '200 nhân sự',
    highlight: 'Digital Transformation',
  },
  {
    year: '2025',
    title: 'Phát triển vượt bậc',
    desc: 'Hoàn thiện các dự án lớn, đạt doanh thu 4.000 tỷ và mở rộng tầm ảnh hưởng toàn quốc.',
    code: '800 nhân sự',
    highlight: '4.000 Tỷ VNĐ',
  },
  {
    year: '2026+',
    title: 'Tầm nhìn tương lai',
    desc: 'Dự kiến doanh thu 19.500 tỷ, khẳng định vị thế hàng đầu trong ngành kiến trúc và xây dựng.',
    code: '1.000+ nhân sự',
    highlight: '19.500 Tỷ VNĐ',
  },
];

export default function Timeline() {
  const [activeHover, setActiveHover] = useState(null);
  
  // Animation thanh tiến trình chạy theo Scroll
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={ref} className="py-32 bg-[#F8FAFC] text-slate-800 relative overflow-hidden select-none">
      
      {/* 🚀 Ambient Glow Effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#EB323A]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 📐 Blueprint Grid Matrix Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F172A 1px, transparent 1px),
            linear-gradient(to bottom, #0F172A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 🎨 Dynamic Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07] overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 1000 1000" className="w-full h-full object-cover" fill="none">
          <path d="M-100,900 C200,820 300,600 500,480 C700,360 800,180 1100,80" stroke="#EB323A" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M-100,950 C250,860 350,550 500,420 C650,290 850,180 1100,30" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="500" cy="480" r="220" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-28 relative">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-[#EB323A] font-bold block mb-3"
          >
            Tân Minh Nhân Corporate
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-6xl font-light text-slate-900 tracking-tight"
          >
            Hành trình kiến tạo <span className="italic text-[#EB323A] font-normal">&amp; Phát triển</span>
          </motion.h2>
          
          <div className="mt-6 flex justify-center items-center gap-3 opacity-60">
            <span className="text-[11px] font-mono tracking-wider">EST. 2011</span>
            <div className="w-24 h-[1px] bg-slate-400 relative">
              <span className="absolute left-1/2 -top-1 w-[1px] h-2 bg-slate-400" />
            </div>
            <span className="text-[11px] font-mono tracking-wider">VISION 2026+</span>
          </div>
        </div>

        {/* Trục chính Timeline */}
        <div className="relative">
          
          {/* Đường nền màu mờ */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2" />
          
          {/* Đường chạy sáng theo Scroll (Scroll Progress) */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EB323A] via-[#EB323A] to-slate-900 -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(235,50,58,0.8)]"
          />
          
          {timelineEvents.map((event, idx) => {
            const isEven = idx % 2 === 0;
            const isHovered = activeHover === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveHover(idx)}
                onMouseLeave={() => setActiveHover(null)}
                className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Nút tròn trục giao điểm */}
                <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.div 
                    animate={{ 
                      scale: isHovered ? 1.3 : 1,
                      borderColor: isHovered ? '#EB323A' : '#94A3B8'
                    }}
                    className="w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center shadow-sm transition-colors duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isHovered ? 'bg-[#EB323A]' : 'bg-slate-700'
                    }`} />
                  </motion.div>
                </div>

                {/* Khung nội dung */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                  <div 
                    className={`group relative p-6 sm:p-8 rounded-xl transition-all duration-500 bg-white/80 backdrop-blur-md border ${
                      isHovered 
                        ? 'border-[#EB323A]/50 shadow-[0_20px_40px_-15px_rgba(235,50,58,0.15)] -translate-y-1.5 bg-white' 
                        : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                    } ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    {/* Dấu định vị Blueprint ở 4 góc */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-300 select-none">┌</div>
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-slate-300 select-none">┐</div>
                    <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-300 select-none">└</div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-300 select-none">┘</div>

                    {/* Số năm chìm làm Background */}
                    <span className={`absolute top-1 ${isEven ? 'left-4' : 'right-4'} font-heading text-6xl sm:text-8xl font-black transition-all duration-500 pointer-events-none select-none ${
                      isHovered ? 'text-[#EB323A]/10 translate-y-[-4px]' : 'text-slate-900/[0.03]'
                    }`}>
                      {event.year}
                    </span>

                    {/* Meta Info Header */}
                    <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                        {event.code}
                      </span>
                      <span className="text-[10px] font-mono font-medium tracking-wide text-[#EB323A] bg-[#EB323A]/10 px-2.5 py-1 rounded">
                        {event.highlight}
                      </span>
                    </div>

                    {/* Năm hiển thị chính */}
                    <div className="font-heading text-3xl font-extrabold text-[#EB323A] mb-1 tracking-tight">
                      {event.year}
                    </div>

                    {/* Tiêu đề & Mô tả */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-[#EB323A] transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {event.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}