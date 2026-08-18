import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight, Layers, MoveHorizontal, Loader2 } from 'lucide-react';
import { client } from '../sanityClient'; // Đường dẫn tới file client Sanity của bạn

// 🎯 Câu lệnh GROQ Query để lấy thông tin dự án + URL ảnh từ Sanity
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt asc) {
  "id": _id,
  "number": select(
    count(*[_type == "project" && _createdAt <= ^._createdAt]) < 10 => "0" + string(count(*[_type == "project" && _createdAt <= ^._createdAt])),
    string(count(*[_type == "project" && _createdAt <= ^._createdAt]))
  ),
  location,
  title,
  category,
  scale,
  "image": thumbnail.asset->url,
  desc,
  "link": "/Du-an/" + slug.current
}`;

export default function Interactive3DWheel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // 1. Fetch dữ liệu từ Sanity khi Component Mount
  useEffect(() => {
    client
      .fetch(PROJECTS_QUERY)
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu từ Sanity:', error);
        setLoading(false);
      });
  }, []);

  const N = projects.length;
  const angleStep = N > 0 ? 360 / N : 0;
  const RADIUS = 420;

  // 2. Tính toán Card đang nằm ở mặt trước
  useEffect(() => {
    if (N === 0) return;
    let normalized = ((-rotationAngle % 360) + 360) % 360;
    let earlyTriggerAngle = (normalized + angleStep / 2) % 360;
    let closestIndex = Math.floor(earlyTriggerAngle / angleStep) % N;

    if (closestIndex !== activeCardIndex) {
      setActiveCardIndex(closestIndex);
    }
  }, [rotationAngle, angleStep, N, activeCardIndex]);

  const rotateTo = (index) => {
    if (N === 0) return;
    const targetAngle = -index * angleStep;
    setRotationAngle(targetAngle);
  };

  const handleNext = () => {
    if (N === 0) return;
    setRotationAngle((prev) => prev - angleStep);
  };

  const handlePrev = () => {
    if (N === 0) return;
    setRotationAngle((prev) => prev + angleStep);
  };

  // ⏳ Trạng thái Loading khi đang chờ Sanity trả kết quả
  if (loading) {
    return (
      <section className="py-20 bg-[#0B0F17] text-white min-h-screen flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 text-[#EB323A] animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-medium">Đang tải công trình từ Sanity...</p>
      </section>
    );
  }

  // ⚠️ Trạng thái nếu chưa có dữ liệu trong Sanity
  if (N === 0) {
    return (
      <section className="py-20 bg-[#0B0F17] text-white min-h-screen flex justify-center items-center">
        <p className="text-slate-400 text-sm">Chưa có dự án nào được nhập trên Sanity CMS.</p>
      </section>
    );
  }

  const activeProject = projects[activeCardIndex] || projects[0];

  return (
    <section className="py-20 bg-[#0B0F17] text-white relative overflow-hidden select-none min-h-screen flex flex-col justify-center items-center">
      
      {/* ☀️ LỚP NỀN MỜ TRÀN MÀN HÌNH ĐỘNG */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {activeProject.image && (
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover filter blur-[2px] brightness-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/50 to-[#0B0F17]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Header Section */}
      {/* <div className="text-center mb-8 z-10 px-6">
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#EB323A] inline-flex items-center gap-2 mb-2">
          <MoveHorizontal size={16} className="animate-pulse" /> Giữ chuột kéo để quay Bánh Xe 3D
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight drop-shadow-md">
          Dấu Ấn <span className="text-[#EB323A]">Vòng Xoay 3D</span>
        </h2>
      </div> */}

      {/* 🎯 KHU VỰC VÒNG XOAY 3D TƯƠNG TÁC */}
      <div className="relative w-full max-w-[1200px] h-[540px] flex items-center justify-center perspective-[1200px] z-10">
        
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDrag={(e, info) => {
            setRotationAngle((prev) => prev + info.delta.x * 0.4);
          }}
          onDragEnd={() => {
            const nearestIndex = Math.round(-rotationAngle / angleStep);
            setRotationAngle(-nearestIndex * angleStep);
          }}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((item, i) => {
            const cardAngle = i * angleStep + rotationAngle;
            const rad = (cardAngle * Math.PI) / 180;

            const x = RADIUS * Math.sin(rad);
            const z = RADIUS * Math.cos(rad);
            
            const isFront = activeCardIndex === i;

            const scale = Math.max(0.65, (z + RADIUS) / (2 * RADIUS) * 0.4 + 0.65);
            const opacity = z < -100 ? 0.25 : Math.max(0.35, (z + RADIUS) / (2 * RADIUS));

            return (
  <motion.div
    key={item.id}
    animate={{
      x: x,
      z: z,
      rotateY: cardAngle,
      scale: scale,
      opacity: opacity,
    }}
    transition={{
      type: 'spring',
      stiffness: 280,
      damping: 26,
    }}
    style={{
      transformStyle: 'preserve-3d',
      zIndex: Math.round(z + RADIUS),
    }}
    onClick={() => rotateTo(i)}
    className={`absolute w-[300px] sm:w-[380px] h-[460px] rounded-xl bg-slate-900/90 border ${
      isFront 
        ? 'border-[#EB323A] shadow-[0_20px_60px_rgba(235,50,58,0.5)] ring-2 ring-[#EB323A]/50' 
        : 'border-slate-800/80 shadow-2xl'
    } p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md pointer-events-auto`}
  >
    {/* Image Background trên Thẻ */}
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          /* ⚡ ĐÃ SỬA: Card chính hiển thị màu nguyên bản 100% */
          className={`w-full h-full object-cover pointer-events-none ${
            isFront ? 'opacity-100' : 'opacity-40'
          }`}
        />
      )}
      
      {/* Lớp phủ gradient (Đã đúng như bạn sửa) */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isFront
            ? 'bg-gradient-to-t from-[#0B0F17]/80 via-transparent to-transparent'
            : 'bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent'
        }`}
      />
    </div>

    {/* Top Info */}
    <div className="relative z-10 flex justify-between items-start pointer-events-none">
      <span className="text-xs font-bold uppercase tracking-widest text-[#EB323A] bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-[#EB323A]/40 flex items-center gap-1.5">
        <MapPin size={14} /> {item.location}
      </span>
      <span className="font-heading font-black text-4xl text-white/30 select-none">
        {item.number}
      </span>
    </div>

    {/* Bottom Info */}
    <div className="relative z-10 space-y-2 pointer-events-none">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
        {item.category}
      </span>

      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight">
        {item.title}
      </h3>

      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
        <Layers size={14} className="text-[#EB323A]" /> {item.scale}
      </div>

      {isFront && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-2 pointer-events-auto"
        >
          <p className="text-slate-300 text-xs leading-relaxed font-light line-clamp-2 mb-3 border-t border-slate-800 pt-2">
            {item.desc}
          </p>
          <a
            href={item.link}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#EB323A] transition-colors group"
          >
            <span>Khám phá công trình</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      )}
    </div>
  </motion.div>
);
          })}
        </motion.div>

      </div>

      {/* NÚT ĐIỀU HƯỚNG TRÁI / PHẢI & INDICATOR DOTS */}
      {/* <div className="flex items-center gap-4 mt-8 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Dự án trước"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#EB323A] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
        >
          <ChevronLeft size={22} />
        </button>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => rotateTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeCardIndex === idx ? 'w-8 bg-[#EB323A]' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Dự án tiếp theo"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#EB323A] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
        >
          <ChevronRight size={22} />
        </button>
      </div> */}

    </section>
  );
}