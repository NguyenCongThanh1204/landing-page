import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, ChevronDown } from "lucide-react";

// 🎯 DỮ LIỆU CẤP BẬC BAN LÃNH ĐẠO (ĐÃ TÁCH TỔNG GIÁM ĐỐC LÊN HÀNG RIÊNG)
const HIERARCHY_DATA = [
  {
    levelId: 1,
    levelName: "Hội Đồng Quản Trị",
    description: "Định hướng chiến lược & Xây dựng văn hóa Tân Minh Nhân",
    badgeColor: "border-red-200 bg-red-50 text-[#EB323A]",
    type: "single",
    ceo: null,
    deputies: [],
    members: [
      {
        id: "hdqt-1",
        name: "NHAN VĂN CHIẾN",
        title: "Chủ tịch Hội đồng Quản trị",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/nhan-van-chien.jpg",
        bio: "Ông là người mạnh mẽ, quyết đoán và có tầm nhìn rộng, đặc biệt luôn coi trọng chữ tín trong kinh doanh. Ông đã đào tạo và phát triển đội ngũ nhân sự trong công ty vừa tinh vừa chất. Ông chính là người xây dựng và định hình văn hóa Tân Minh Nhân.",
        email: "chien.nhan@tanminhnhan.com.vn",
      },
    ],
  },
  {
    levelId: 2,
    levelName: "Ban Tổng Giám Đốc",
    description: "Điều hành chiến lược tổng thể & Quản trị vận hành",
    badgeColor: "border-amber-200 bg-amber-50 text-amber-700",
    type: "tiered", // Đánh dấu tầng đặc biệt chia làm 2 hàng
    ceo: {
      id: "bgd-1",
      name: "TRẦN HỮU PHÚC",
      title: "Tổng Giám đốc",
      image: "https://www.tanminhnhan.com.vn/images/persons/tran-huu-phuc.png",
      bio: "Lãnh đạo cấp cao điều hành các hoạt động kinh doanh và định hướng phát triển tổng thể tập đoàn.",
      email: "phuc.tran@tanminhnhan.com.vn",
    },
    deputies: [
      {
        id: "bgd-2",
        name: "NGUYỄN VĂN CHÂU",
        title: "Phó Tổng Giám đốc",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/nguyen-van-chau.jpg",
        bio: "Ông là người có kinh nghiệm sâu rộng trong ngành xây dựng. Sau nhiều năm làm việc trong ngành, ông gia nhập Tân Minh Nhân vào năm 2014 với vị trí Phó Tổng Giám đốc.",
        email: "chau.nguyen@tanminhnhan.com.vn",
      },
      {
        id: "bgd-3",
        name: "PHAN THANH ĐỨC",
        title: "Phó Tổng Giám đốc",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/phan-thanh-duc.jpg",
        bio: "Ông rất nghiêm khắc với bản thân, luôn tự đề ra mục tiêu và hoàn thành sớm nhất. Là người ham học hỏi, cầu tiến, có tầm nhìn và các chiến lược mang tính hiệu quả cao.",
        email: "duc.phan@tanminhnhan.com.vn",
      },
      {
        id: "bgd-4",
        name: "LÊ VĂN HẢI",
        title: "Phó Tổng Giám đốc",
        image: "https://www.tanminhnhan.com.vn/images/persons/LE-VAN-HAI.jpg",
        bio: 'Phụ trách công việc theo nguyên tắc và quy trình chặt chẽ với phương châm "Khác biệt trong khuôn khổ", đem lại sự sáng tạo trong công việc.',
        email: "hai.le@tanminhnhan.com.vn",
      },
      {
        id: "bgd-5",
        name: "LÊ MINH NGHỊ",
        title: "Phó Tổng Giám đốc",
        image: "https://www.tanminhnhan.com.vn/images/persons/le-minh-nghi.png",
        bio: "Thành viên Ban Tổng Giám đốc chỉ đạo các hạng mục công trình thi công quy mô lớn.",
        email: "nghi.le@tanminhnhan.com.vn",
      },
      {
        id: "bgd-6",
        name: "HỒ THỊ MỸ PHƯỢNG",
        title: "Phó Tổng Giám đốc",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/HO-THI-MY-PHUONG.jpg",
        bio: "Bà là người năng nổ, nhiệt huyết, hết mình vì công việc. Theo bà, có như vậy thì mới phát triển được bản thân và được người khác ghi nhận.",
        email: "phuong.ho@tanminhnhan.com.vn",
      },
    ],
  },
  {
    levelId: 3,
    levelName: "Trợ Lý Chủ Tịch HĐQT & Giám Đốc Khối",
    description:
      "Cố vấn chiến lược, Chuyển đổi số & Quản lý các khối chuyên môn",
    badgeColor: "border-blue-200 bg-blue-50 text-blue-700",
    type: "single",
    members: [
      {
        id: "tl-1",
        name: "PHẠM MINH ĐỨC",
        title: "Trợ lý Chủ tịch HĐQT",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/PHAM-MINH-DUC.jpg",
        bio: "Tận tụy, hết lòng vì công việc. Với ông thành công là một chặng đường dài phấn đấu chứ không chỉ là một cơ hội, nên cần xây dựng nền tảng vững chắc để biến cơ hội thành sự thật.",
        email: "duc.pham@tanminhnhan.com.vn",
      },
      {
        id: "tl-2",
        name: "MẠC NHƯ MINH",
        title: "Trợ lý Chủ tịch HĐQT",
        image: "https://www.tanminhnhan.com.vn/images/persons/MAC-NHU-MINH.jpg",
        bio: "Từng giảng dạy tại Đại học Bách khoa Đà Nẵng, ông luôn đặt mục tiêu giúp Tân Minh Nhân cải tiến trong công nghệ, chuyển đổi số và phát triển bền vững.",
        email: "minh.mac@tanminhnhan.com.vn",
      },
      {
        id: "gdk-1",
        name: "PHẠM THỊ LIỄU",
        title: "Giám đốc Khối Tài chính - Kế toán",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/PHAM-THI-LIEU.jpg",
        bio: "Gắn bó từ những ngày đầu thành lập, bà là người chăm chỉ, tỉ mỉ và luôn sẵn sàng chia sẻ kinh nghiệm chuyên môn quý báu cho nhân viên.",
        email: "lieu.pham@tanminhnhan.com.vn",
      },
      {
        id: "gdk-2",
        name: "LÊ QUÍ NHẬT",
        title: "Giám đốc Điều hành",
        image: "https://www.tanminhnhan.com.vn/images/persons/LE-QUI-NHAT.jpg",
        bio: "Tự tin, nhiệt tình trong công việc và chịu khó phát triển bản thân. Được Ban Lãnh đạo tin tưởng giao trọng trách tại các dự án quan trọng.",
        email: "nhat.le@tanminhnhan.com.vn",
      },
      {
        id: "gdk-3",
        name: "ĐẶNG TRUYỀN",
        title: "Giám đốc Điều hành",
        image: "https://www.tanminhnhan.com.vn/images/persons/DANG-TRUYEN.jpg",
        bio: "Ông là người ham học hỏi, triển khai công việc nhanh chóng và có khả năng xử lý các công việc mang tính áp lực cao.",
        email: "truyen.dang@tanminhnhan.com.vn",
      },
      {
        id: "gdk-4",
        name: "LÊ VIẾT THÁI",
        title: "Giám đốc Khối Kinh tế - Kế hoạch",
        image: "https://www.tanminhnhan.com.vn/images/persons/le-viet-thai.jpg",
        bio: 'Luôn đặt kế hoạch rõ ràng, tận tâm phấn đấu với phương châm: "Hãy cố gắng làm tốt hơn chính bản thân mình của ngày hôm qua".',
        email: "thai.le@tanminhnhan.com.vn",
      },
      {
        id: "gdk-5",
        name: "NGUYỄN ĐỨC THÀNH",
        title: "Giám đốc Khối Kỹ thuật",
        image:
          "https://www.tanminhnhan.com.vn/images/2026/06/15/nguyen-duc-thanh-02.jpg",
        bio: "Chỉ đạo giải pháp kỹ thuật, kết cấu và an toàn công trình toàn tập đoàn.",
        email: "thanh.nguyen@tanminhnhan.com.vn",
      },
    ],
  },
  {
    levelId: 4,
    levelName: "Khối Điều Hành Dự Án & Trưởng Phòng Chuyên Môn",
    description:
      "Trực tiếp quản lý dự án, kỹ thuật công trình & phòng ban chức năng",
    badgeColor: "border-emerald-200 bg-emerald-50 text-emerald-700",
    type: "single",
    members: [
      {
        id: "gdda-1",
        name: "ĐINH THÀNH LUÂN",
        title: "Giám đốc Dự án",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/Dinh-Thanh-Luan.jpg",
        bio: "Gia nhập từ năm 2014, với tinh thần học hỏi và nhiệt huyết, ông được tín nhiệm giao quản lý nhiều dự án lớn.",
        email: "luan.dinh@tanminhnhan.com.vn",
      },
      {
        id: "gdda-2",
        name: "VÕ NGỌC THÀNH",
        title: "Giám đốc Dự án",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/VO-NGOC-THANH.jpg",
        bio: 'Năng nổ, nhiệt huyết với phương châm "Tạo sự khác biệt trong khuôn khổ", chịu áp lực cao và luôn tối ưu tiến độ, chất lượng công trình.',
        email: "thanh.vo@tanminhnhan.com.vn",
      },
      {
        id: "gdda-3",
        name: "NGUYỄN HƯNG",
        title: "Giám đốc Dự án",
        image: "https://www.tanminhnhan.com.vn/images/persons/nguyen-hung.jpg",
        bio: "Chỉ huy trưởng điều hành các công trình xây dựng quy mô lớn.",
        email: "hung.nguyen@tanminhnhan.com.vn",
      },
      {
        id: "gdda-4",
        name: "NGUYỄN ĐỨC TRÍ",
        title: "Giám đốc Dự án",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/Nguyen-Duc-Tri.jpg",
        bio: 'Ham học hỏi và tận tâm với phương châm: "Thành công chỉ đến khi bạn làm việc tận tâm và luôn nghĩ đến những điều tốt đẹp".',
        email: "tri.nguyen@tanminhnhan.com.vn",
      },
      {
        id: "gdda-5",
        name: "NGUYỄN NGỌC THÔNG",
        title: "Giám đốc Dự án",
        image:
          "https://www.tanminhnhan.com.vn/images/persons/NGUYEN-NGOC-THONG.jpg",
        bio: "Điềm tĩnh, hết mình vì công việc, luôn đặt chữ TÍN lên hàng đầu.",
        email: "thong.nguyen@tanminhnhan.com.vn",
      },
      //   {
      //     id: "ql-1",
      //     name: "HUỲNH KIM QUÝ",
      //     title: "Quản lý Dự án",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/HUYNH-KIM-QUY.jpg",
      //     bio: "Linh hoạt, tầm nhìn bao quát và kỹ năng giao tiếp chuyên nghiệp. Trải qua các bộ phận thiết kế, thi công thực tế đến điều hành.",
      //     email: "quy.huynh@tanminhnhan.com.vn",
      //   },
      //   {
      //     id: "ql-2",
      //     name: "ĐINH CÔNG CHÁNH",
      //     title: "Quản lý Dự án",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/Dinh-Cong-Chanh.jpg",
      //     bio: 'Nghiêm khắc với bản thân và luôn hết mình vì công việc với phương châm: "Hãy cố gắng là một người có giá trị".',
      //     email: "chanh.dinh@tanminhnhan.com.vn",
      //   },
      //   {
      //     id: "ql-3",
      //     name: "NGUYỄN TẤN SĨ",
      //     title: "Quản lý Dự án",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/NGUYEN-TAN-SI.jpg",
      //     bio: 'Nhiệt tâm, trách nhiệm, khiêm nhường. Luôn lấy động lực "Không có áp lực thì không có kim cương" để hoàn thiện mỗi ngày.',
      //     email: "si.nguyen@tanminhnhan.com.vn",
      //   },
      //   {
      //     id: "ql-4",
      //     name: "TẠ ĐỨC HIỆP",
      //     title: "Quản lý Dự án",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/Ta-Duc-Hiep.jpg",
      //     bio: 'Coi trọng chữ TÍN và trách nhiệm. Lấy tiêu chí "Làm việc bằng cả cái Tâm", đặt lợi ích tập thể lên hàng đầu.',
      //     email: "hiep.ta@tanminhnhan.com.vn",
      //   },
      //   {
      //     id: "ql-5",
      //     name: "NGUYỄN THANH VŨ",
      //     title: "TP. Quản lý Thiết bị & Phó Ban KSNB",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/nguyen-thanh-vu.jpg",
      //     bio: 'Nghiêm khắc, giữ vững tinh thần khởi nghiệp với tiêu chí: "An toàn – Chất lượng – Tiến độ – Hiệu quả".',
      //     email: "vu.nguyen@tanminhnhan.com.vn",
      //   },
      //   {
      //     id: "ql-6",
      //     name: "TRẦN THỊ NGỌC MAI",
      //     title: "Trưởng phòng Đấu thầu",
      //     image:
      //       "https://www.tanminhnhan.com.vn/images/persons/tran-thi-ngoc-mai.jpg",
      //     bio: 'Mang năng lượng tích cực, luôn cống hiến hết mình xử lý các công việc áp lực lớn trong tâm thế tìm kiếm "Đam mê với Nghề".',
      //     email: "mai.tran@tanminhnhan.com.vn",
      //   },
    ],
  },
];

export default function LeadershipHierarchy() {
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <section className="py-16 bg-[#F8FAFC] text-[#0F172A] min-h-screen relative overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#EB323A] bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block mb-2 shadow-xs">
            Sơ Đồ Tổ Chức
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-[#0F172A]">
            Bộ Máy <span className="text-[#EB323A]">Ban Lãnh Đạo</span>
          </h2>
          <div className="w-12 h-[3px] bg-[#EB323A] mx-auto mt-2 rounded-full" />
        </div>

        {/* 🌳 SƠ ĐỒ PHÂN CẤP TỐI ƯU 4 CẤP */}
        <div className="flex flex-col items-center gap-6 relative">
          {HIERARCHY_DATA.map((level, levelIndex) => (
            <div
              key={level.levelId}
              className="w-full flex flex-col items-center relative"
            >
              {/* Header Cấp Bậc */}
              <div className="text-center mb-4 relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${level.badgeColor}`}
                  >
                    {level.levelName}
                  </span>
                  {/* <h3 className="text-base md:text-lg font-extrabold uppercase text-[#0F172A] tracking-tight">
                    {level.levelName}
                  </h3> */}
                </div>
                <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                  {level.description}
                </p>
              </div>

              {/* 🟢 HIỂN THỊ CẤP BÌNH THƯỜNG (CẤP 1, 3, 4) */}
              {level.type === "single" && (
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5 w-full max-w-5xl z-10">
                  {level.members.map((member) => (
                    <motion.div
                      key={member.id}
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedLeader(member)}
                      className="w-[190px] sm:w-[210px] bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#EB323A] hover:shadow-[0_8px_25px_rgba(235,50,58,0.12)] transition-all group shadow-xs"
                    >
                      <div className="aspect-[4/4.2] w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <div className="p-3 text-center relative z-10 bg-white">
                        <h4 className="font-extrabold text-xs sm:text-sm uppercase text-[#0F172A] group-hover:text-[#EB323A] transition-colors line-clamp-1">
                          {member.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                          {member.title}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 🟡 HIỂN THỊ CẤP 2: TÁCH TỔNG GIÁM ĐỐC LÊN HÀNG RIÊNG VÀ PHÓ TỔNG HÀNG DƯỚI */}
              {level.type === "tiered" && (
                <div className="flex flex-col items-center w-full max-w-5xl z-10 gap-4">
                  {/* Hàng 1: Tổng Giám Đốc (Đứng riêng 1 hàng) */}
                  {/* Hàng 1: Tổng Giám Đốc (Màu đồng bộ như các Phó Tổng) */}
                  <div className="flex justify-center w-full">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedLeader(level.ceo)}
                      className="w-[190px] sm:w-[210px] bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#EB323A] hover:shadow-[0_8px_25px_rgba(235,50,58,0.12)] transition-all group shadow-xs"
                    >
                      <div className="aspect-[4/4.2] w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={level.ceo.image}
                          alt={level.ceo.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <div className="p-3 text-center relative z-10 bg-white">
                        <h4 className="font-extrabold text-xs sm:text-sm uppercase text-[#0F172A] group-hover:text-[#EB323A] transition-colors line-clamp-1">
                          {level.ceo.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                          {level.ceo.title}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Đường nối ngắn từ Tổng Giám Đốc xuống các Phó Tổng */}
                  <div className="w-[2px] h-4 bg-gradient-to-b from-[#EB323A] to-slate-200" />

                  {/* Hàng 2: Các Phó Tổng Giám Đốc */}
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-5 w-full">
                    {level.deputies.map((deputy) => (
                      <motion.div
                        key={deputy.id}
                        whileHover={{ y: -4, scale: 1.015 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedLeader(deputy)}
                        className="w-[190px] sm:w-[210px] bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#EB323A] hover:shadow-[0_8px_25px_rgba(235,50,58,0.12)] transition-all group shadow-xs"
                      >
                        <div className="aspect-[4/4.2] w-full relative overflow-hidden bg-slate-100">
                          <img
                            src={deputy.image}
                            alt={deputy.name}
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <div className="p-3 text-center relative z-10 bg-white">
                          <h4 className="font-extrabold text-xs sm:text-sm uppercase text-[#0F172A] group-hover:text-[#EB323A] transition-colors line-clamp-1">
                            {deputy.name}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                            {deputy.title}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Đường nối giữa các cấp bậc chính */}
              {levelIndex < HIERARCHY_DATA.length - 1 && (
                <div className="flex flex-col items-center mt-5 text-[#EB323A]/70">
                  <div className="w-[2px] h-5 bg-gradient-to-b from-[#EB323A] to-slate-200" />
                  <ChevronDown
                    size={14}
                    className="animate-bounce -mt-1 text-[#EB323A]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 POPUP DETAIL TỐI ƯU GIAO DIỆN */}
      <AnimatePresence>
        {selectedLeader && (
          /* Lớp phủ nền mờ: Bấm vào bất kỳ đâu trên nền này sẽ tự động đóng Popup */
          <div
            onClick={() => setSelectedLeader(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              /* Ngăn sự kiện click từ bên trong lan ra ngoài làm đóng Popup */
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl p-5 flex flex-col sm:flex-row gap-5 cursor-default"
            >
              {/* Nút Đóng Popup */}
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full bg-slate-100 text-slate-500 hover:text-white hover:bg-[#EB323A] transition-colors z-20 cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Ảnh Lãnh Đạo Popup - Căn sát bên phải với object-right */}
              <div className="w-full sm:w-5/12 aspect-[4/5] rounded-lg overflow-hidden bg-slate-100 relative flex-shrink-0 shadow-xs">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-full h-full object-cover object-right"
                />
              </div>

              {/* Nội dung Popup */}
              <div className="w-full sm:w-7/12 flex flex-col justify-between pt-0.5">
                <div>
                  <span className="text-[10px] font-bold text-[#EB323A] uppercase tracking-wider block mb-0.5">
                    {selectedLeader.title}
                  </span>
                  <h3 className="text-base font-extrabold uppercase text-[#0F172A] mb-1.5">
                    {selectedLeader.name}
                  </h3>
                  <div className="w-6 h-[2px] bg-[#EB323A] mb-2 rounded-full" />
                  <p className="text-slate-600 text-xs leading-relaxed font-normal mb-3">
                    {selectedLeader.bio}
                  </p>
                </div>

                {/* Nút Liên Hệ */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                  <a
                    href={`mailto:${selectedLeader.email}`}
                    className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-[#EB323A] text-slate-700 hover:text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail size={12} /> Email Liên Hệ
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
 