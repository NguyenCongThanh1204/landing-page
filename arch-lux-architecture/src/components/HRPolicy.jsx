import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Gift, 
  CheckCircle2, 
  AlertCircle, 
  Plane, 
  Trophy, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const policySections = [
  { id: 'moi-truong', title: '1. Môi trường làm việc', icon: Building2 },
  { id: 'chinh-sach-ld', title: '2. Chính sách lao động', icon: Briefcase },
  { id: 'tien-luong', title: '3. Tiền lương & Thưởng', icon: ShieldCheck },
  { id: 'bao-hiem', title: '4. Bảo hiểm xã hội', icon: ShieldCheck },
  { id: 'dao-tao', title: '5. Đào tạo & Phát triển', icon: GraduationCap },
  { id: 'phuc-loi', title: '6. Phụ cấp, Phúc lợi & Đãi ngộ', icon: Gift },
];

export default function HRPolicy() {
  const [activeTab, setActiveTab] = useState('moi-truong');
  const isClickScrolling = useRef(false); // Cờ chặn useEffect ghi đè khi đang click
  const sectionTopOffset = 112;

  // 1. Xử lý khi CLICK vào mục lục
  const scrollToSection = (id) => {
    setActiveTab(id);
    isClickScrolling.current = true; // Khóa nhận diện tự động tạm thời

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110; // Khoảng đệm bên dưới Navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Sau khi cuộn mượt xong (khoảng 600ms) thì mở lại nhận diện cuộn tay
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 600);
    }
  };

  // 2. Xử lý nhận diện vị trí khi CUỘN TAY (Fix triệt để lệch mục)
  useEffect(() => {
    const handleScroll = () => {
      // Nếu đang trong quá trình click cuộn mượt thì bỏ qua nhận diện cuộn tay
      if (isClickScrolling.current) return;

      const scrollMarker = sectionTopOffset + 1;
      let currentSection = policySections[0]?.id;

      for (let i = 0; i < policySections.length; i++) {
        const sec = policySections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          // Chọn section gần nhất đã chạm hoặc vượt qua mép trên sau phần navbar cố định
          if (top <= scrollMarker) {
            currentSection = sec.id;
          } else {
            break;
          }
        }
      }

      setActiveTab(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 bg-[#F8FAFC] text-[#0F172A] min-h-screen relative select-none">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HEADER TỔNG QUAN */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#EB323A] bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block mb-3 shadow-xs">
            Nguồn Lực Phát Triển
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0F172A]">
            Chính Sách <span className="text-[#EB323A]">Nhân Sự</span>
          </h1>
          <div className="w-12 h-[3px] bg-[#EB323A] mx-auto mt-3 rounded-full" />
        </div>

        {/* THÔNG ĐIỆP CỐT LÕI */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-50 text-[#EB323A] rounded-xl border border-red-100 flex-shrink-0 hidden sm:block">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase text-[#0F172A] mb-2 flex items-center gap-2">
                <span>Con người là chìa khóa của thành công</span>
                <Sparkles size={18} className="text-[#EB323A]" />
              </h2>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                Nguồn nhân lực trong bộ máy công ty Tân Minh Nhân được xem là tài sản quý giá nhất. Do vậy, chúng tôi luôn quan tâm xây dựng đội ngũ Cán bộ quản lý và nhân viên chuyên nghiệp để đưa Công ty phát triển ngày càng vững mạnh. Công ty đánh giá khách quan, đúng mức về sự đóng góp của mỗi thành viên nhằm giúp Cán bộ nhân viên (CBNV) ý thức vai trò của mình trong việc hình thành văn hóa Công ty, không ngừng học tập, sáng tạo, cần cù và chính trực.
              </p>
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* 📌 SIDEBAR MỤC LỤC CỐ ĐỊNH */}
       {/* 📌 KHỐI MỤC LỤC CỐ ĐỊNH - ĐÃ TĂNG TOP THÀNH top-[165px] ĐỂ KHÔNG BỊ KHUẤT */}
<div className="lg:col-span-4 lg:sticky lg:top-[165px] z-20 self-start">
  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
      Mục lục chính sách
    </h3>
    <nav className="space-y-1">
      {policySections.map((sec) => {
        const Icon = sec.icon;
        const isActive = activeTab === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              isActive
                ? 'bg-red-50 text-[#EB323A] border border-red-200/60 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Icon size={16} className={isActive ? 'text-[#EB323A]' : 'text-slate-400'} />
              <span>{sec.title}</span>
            </div>
            <ChevronRight size={14} className={`transition-transform ${isActive ? 'translate-x-1 text-[#EB323A]' : 'opacity-0'}`} />
          </button>
        );
      })}
    </nav>
  </div>
</div>

          {/* CHI TIẾT NỘI DUNG CHÍNH SÁCH */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. MÔI TRƯỜNG LÀM VIỆC */}
            <div id="moi-truong" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">1. Môi trường làm việc</h3>
              </div>
              <ul className="space-y-3.5 text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#EB323A] flex-shrink-0 mt-0.5" />
                  <span><strong>Điều kiện làm việc tiện nghi:</strong> Bố trí nơi làm việc thoáng mát, sạch sẽ; cung cấp đầy đủ máy móc, thiết bị phương tiện cần thiết; trang bị đồng phục và thiết bị bảo hộ lao động cá nhân tiêu chuẩn cho CBNV làm việc tại công trường.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#EB323A] flex-shrink-0 mt-0.5" />
                  <span><strong>Năng động & Chuyên nghiệp:</strong> Môi trường tạo điều kiện tối đa để mỗi cá nhân tự khẳng định và phát huy năng lực. Luôn có sự hỗ trợ, hướng dẫn của cấp trên và sự phối hợp chặt chẽ giữa các bộ phận trên tinh thần vì sự phát triển chung.</span>
                </li>
              </ul>
            </div>

            {/* 2. CHÍNH SÁCH LAO ĐỘNG */}
            <div id="chinh-sach-ld" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">2. Chính sách lao động & Kỷ luật</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-xs font-bold text-[#0F172A] block mb-1">Thời gian làm việc</span>
                  <span className="text-xs text-slate-500">Chế độ làm việc chuẩn <strong>48 tiếng/tuần</strong>.</span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-xs font-bold text-[#0F172A] block mb-1">Nghỉ Lễ & Phép</span>
                  <span className="text-xs text-slate-500">Nghỉ lễ, phép năm tuân thủ quy định của Bộ luật Lao động.</span>
                </div>
              </div>

              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-3 flex items-center gap-2">
                <AlertCircle size={15} className="text-[#EB323A]" /> Quy định kỷ luật tác nghiệp
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed font-normal bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <li>• Mặc đồng phục theo quy định và nghiêm túc chấp hành kỷ luật Công ty.</li>
                <li>• Nêu cao tinh thần trách nhiệm, đoàn kết nội bộ để hoàn thành tốt mọi nhiệm vụ.</li>
                <li>• Tuân thủ tuyệt đối sự phân công, điều động của cấp trên; báo cáo trung thực công việc.</li>
                <li>• Nghiêm cấm lợi dụng chức quyền nhận hoa hồng, tiền bồi dưỡng dưới mọi hình thức.</li>
                <li>• Nghiêm cấm tự ý mang tài liệu ra khỏi văn phòng hoặc tiết lộ thông tin, bí mật kinh doanh ra bên ngoài.</li>
                <li>• Thu nhập cá nhân được đánh giá định kỳ, bảo mật tuyệt đối và không tiết lộ ra ngoài.</li>
              </ul>
            </div>

            {/* 3. TIỀN LƯƠNG & THƯỞNG */}
            <div id="tien-luong" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">3. Tiền lương & Thưởng đãi ngộ</h3>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#EB323A] flex-shrink-0 mt-0.5" />
                  <span><strong>Lương theo hiệu quả:</strong> Chính sách lương xây dựng trên cơ sở mức độ phức tạp công việc và hiệu quả thực hiện thực tế.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#EB323A] flex-shrink-0 mt-0.5" />
                  <span><strong>Xét tăng lương định kỳ:</strong> Định kỳ trong năm, Công ty xem xét tăng lương dựa trên đánh giá đóng góp của cấp lãnh đạo trực tiếp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#EB323A] flex-shrink-0 mt-0.5" />
                  <span><strong>Chế độ thưởng đa dạng:</strong> Thưởng thỏa đáng dịp Lễ, Tết, thưởng theo hiệu quả công việc và các gói <strong>thưởng hoàn thành công trình</strong>.</span>
                </li>
              </ul>
            </div>

            {/* 4. BẢO HIỂM XÃ HỘI */}
            <div id="bao-hiem" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">4. Bảo hiểm & Chăm sóc sức khỏe</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                Thực hiện trích nộp BHXH, BHYT đầy đủ theo luật định. Đảm bảo toàn bộ quyền lợi thai sản, tai nạn lao động và trợ cấp thôi việc.
              </p>
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#EB323A] uppercase tracking-wider block">Bảo hiểm sức khỏe bổ sung (Bảo hiểm Premium):</span>
                <ul className="text-xs text-slate-600 space-y-1 font-normal">
                  <li>• Mua gói <strong>Bảo hiểm sức khỏe toàn diện</strong> cho CBNV và xem xét mở rộng cho người thân trong gia đình tùy thuộc theo vị trí công tác.</li>
                  <li>• Trang bị bảo hiểm tai nạn đặc thù khi đi công tác nước ngoài.</li>
                </ul>
              </div>
            </div>

            {/* 5. ĐÀO TẠO & PHÁT TRIỂN */}
            <div id="dao-tao" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">5. Đào tạo & Phát triển năng lực</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200/80 rounded-xl bg-white">
                  <span className="text-xs font-bold text-[#0F172A] uppercase block mb-1 text-[#EB323A]">Đào tạo hội nhập</span>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">Giúp nhân sự mới hiểu lịch sử, quy trình, văn hóa Tân Minh Nhân để nhanh chóng hòa nhập. Huấn luyện nghiệp vụ cho giám sát mới.</p>
                </div>
                <div className="p-4 border border-slate-200/80 rounded-xl bg-white">
                  <span className="text-xs font-bold text-[#0F172A] uppercase block mb-1 text-[#EB323A]">Lãnh đạo tiềm năng</span>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">Đề cử CBNV xuất sắc vào CLB Lãnh đạo tiềm năng, đào tạo chuyên sâu về kỹ năng quản lý, lập kế hoạch và tổ chức công việc.</p>
                </div>
                <div className="p-4 border border-slate-200/80 rounded-xl bg-white">
                  <span className="text-xs font-bold text-[#0F172A] uppercase block mb-1 text-[#EB323A]">Đào tạo nội bộ & Kỹ năng</span>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">Thường xuyên mời chuyên gia giảng dạy nghiệp vụ kỹ thuật sâu. Bồi dưỡng kỹ năng mềm: giao tiếp, thuyết trình, đàm phán.</p>
                </div>
                <div className="p-4 border border-slate-200/80 rounded-xl bg-white">
                  <span className="text-xs font-bold text-[#0F172A] uppercase block mb-1 text-[#EB323A]">Đào tạo ngắn hạn quốc tế</span>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">Hàng năm cử các cán bộ quản lý tham quan, học hỏi mô hình kiến trúc & xây dựng tiên tiến tại nước ngoài.</p>
                </div>
              </div>
            </div>

            {/* 6. PHỤ CẤP & PHÚC LỢI */}
            <div id="phuc-loi" className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-red-50 text-[#EB323A] rounded-lg">
                  <Gift size={20} />
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[#0F172A]">6. Phụ cấp, Phúc lợi & Đãi ngộ</h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-600 font-normal">
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-1">6.1. Phụ cấp công việc:</h4>
                  <p className="text-xs text-slate-500">Xây dựng đầy đủ các khoản phụ cấp tạo điều kiện cho công việc: Phụ cấp bữa ăn, phụ cấp điện thoại, phụ cấp đi công tác...</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0F172A] mb-2">6.2. Chương trình Phúc lợi tập thể:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Plane size={18} className="text-[#EB323A] mb-1" />
                      <span className="font-bold text-xs text-[#0F172A] block mb-0.5">Du lịch nghỉ mát</span>
                      <span className="text-[11px] text-slate-500">Tổ chức du lịch hàng năm trong và ngoài nước.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Trophy size={18} className="text-[#EB323A] mb-1" />
                      <span className="font-bold text-xs text-[#0F172A] block mb-0.5">Hội thao định kỳ</span>
                      <span className="text-[11px] text-slate-500">Giao lưu thể thao tạo gắn kết giữa các bộ phận.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Gift size={18} className="text-[#EB323A] mb-1" />
                      <span className="font-bold text-xs text-[#0F172A] block mb-0.5">Chăm lo gia đình</span>
                      <span className="text-[11px] text-slate-500">Tặng quà Lễ Tết, Quốc tế thiếu nhi 1/6, Trung thu, khen thưởng con CBNV học giỏi.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}