import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-dark flex flex-col justify-between p-10 md:p-20 text-light select-none overflow-hidden"
    >
      {/* 🖼️ HÌNH ẢNH KIẾN TRÚC BÊN PHẢI (CHỈ HIỆN TRÊN MÀN HÌNH DESKTOP / LAPTOP) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.6, scale: 1 }} // Độ mờ 35% để không làm chói mắt hay chèn lên chữ
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none z-0"
      >
        <img
          src="https://www.tanminhnhan.com.vn/images/sppagebuilder/van-phong-tan-minh-nhan-2021.jpg"
          alt="Architectural Visual"
          className="w-full h-full object-cover object-center"
        />
        {/* Lớp phủ dải màu che mờ viền trái của ảnh chìm mượt vào nền tối */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/80" />
      </motion.div>

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="font-heading text-2xl tracking-widest text-accent font-bold">
          TÂN MINH NHÂN
        </span>
        {/* <span className="text-xs uppercase tracking-[0.3em] text-muted">
          Kiến Tạo Đẳng Cấp
        </span> */}
      </div>

      {/* CONTENT CHÍNH */}
      <div className="relative z-10 my-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-accent mb-6 font-semibold">
    <span>TUỔI TRẺ</span>
    <span className="text-muted/60">•</span>
    <span>NĂNG ĐỘNG</span>
    <span className="text-muted/60">•</span>
    <span>SÁNG TẠO</span>
    <span className="text-muted/60">•</span>
    <span>HIỆU QUẢ</span>
  </div>
        <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl leading-none font-light">
          KIẾN TẠO KHÔNG GIAN <br />
          <span className="italic font-normal text-accent">HOÀN HẢO</span>
        </h1>
      </div>

      {/* FOOTER & PROGRESS BAR */}
      <div className="relative z-10 flex justify-between items-end border-t border-borderDark pt-6">
        <div className="w-1/2 md:w-1/3">
          <div className="h-[2px] bg-borderDark w-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="font-heading text-4xl md:text-6xl text-accent font-light">
          {progress < 10 ? `0${progress}` : progress}%
        </div>
      </div>
    </motion.div>
  );
}
