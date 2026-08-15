import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  'SUN GROUP',
  'NAM VIỆT Á',
  'AA CORPORATION',
  'BÁCH KHOA ĐÀ NẴNG',
  'EMPIRE GROUP',
  'PHÚ AN THỊNH',
  'MARRIOTT' ,
];

export default function Partners() {
  return (
    <section className="py-20 bg-white border-b border-hairline overflow-hidden select-none relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
        {/* <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
          Hợp tác cùng các <span className="italic font-normal text-navy">Đơn vị Kiến trúc hàng đầu</span>
        </span> */}
        <h3 className="font-heading text-2xl md:text-3xl font-light text-navy mt-2">
          Hợp tác cùng các <span className="italic font-normal text-accent">Đơn vị Kiến trúc hàng đầu</span>
        </h3>
      </div>

      {/* Container làm mờ 2 bên đầu/cuối (Gradient Mask Fade) */}
      <div className="relative w-full overflow-hidden flex [mask-image:_linear-gradient(to_right,_transparent_0,_black_128px,_black_calc(100%-128px),_transparent_100%)]">
        
        {/* Continuous Ticker Animation dùng Framer Motion */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          }}
          className="flex whitespace-nowrap items-center gap-16 md:gap-24 pl-12"
        >
          {/* Nhân bản mảng 2 lần để chạy lặp vô tận không đứt đoạn */}
          {[...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="flex items-center gap-16 md:gap-24">
              <span className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-luxury font-light text-navy/80 hover:text-accent transition-colors duration-300 cursor-pointer uppercase">
                {partner}
              </span>
              <span className="w-2 h-2 rounded-full bg-accent/40" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}