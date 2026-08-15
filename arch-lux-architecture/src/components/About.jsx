import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/tmn_logo_r_png.png"; // Thay đúng đường dẫn ảnh logo của bạn

export default function About() {
  return (
    <section className="py-36 bg-white text-dark relative border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Tiêu Đề Lớn */}
        <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 border-b border-slate-200/80 pb-12 text-center">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] text-[#0F172A] font-bold block leading-tight">
              CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ XÂY DỰNG
            </span>
            <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-[#EB323A] mt-1 leading-none">
              TÂN MINH NHÂN
            </h3>
            <div className="w-24 sm:w-32 h-[3px] bg-[#EB323A] mt-3 mx-auto rounded-full" />
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Logo Tân Minh Nhân"
              className="h-32 sm:h-44 md:h-52 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
  {/* Left: Ảnh Kiến Trúc Toàn Khung */}
  <div className="lg:col-span-7 relative flex">
    <div className="relative overflow-hidden aspect-[16/10] w-full bg-slate-100 rounded-sm shadow-xl border border-slate-200/60 group">
      <img
        src="https://www.tanminhnhan.com.vn/images/sppagebuilder/van-phong-tan-minh-nhan-2021.jpg"
        alt="Văn phòng Tân Minh Nhân"
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        loading="lazy"
      />
      {/* Lớp phủ gradient nhẹ ở góc dưới */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  </div>

  {/* Right: Text Minimalist & Cân đối */}
  <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
    
    {/* Khối Nội Dung Trên */}
    <div>
      {/* Đoạn văn mô tả */}
      <p className="text-slate-700 text-base leading-relaxed font-normal">
        Công ty Tân Minh Nhân chính thức đi vào hoạt động ngày 28/11/2011 tại địa chỉ Ngân Giang,
        Phường Điện Bàn Đông, thành phố Đà Nẵng. Với phương châm: "Tuổi trẻ, năng động, sáng tạo, 
        hiệu quả" - Tân Minh Nhân không ngừng cách tân để phấn đấu trở thành nhà thầu chuyên nghiệp 
        và lớn mạnh cả trong và ngoài nước.
      </p>

      {/* Box Phương châm hoạt động (Đã tinh chỉnh khoảng cách thoáng & đẹp) */}
    {/* Khối Phương Châm Hoạt Động (Chuẩn 100% theo ảnh) */}
<div className="relative my-8">
  {/* 🎯 Thanh vạch màu đỏ nhô ra ngoài 2 đầu (Trên & Dưới) */}
  <div className="absolute left-0 -top-0 -bottom-0 w-[3.5px] bg-[#EB323A] z-10" />

  {/* Khối nền xám nhạt Lùi vào trong */}
  <div className="bg-[#F8FAFC] py-5 pl-6 pr-6 rounded-r-sm">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#EB323A] block mb-2">
      PHƯƠNG CHÂM HOẠT ĐỘNG
    </span>
    <p className="italic text-slate-800 text-base md:text-lg font-semibold leading-snug">
      "Tuổi trẻ – Năng động – Sáng tạo – Hiệu quả"
    </p>
  </div>
</div>

{/* Đường kẻ ngang phân cách bên dưới như trong ảnh */}
<div className="border-b border-slate-100/80 my-8" />
    </div>

    {/* Khối Chỉ Số Tinh Tế Bên Dưới */}
    <div className="grid grid-cols-2 gap-8 border-t border-slate-200/80 pt-6 mt-auto">
      <div>
        <span className="font-heading text-4xl sm:text-5xl font-light text-[#0F172A] block mb-1 tracking-tight">
          15<span className="text-[#EB323A] font-normal">+</span>
        </span>
        <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
          Năm Hoạt Động
        </p>
      </div>
      <div>
        <span className="font-heading text-4xl sm:text-5xl font-light text-[#EB323A] block mb-1 tracking-tight">
          800<span className="text-[#0F172A] font-normal">+</span>
        </span>
        <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
          Nhân Sự Tinh Nhuệ
        </p>
      </div>
    </div>

  </div>
</div>
      </div>
    </section>
  );
}
