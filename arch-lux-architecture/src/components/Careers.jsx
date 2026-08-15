import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Gift,
  MapPin,
  User,
  FileText,
  GraduationCap,
  CreditCard,
  Image as ImageIcon,
  HeartPulse,
  Upload,
  Send,
  FileCheck,
  Phone,
  Mail,
  Plane,
  Home,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

export default function Careers() {
  // Danh sách 9 vị trí tuyển dụng chi tiết
  const jobsList = [
    {
      id: "qs",
      title: "Nhân viên QS",
      badge: "Công trường / Văn phòng",
      description: [
        "Dựa vào bản vẽ thiết kế - tính toán, bóc tách khối lượng thi công các hạng mục công trình.",
        "Phối hợp với Giám sát công trình theo dõi đặt hàng vật tư công trình.",
        "Kiểm tra khối lượng của tổ đội, thầu phụ...",
        "Quản lý công tác thanh/quyết toán: kiểm soát điều kiện thanh, quyết toán; kiểm soát đơn giá thanh/quyết toán các gói thầu.",
      ],
      requirements: [
        "Tốt nghiệp khoa Kinh tế xây dựng các trường: ĐH Xây dựng, ĐH Bách khoa, ĐH Kiến Trúc...",
        "Sử dụng thành thạo phần mềm MS Windows / Office...",
        "Trung thực, tận tâm, làm việc nhóm, chịu khó, giao tiếp khá.",
        "Nhanh nhẹn, tinh thần làm việc chăm chỉ, chịu áp lực công việc cao.",
        "Ưu tiên: Ứng viên có thể đi công tác xa.",
      ],
    },
    {
      id: "qaqc",
      title: "Nhân viên QA/QC",
      badge: "Chất lượng",
      description: [
        "Phối hợp với Ban chỉ huy công trường lập kế hoạch quản lý chất lượng công trình.",
        "Chuẩn bị những phương án quản lý chất lượng dự phòng khi công trình gặp sự cố.",
        "Thực hiện kiểm tra chất lượng vật tư đầu vào thông qua các thông số kỹ thuật cụ thể.",
        "Loại bỏ vật tư không phù hợp, tiến hành làm việc với nhà cung cấp để xử lý, thay thế.",
        "Kiểm tra chất lượng các trang thiết bị thi công vào, đảm bảo an toàn và hoạt động tốt.",
        "Giám sát, theo dõi quá trình thi công, lấy mẫu, đo đạc thông số kỹ thuật.",
        "Tổ chức nghiệm thu công trình với chủ đầu tư và làm báo cáo định kỳ.",
      ],
      requirements: [
        "Tốt nghiệp ĐH chuyên ngành Xây dựng Dân dụng hoặc chuyên ngành liên quan.",
        "Có kinh nghiệm quản lý thi công dự án tổng thầu, dự án nhiều gói thầu thi công kết cấu, hoàn thiện, nhà xưởng công nghiệp.",
        "Thành thạo phần mềm chuyên ngành, kỹ năng làm việc nhóm, chịu áp lực cao.",
        "Có sức khỏe tốt, chăm chỉ, sẵn sàng làm việc tăng ca khi có yêu cầu.",
      ],
    },
    {
      id: "supervisors",
      title: "Giám sát kết cấu / Hoàn thiện",
      badge: "Công trường",
      description: [
        "Phân tích, tính toán kết cấu, các thành phần cơ bản của công trình.",
        "Giám sát triển khai thi công, chịu trách nhiệm về an toàn, tiến độ, chất lượng.",
        "Khảo sát, chuẩn bị mặt bằng, lập biện pháp thi công, biện pháp an toàn, bản vẽ triển khai.",
        "Đọc hiểu, bóc tách khối lượng, dự trù vật tư thiết bị, máy móc và ra đề tay thép cho tổ đội.",
        "Hiểu biết kiến trúc và vật liệu hoàn thiện, phối hợp kỹ sư thiết kế thống nhất tính thẩm mỹ.",
        "Thực hiện các hồ sơ nghiệm thu.",
      ],
      requirements: [
        "Tốt nghiệp ĐH chuyên ngành Xây dựng DD&CN hoặc các chuyên ngành liên quan có kinh nghiệm.",
        "Sử dụng thành thạo phần mềm MS Office...",
        "Nhanh nhẹn, tinh thần làm việc chăm chỉ, nhiệt tình, chịu áp lực cao.",
        "Ưu tiên: Ứng viên có thể đi công tác xa.",
      ],
    },
    {
      id: "shopdrawing",
      title: "Shopdrawing kết cấu / Hoàn thiện",
      badge: "Kỹ thuật",
      description: [
        "Tham gia lên kế hoạch triển khai dự án, triển khai bản vẽ thiết kế thi công từng hạng mục.",
        "Tiếp nhận bản vẽ thi công đã phê duyệt và triển khai cho bộ phận liên quan (giám sát, vật tư, thầu phụ).",
        "Theo dõi, kiểm tra, tham gia giám sát quá trình thi công đảm bảo thực hiện đúng bản vẽ.",
        "Phối hợp thực hiện hồ sơ nghiệm thu, bản vẽ hoàn công.",
      ],
      requirements: [
        "Tốt nghiệp ĐH chuyên ngành Kiến trúc sư hoặc các chuyên ngành xây dựng có kinh nghiệm Shopdrawing.",
        "Sử dụng thành thạo phần mềm xây dựng liên quan, am hiểu tiêu chuẩn xây dựng hiện hành.",
        "Nhiệt tình, chịu áp lực cao, giao tiếp khá.",
        "Ưu tiên: Ứng viên có thể đi công tác xa.",
      ],
    },
    {
      id: "hse",
      title: "Nhân viên An toàn lao động",
      badge: "HSE",
      description: [
        "Lập kế hoạch, thực hiện và giám sát hoạt động an toàn - vệ sinh lao động, PCCC trên công trường.",
        "Phân tích an toàn, đánh giá rủi ro và đưa ra biện pháp đảm bảo ATVSLĐ (lập bảng JSA).",
        "Kiểm tra máy móc, thiết bị, phương tiện thi công đảm bảo hoạt động an toàn.",
        "Phổ biến, hướng dẫn, kiểm tra và đôn đốc thực hiện quy định ATVSLĐ, PCCC.",
        "Đình chỉ công việc ở các vị trí có nguy cơ mất an toàn.",
      ],
      requirements: [
        "Tốt nghiệp chuyên ngành Bảo hộ lao động, Môi trường hoặc Xây dựng.",
        "Tối thiểu 1 năm kinh nghiệm tại vị trí tương đương.",
        "Thành thạo Word, Excel, PowerPoint, CAD... Có chứng chỉ HSE.",
        "Nhanh nhẹn, làm việc nhóm và chịu áp lực cao.",
      ],
    },
    {
      id: "secretary",
      title: "Thư ký công trình",
      badge: "Hành chính",
      description: [
        "Soạn thảo, lưu trữ và quản lý hồ sơ, văn bản hành chính tại công trình.",
        "Tiếp nhận và chuyển tiếp công văn, tài liệu giữa văn phòng và công trình.",
        "Hỗ trợ công tác hậu cần công trường: chỗ ăn ở, văn phòng phẩm, phương tiện...",
        "Thực hiện chấm công, theo dõi chấm công, tăng ca tại công trình.",
      ],
      requirements: [
        "Tốt nghiệp ĐH trở lên chuyên ngành Kế toán, Tài chính, Hành chính văn phòng...",
        "Thành thạo Word, Excel..., kỹ năng tổ chức và quản lý thời gian tốt.",
        "Cẩn thận, chỉn chu, trung thực, tận tâm.",
      ],
    },
    {
      id: "warehouse",
      title: "Nhân viên Thủ kho",
      badge: "Vật tư",
      description: [
        "Tổ chức kho bãi, nơi tập kết vật tư, bốc dỡ và vận chuyển hàng hóa.",
        "Kiểm soát số lượng, tình trạng vật tư trong quá trình nhập - xuất kho.",
        "Cấp phát vật tư cho thầu phụ, đội thi công đúng chủng loại & số lượng phê duyệt.",
        "Thường xuyên kiểm tra và báo cáo tình trạng tồn kho, hao hụt vật tư.",
      ],
      requirements: [
        "Có kinh nghiệm làm thủ kho tại các công trình xây dựng.",
        "Có kiến thức về quản lý hàng tồn kho, ghi sổ hợp lý.",
        "Thành thạo Word, Excel, cẩn thận, chỉn chu, làm việc nhóm tốt.",
      ],
    },
    {
      id: "equipment",
      title: "NV Phòng Quản lý thiết bị",
      badge: "Quản lý MMTB",
      description: [
        "Phối hợp với BCH lên kế hoạch sử dụng, luân chuyển, mua/thuê thiết bị cho dự án.",
        "Tìm kiếm nguồn cung ứng VTTB chất lượng tốt, giá thành thấp.",
        "Theo dõi xuất - nhập, làm bill thanh toán với nhà cung cấp.",
        "Kiểm tra quản lý thiết bị, cảnh báo kịp thời các tồn tại gây lãng phí, thất thoát.",
      ],
      requirements: [
        "Tốt nghiệp ĐH/CĐ chuyên ngành Xây dựng DD&CN, Kỹ thuật xây dựng...",
        "Có kinh nghiệm làm bên thiết bị xây dựng, thành thạo Office.",
        "Khả năng đọc bản vẽ tính toán khối lượng thiết bị (tầng hầm, nhà cao tầng, nhà công nghiệp).",
      ],
    },
    {
      id: "tax-accountant",
      title: "Nhân viên Kế toán thuế",
      badge: "Tài chính",
      description: [
        "Tập hợp hóa đơn đầu vào, đầu ra lên bảng kê theo dõi từng hợp đồng.",
        "Tập hợp phân chia chi phí theo hợp đồng Chủ đầu tư, xuất hóa đơn đầu ra.",
        "Hoàn thiện hợp đồng lao động, bảng lương công nhân, phân bổ CCDC, TSCĐ.",
        "Nhập dữ liệu phần mềm, hoàn thành chứng từ sổ sách, lập tờ khai thuế GTGT, TNCN, TNDN.",
      ],
      requirements: [
        "Tốt nghiệp ĐH trở lên chuyên ngành Tài chính kế toán, Kế toán doanh nghiệp.",
        "Tối thiểu 1 năm kinh nghiệm (chưa có kinh nghiệm sẽ được đào tạo).",
        "Thành thạo phần mềm kế toán, Office, ứng dụng tài chính.",
      ],
    },
  ];

  const [selectedJob, setSelectedJob] = useState(jobsList[0]);

  // State quản lý Form & File Upload
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    position: jobsList[0].title,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  // Chọn file CV
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("Dung lượng file vượt quá 10MB. Vui lòng chọn file nhỏ hơn.");
        return;
      }
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  // Hủy file đã chọn
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Đồng bộ vị trí ứng tuyển khi chọn tab
  const handleSelectJobFromTab = (job) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, position: job.title }));
  };

  // Xử lý gửi hồ sơ qua API backend bảo mật trên Vercel
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("phone", formData.phone);
      form.append("position", formData.position);

      if (selectedFile) {
        form.append("cv", selectedFile, selectedFile.name);
      }

      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: form,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Gửi hồ sơ thất bại.");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        position: selectedJob.title,
      });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error("Submit application error:", err);
      setErrorMessage(err.message || "Gửi hồ sơ thất bại. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  // Bộ danh mục đãi ngộ bằng Icon
  const benefitsList = [
    {
      icon: <DollarSign className="text-[#EB323A]" size={24} />,
      title: "Lương & Thưởng",
      desc: "Lương thỏa thuận theo năng lực. Thưởng lễ, Tết, thưởng quyết toán dự án.",
    },
    {
      icon: <Plane className="text-[#EB323A]" size={24} />,
      title: "Công Tác Xa",
      desc: "Làm 40 ngày được nghỉ 4 ngày (nguyên lương). Bao vé máy bay đi lại.",
    },
    {
      icon: <Home className="text-[#EB323A]" size={24} />,
      title: "Đài Thọ Chỗ Ở",
      desc: "Công ty tài trợ 100% chỗ ở & phụ cấp 200k - 300k/ngày khi đi công tác.",
    },
    {
      icon: <ShieldCheck className="text-[#EB323A]" size={24} />,
      title: "Bảo Hiểm Đầy Đủ",
      desc: "Tham gia đầy đủ BHXH, BHYT, BHTN theo luật lao động & Phụ cấp điện thoại.",
    },
  ];

  // Danh mục Hồ sơ ứng tuyển
// Danh mục Hồ sơ ứng tuyển
  const requiredDocuments = [
    {
      icon: <User size={18} />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Thông tin ứng viên (CV)</span>
          <a
            href="/NS-TD01-2020-thong-tin-ung-vien-v5.doc" // Đường dẫn tới file trong thư mục public
            download="NS-TD01-2020-thong-tin-ung-vien-v5.doc" // Tên file khi tải về máy
            className="text-[#EB323A] font-bold text-xs underline hover:text-[#d02830] transition-colors ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            [Tải ngay]
          </a>
        </span>
      ),
    },
    {
      icon: <FileText size={18} />,
      label: "Sơ yếu lý lịch (Xác nhận chính quyền)",
    },
    { icon: <FileCheck size={18} />, label: "Đơn xin việc" },
    {
      icon: <GraduationCap size={18} />,
      label: "Văn bằng / Chứng chỉ chuyên ngành",
    },
    { icon: <CreditCard size={18} />, label: "Căn cước công dân (Bản sao)" },
    { icon: <ImageIcon size={18} />, label: "Ảnh thẻ 3x4 (2 ảnh)" },
    {
      icon: <HeartPulse size={18} />,
      label: "Giấy khám sức khỏe (Dưới 6 tháng)",
    },
  ];

  return (
    <section className="bg-white text-[#0F172A] py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* HEADER TRANG */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB323A] inline-flex items-center gap-1.5 mb-3 bg-red-50 px-3.5 py-1.5 rounded-full">
            <Sparkles size={14} /> Gia Nhập Đội Ngũ Tân Minh Nhân
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight uppercase">
            Cơ Hội Nghề Nghiệp
          </h1>
          <div className="w-20 h-[3px] bg-[#EB323A] mx-auto mt-4 rounded-full" />
        </div>

        {/* 🎯 BỘ KHỐI 1: CHỌN VỊ TRÍ VÀ XEM CHI TIẾT INTERACTIVE */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-6 bg-[#EB323A] rounded-full" />
              <h2 className="font-sans text-xl font-extrabold uppercase tracking-wider text-[#0F172A]">
                Vị Trí Đang Tuyển Dụng ({jobsList.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div
              data-lenis-prevent="true"
              className="lg:col-span-5 h-[580px] overflow-y-scroll overscroll-contain touch-pan-y pr-2 custom-scrollbar"
            >
              {jobsList.map((job) => {
                const isSelected = selectedJob.id === job.id;
                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => handleSelectJobFromTab(job)}
                    className={`w-full p-4 text-left rounded-sm border transition-all duration-200 flex items-center justify-between group cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md transform translate-x-1"
                        : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
                    }`}
                  >
                    <div className="pointer-events-none">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-[#EB323A] text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {job.badge}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base mt-1.5">
                        {job.title}
                      </h3>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`pointer-events-none transition-transform ${
                        isSelected
                          ? "text-[#EB323A] translate-x-1"
                          : "text-slate-400 group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Cột phải: Khối Chi tiết Mô tả & Yêu cầu công việc */}
            <div className="lg:col-span-7 bg-slate-50/90 border border-slate-200 rounded-sm p-6 sm:p-8 min-h-[580px] flex flex-col justify-between shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJob.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#EB323A]">
                      Chi tiết vị trí
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">
                      {selectedJob.title}
                    </h3>
                  </div>

                  {/* Mô tả công việc */}
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <Briefcase size={16} className="text-[#EB323A]" /> Mô Tả
                      Công Việc
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedJob.description.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB323A] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Yêu cầu công việc */}
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#EB323A]" /> Yêu
                      Cầu Ứng Viên
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedJob.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Thu nhập & Đãi ngộ theo thỏa thuận năng lực
                </span>
                <a
                  href="#apply-form"
                  className="px-5 py-2.5 bg-[#EB323A] hover:bg-[#d02830] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <Send size={14} /> Ứng tuyển ngay
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 🎯 BỘ KHỐI 2: CHẾ ĐỘ QUYỀN LỢI ĐÃI NGỘ ĐỘT PHÁ (CARDS) */}
        <div className="mb-20">
          <div className="mb-8 pb-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-2.5 h-6 bg-[#0F172A] rounded-full" />
            <h2 className="font-heading text-2xl font-bold text-[#0F172A]">
              Quyền Lợi & Đãi Ngộ Cho Nhân Viên
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 border border-slate-200/80 rounded-sm hover:border-[#EB323A] hover:shadow-md transition-all group"
              >
                <div className="p-3 rounded bg-white w-fit shadow-2xs mb-4 group-hover:bg-red-50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🎯 BỘ KHỐI 3: HỒ SƠ & FORM NỘP ỨNG TUYỂN */}
        <div
          id="apply-form"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6"
        >
          {/* Cột trái: Checklist Giấy tờ */}
          <div className="lg:col-span-5">
            <div className="mb-6 pb-4 border-b border-slate-200 flex items-center gap-3">
              <div className="w-2.5 h-6 bg-[#EB323A] rounded-full" />
              <h2 className="font-heading text-2xl font-bold text-[#0F172A]">
                Hồ Sơ Cần Chuẩn Bị
              </h2>
            </div>

            <ul className="space-y-3 mb-8">
              {requiredDocuments.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3.5 rounded border border-slate-200/60"
                >
                  <span className="text-[#EB323A] shrink-0">{doc.icon}</span>
                  <span className="font-medium">{doc.label}</span>
                </li>
              ))}
            </ul>

            {/* Thông tin liên hệ trực tiếp */}
            <div className="p-5 bg-[#0F172A] text-white rounded-sm space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#EB323A] font-bold block">
                Liên hệ trực tiếp HR
              </span>
              <p className="flex items-center gap-2.5 text-sm">
                <Mail size={16} className="text-[#EB323A]" />{" "}
                contact@tanminhnhan.com.vn
              </p>
              <p className="flex items-center gap-2.5 text-sm">
                <Phone size={16} className="text-[#EB323A]" /> Hotline/Zalo:{" "}
                <strong className="text-white">0335.216.015</strong>
              </p>
            </div>
          </div>

          {/* Cột phải: Form nộp trực tuyến */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h2 className="font-heading text-2xl font-bold text-[#0F172A]">
                Nộp Hồ Sơ Nhanh Online
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Ứng tuyển trực tiếp vào bộ phận Nhân sự Tân Minh Nhân
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-[#EB323A]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="0905 xxx xxx"
                    className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-[#EB323A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Vị trí ứng tuyển *
                </label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-[#EB323A]"
                >
                  {jobsList.map((j) => (
                    <option key={j.id} value={j.title}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Đính kèm CV / Hồ sơ (PDF, DOC, DOCX)
                </label>

                {/* Input file ẩn */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                {/* Khung tương tác upload */}
                {!selectedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-sm p-6 text-center bg-white hover:border-[#EB323A] transition-colors cursor-pointer"
                  >
                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                    <span className="text-xs text-slate-700 block font-semibold">
                      Tải lên file CV của bạn
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Hỗ trợ PDF, DOC, DOCX - Tối đa 10MB
                    </span>
                  </div>
                ) : (
                  <div className="border border-emerald-300 bg-emerald-50/60 rounded-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileCheck size={24} className="text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 hover:bg-slate-200/60 rounded-full text-slate-500 hover:text-red-600 transition-colors shrink-0"
                      title="Xóa file này"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#EB323A] hover:bg-[#d02830] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md mt-2"
              >
                {loading ? "Đang gửi hồ sơ..." : "Gửi Hồ Sơ Ngay"}{" "}
                <Send size={16} />
              </button>

              {submitted && (
                <p className="text-emerald-600 text-xs font-bold text-center mt-3 bg-emerald-50 py-2.5 border border-emerald-200 rounded">
                  ✓ Cảm ơn bạn! Hồ sơ ứng tuyển đã được gửi thành công đến bộ phận HR.
                </p>
              )}

              {errorMessage && (
                <p className="text-red-500 text-xs font-bold text-center mt-3 bg-red-50 py-2.5 border border-red-200 rounded">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}