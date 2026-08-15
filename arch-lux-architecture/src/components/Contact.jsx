import { useState } from "react";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError("");

    // THAY THẾ CÁC THÔNG SỐ BÊN DƯỚI BẰNG THÔNG TIN TỪ EMAILJS CỦA BẠN
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((err) => {
        console.error("Email send error:", err);
        setError("Gửi email thất bại. Vui lòng thử lại sau.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // VÙNG XUNG QUANH CHUYỂN SANG NỀN TRẮNG
    <section
      id="contact"
      className="py-32 bg-white text-[#0F172A] relative border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Side (Vùng bên trái - Nền trắng, chữ Xanh Đen Than) */}
          <div className="lg:col-span-5">
            <h2 className="font-heading text-4xl sm:text-5xl font-light text-[#0F172A] mb-8">
              văn phòng <span className="italic text-[#EB323A]">Công ty</span>
            </h2>
            <p className="text-muted text-sm font-light leading-relaxed mb-10">
              Chúng tôi luôn sẵn sàng lắng nghe ý tưởng của bạn và biến chúng
              thành hiện thực. Hãy liên hệ với chúng tôi để bắt đầu hành trình
              kiến tạo không gian sống và làm việc độc đáo.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center text-[#EB323A]">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted block">Địa chỉ</span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    246-250 Lê Văn Hiến, phường Ngũ Hành Sơn, TP. Đà Nẵng, Việt
                    Nam
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center text-[#EB323A]">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted block">Email</span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    contact@tanminhnhan.com.vn
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center text-[#EB323A]">
                  <Globe size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted block">Website</span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    www.tanminhnhan.com.vn
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center text-[#EB323A]">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted block">Phone</span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    (0236) 3 958718
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#0F172A] p-8 md:p-12 border border-white/10 rounded-sm shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#64748B] mb-2 font-semibold">
                  Tên
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Tên của bạn"
                  className="w-full bg-white border border-white/20 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#EB323A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#64748B] mb-2 font-semibold">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full bg-white border border-white/20 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#EB323A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#64748B] mb-2 font-semibold">
                  Nội dung
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Hãy mô tả tầm nhìn, phạm vi và kế hoạch thực hiện của bạn..."
                  className="w-full bg-white border border-white/20 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#EB323A] transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EB323A] text-white py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-[#EB323A] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Đang gửi..." : "Gửi yêu cầu"} <Send size={14} />
              </button>

              {submitted && (
                <p className="text-[#EB323A] text-xs uppercase tracking-widest text-center mt-4 font-bold">
                  Cảm ơn bạn. Yêu cầu của bạn đã được gửi đến công ty của chúng
                  tôi.
                </p>
              )}

              {error && (
                <p className="text-red-400 text-xs uppercase tracking-widest text-center mt-4 font-bold">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-20 h-80 rounded-sm overflow-hidden border border-dark/10">
          <iframe
            title="Vị trí văn phòng Tân Minh Nhân"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.6897623929062!2d108.24456827589188!3d16.02965744049452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142175af0706bff%3A0x185f7d5651d72061!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gWMOieSBk4buxbmcgS2nhur9uIHRyw7pjIFTDom4gTWluaCBOaMOibg!5e0!3m2!1svi!2s!4v1784776803513!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
