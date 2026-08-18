import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import {
  Compass,
  Building2,
  Ruler,
  Layers,
  HardHat,
  Trophy,
  ShieldCheck,
  Globe2,
  Sparkles,
  Home,
} from "lucide-react";

const timelineData = [
  {
    year: "2011",
    title: "Thành lập Tân Minh Nhân",
    employer: "5 nhân sự",
    description:
      "Khởi đầu hành trình kiến tạo không gian sống đẳng cấp, đặt nền móng cho sự phát triển bền vững.",
    accentColor: "#e03a2f",
    DefaultIcon: Compass,
    HoverIcon: Building2,
    xPercent: 9.1,
    yPercent: 60.0,
    tooltipPlacement: "bottom",
  },
  {
    year: "2015",
    title: "Mở rộng & Phát triển",
    employer: "50 nhân sự",
    description:
      "Mở rộng thị trường, nâng cao năng lực thiết kế và xây dựng, khẳng định uy tín trong ngành.",
    accentColor: "#0284c7",
    DefaultIcon: Ruler,
    HoverIcon: Layers,
    xPercent: 29.5,
    yPercent: 32.5,
    tooltipPlacement: "top",
  },
  {
    year: "2021",
    title: "Sáng tạo & Đổi mới",
    employer: "200 nhân sự",
    description:
      "Thay đổi tên thương hiệu, áp dụng các giải pháp thiết kế bền vững và công nghệ tiên tiến.",
    accentColor: "#d97706",
    DefaultIcon: HardHat,
    HoverIcon: Trophy,
    xPercent: 50.0,
    yPercent: 60.0,
    tooltipPlacement: "bottom",
  },
  {
    year: "2025",
    title: "Phát triển vượt bậc",
    employer: "800 nhân sự",
    description:
      "Hoàn thiện các dự án lớn, đạt doanh thu 4.000 tỷ và mở rộng tầm ảnh hưởng toàn quốc.",
    accentColor: "#059669",
    DefaultIcon: ShieldCheck,
    HoverIcon: Globe2,
    xPercent: 70.5,
    yPercent: 87.5,
    tooltipPlacement: "top",
  },
  {
    year: "2026",
    title: "Tầm nhìn tương lai",
    employer: "1.000+ nhân sự",
    description:
      "Dự kiến doanh thu 19.500 tỷ, khẳng định vị thế hàng đầu trong ngành kiến trúc và xây dựng.",
    accentColor: "#e11d48",
    DefaultIcon: Sparkles,
    HoverIcon: Home,
    xPercent: 90.9,
    yPercent: 60.0,
    tooltipPlacement: "bottom",
  },
];

const stats = [
  { value: 15, suffix: "", label: "NĂM HOẠT ĐỘNG" },
  { value: 800, suffix: "+", label: "NHÂN SỰ" },
  { value: 4000, suffix: "tỷ", label: "DOANH THU (NĂM 2025)" },
  { value: 19500, suffix: "tỷ", label: "DOANH THU DỰ KIẾN" },
];

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Hook đếm số cho phần thống kê
  const statsRef = React.useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full bg-[#F8FAFC] py-24 select-none relative overflow-hidden text-slate-800">
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
          backgroundSize: "40px 40px",
        }}
      />

      {/* 🎨 Dynamic Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full object-cover"
          fill="none"
        >
          <path
            d="M-100,900 C200,820 300,600 500,480 C700,360 800,180 1100,80"
            stroke="#EB323A"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <path
            d="M-100,950 C250,860 350,550 500,420 C650,290 850,180 1100,30"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          <circle
            cx="500"
            cy="480"
            r="220"
            stroke="#0F172A"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Hiệu ứng chuyển động nét đứt */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes flowDashRed {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -48; }
            }
            @keyframes flowDashGray {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: -24; }
            }
            .animate-flow-dash-red {
              animation: flowDashRed 1.5s linear infinite;
            }
            .animate-flow-dash-gray {
              animation: flowDashGray 0.5s linear infinite;
            }
          `,
        }}
      />

      {/* Khung giới hạn nội dung ở giữa màn hình */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Tiêu đề khối */}
        <div className="text-center relative z-20">
          <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#e03a2f] uppercase block mb-2">
            Tân Minh Nhân
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Hành trình phát triển
          </h2>
          <div className="w-20 h-1.5 bg-[#e03a2f] mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Timeline Desktop */}
        <div className="relative w-full h-[380px] hidden md:block">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1100 400"
            preserveAspectRatio="none"
          >
            {/* Đường nền mờ phía sau */}
            <path
              d="M 100 240 C 250 80, 400 80, 550 240 C 700 400, 850 400, 1000 240"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* 1. Các đoạn gạch màu ĐỎ */}
            <path
              d="M 100 240 C 250 80, 400 80, 550 240 C 700 400, 850 400, 1000 240"
              fill="none"
              stroke="#e03a2f"
              strokeWidth="3.5"
              strokeDasharray="10 38"
              className="animate-flow-dash-red"
              strokeLinecap="round"
            />

            {/* 2. Các đoạn gạch màu XÁM */}
            <path
              d="M 100 240 C 250 80, 400 80, 550 240 C 700 400, 850 400, 1000 240"
              fill="none"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeDasharray="10 38"
              className="animate-flow-dash-gray"
              strokeLinecap="round"
            />
          </svg>

          {/* Các mốc thời gian */}
          {timelineData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const { DefaultIcon, HoverIcon } = item;

            return (
              <div
                key={item.year}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                style={{
                  left: `${item.xPercent}%`,
                  top: `${item.yPercent}%`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip Card */}
                <div
                  className={`absolute w-64 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl z-40 transition-all duration-300 pointer-events-none ${
                    item.tooltipPlacement === "top"
                      ? "bottom-[calc(100%+24px)]"
                      : "top-[calc(100%+24px)]"
                  } ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-90 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xl font-extrabold tracking-wide"
                      style={{ color: item.accentColor }}
                    >
                      {item.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.employer}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Vòng tròn Pin Icon */}
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-md transition-all duration-300 relative group"
                  style={{
                    border: `4px solid ${item.accentColor}`,
                    backgroundColor: isHovered ? item.accentColor : "#ffffff",
                    boxShadow: isHovered
                      ? `0 10px 25px -5px ${item.accentColor}66`
                      : "0 4px 12px rgba(0,0,0,0.08)",
                    transform: isHovered ? "scale(1.18)" : "scale(1)",
                  }}
                >
                  {isHovered && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  )}

                  {isHovered ? (
                    <HoverIcon className="w-8 h-8 text-white transition-all duration-300 scale-110" />
                  ) : (
                    <DefaultIcon
                      className="w-7 h-7 lg:w-8 lg:h-8 transition-all duration-300"
                      style={{ color: item.accentColor }}
                    />
                  )}
                </div>

                {/* Nhãn Tiêu đề & Năm */}
                <div
                  className={`absolute flex flex-col items-center w-48 text-center pointer-events-none ${
                    item.tooltipPlacement === "top"
                      ? "top-[calc(100%+14px)]"
                      : "bottom-[calc(100%+14px)]"
                  }`}
                >
                  <span
                    className={`text-xs lg:text-sm font-bold tracking-wide transition-colors duration-300 ${
                      isHovered
                        ? "text-slate-900 font-extrabold"
                        : "text-slate-700"
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    className="mt-1.5 px-3 py-0.5 text-xs font-black rounded-full text-white transition-all duration-300 shadow-sm"
                    style={{
                      backgroundColor: isHovered
                        ? item.accentColor
                        : "#334155",
                    }}
                  >
                    {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="flex flex-col gap-6 md:hidden relative z-10">
          {timelineData.map((item) => {
            const { DefaultIcon } = item;
            return (
              <div
                key={item.year}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm"
              >
                <div
                  className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 shadow-sm bg-white"
                  style={{ borderColor: item.accentColor }}
                >
                  <DefaultIcon
                    className="w-6 h-6"
                    style={{ color: item.accentColor }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-black"
                        style={{ color: item.accentColor }}
                      >
                        {item.year}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        — {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full">
                      {item.employer}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Content */}
        <div ref={statsRef} className="mt-20 md:mt-24 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-slate-900 mb-2">
                  {isInView ? (
                    <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  <span className="text-[#e03a2f]">{stat.suffix}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}