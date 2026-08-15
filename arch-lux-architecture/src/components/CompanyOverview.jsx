import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, ShieldCheck, Award, Users, Clock, CheckCircle2 } from 'lucide-react';

export default function CompanyOverview() {
  return (
    <div className="bg-white text-[#0F172A] min-h-screen py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER TIÊU ĐỀ TRANG */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#EB323A] block mb-3">
            Hồ sơ năng lực & Phát triển
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight uppercase leading-tight">
            Tổng Quan Công Ty
          </h1>
          <div className="w-24 h-[3px] bg-[#EB323A] mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-28">

          {/* 🎯 MỤC 1: GIỚI THIỆU CÔNG TY */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#0F172A] text-xs font-bold uppercase tracking-wider">
                <Building2 size={16} className="text-[#EB323A]" />
                <span> Về Chúng Tôi</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-snug">
                Công Ty Cổ Phần Kiến Trúc Và Xây Dựng <span className="text-[#EB323A]">Tân Minh Nhân</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Chính thức đi vào hoạt động từ ngày **28/11/2011**, qua hơn 15 năm hình thành và phát triển, Tân Minh Nhân đã khẳng định vị thế là một trong những nhà thầu thi công kiến trúc, hoàn thiện và xây dựng uy tín hàng đầu tại Việt Nam.
              </p>
              
              {/* Box Phương châm */}
              <div className="p-5 bg-slate-50 border-l-4 border-[#EB323A] rounded-r-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EB323A] block mb-1">
                  Phương Châm Hoạt Động
                </span>
                <p className="italic text-slate-800 text-sm md:text-base font-medium">
                  "Tuổi trẻ – Năng động – Sáng tạo – Hiệu quả"
                </p>
              </div>

              {/* Các con số thống kê */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#EB323A] flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="font-heading text-3xl font-extrabold block text-[#0F172A]">15+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Năm kinh nghiệm</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="font-heading text-3xl font-extrabold block text-[#0F172A]">800+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Nhân sự tinh nhuệ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://www.tanminhnhan.com.vn/images/sppagebuilder/van-phong-tan-minh-nhan-2021.jpg"
                  alt="Trụ sở Tân Minh Nhân"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🎯 MỤC 2: MỤC TIÊU PHÁT TRIỂN */}
          <section className="bg-slate-900 text-white p-8 sm:p-12 md:p-16 rounded-sm shadow-xl relative overflow-hidden">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                <Target size={16} className="text-[#EB323A]" />
                <span>Định Hướng Chiến Lược</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                Mục Tiêu Phát Triển
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-800/60 rounded border border-slate-700/50 hover:border-[#EB323A] transition-colors">
                <span className="text-[#EB323A] font-mono text-xl font-bold block mb-2">01</span>
                <h3 className="font-bold text-lg mb-2">Nhà Thầu Hàng Đầu</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Bứt phá trở thành đối tác chiến lược hàng đầu được ưu tiên lựa chọn bởi các chủ đầu tư quy mô lớn trong và ngoài nước.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded border border-slate-700/50 hover:border-[#EB323A] transition-colors">
                <span className="text-[#EB323A] font-mono text-xl font-bold block mb-2">02</span>
                <h3 className="font-bold text-lg mb-2">Chuyển Đổi Số</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tiên phong ứng dụng các giải pháp phần mềm quản lý thi công tiên tiến, chuyển đổi số toàn diện trong giám sát dự án.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded border border-slate-700/50 hover:border-[#EB323A] transition-colors">
                <span className="text-[#EB323A] font-mono text-xl font-bold block mb-2">03</span>
                <h3 className="font-bold text-lg mb-2">Tối Ưu Nguồn Lực</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Phát triển nguồn nhân lực 800+ nhân sự tinh nhuệ, liên tục đào tạo chuyên môn cao cấp cho đội ngũ kỹ sư.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded border border-slate-700/50 hover:border-[#EB323A] transition-colors">
                <span className="text-[#EB323A] font-mono text-xl font-bold block mb-2">04</span>
                <h3 className="font-bold text-lg mb-2">Mở Rộng Thị Trường</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Đẩy mạnh triển khai các dự án trọng điểm toàn quốc và từng bước vươn tầm ra khu vực.
                </p>
              </div>
            </div>
          </section>

          {/* 🎯 MỤC 3: CAM KẾT HÀNH ĐỘNG */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#0F172A] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck size={16} className="text-[#EB323A]" />
                <span>Trách Nhiệm & Giá Trị</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                Cam Kết Hành Động
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="p-6 bg-slate-50 rounded border border-slate-200/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded bg-[#EB323A] text-white flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">Chất Lượng Kỹ - Mỹ Thuật</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Đảm bảo tuyệt đối các tiêu chuẩn kỹ thuật theo bản vẽ phê duyệt, không đánh đổi chất lượng vì bất kỳ lý do gì.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded border border-slate-200/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded bg-[#0F172A] text-white flex items-center justify-center mb-4">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">Tiến Độ Chuẩn Xác</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Quản lý và điều phối tiến độ nghiêm ngặt, đảm bảo bàn giao công trình đúng hoặc trước thời hạn cam kết.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded border border-slate-200/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded bg-[#EB323A] text-white flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">An Toàn Tuyệt Đối</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Khẩu hiệu "An toàn để sản xuất - Sản xuất phải an toàn", tuân thủ nghiêm ngặt vệ sinh môi trường công trường.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded border border-slate-200/80 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded bg-[#0F172A] text-white flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">Đồng Hành Dài Lâu</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cung cấp dịch vụ bảo hành, bảo trì chu đáo, tận tâm và nhanh chóng sau khi dự án đi vào vận hành.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}