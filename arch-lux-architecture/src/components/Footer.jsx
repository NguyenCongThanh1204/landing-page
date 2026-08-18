import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 border-t-2 border-accent select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="group inline-flex flex-col items-center text-center mb-6">
  {/* Dòng 1: TÂN MINH NHÂN (Cỡ chữ nhỏ hơn, nằm trên) */}
  <span className="font-heading text-2xl sm:text-3xl font-bold tracking-widest text-white group-hover:text-accent transition-colors block">
    TÂN MINH NHÂN
  </span>
  
  {/* Dòng 2: Corporation (Nằm dưới, chính giữa) */}
  <span className="text-xs sm:text-sm font-light uppercase tracking-[0.4em] text-accent block mt-1">
    Corporation
  </span>
</Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-8 font-light">
                Chúng tôi là một công ty kiến trúc và xây dựng, chuyên tạo ra những không gian sống và làm việc độc đáo, kết hợp giữa thẩm mỹ và chức năng. Với đội ngũ giàu kinh nghiệm, chúng tôi cam kết mang đến những giải pháp sáng tạo và bền vững cho khách hàng.
              </p>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold block">Vị trí văn phòng</span>
              <p className="text-xs font-semibold text-white/90 tracking-widest uppercase">Đà Nẵng • Hà Nam • Vũng Tàu • Phú Quốc...</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-6">Điều hướng</h4>
            <ul className="space-y-3 text-xs font-medium text-white/80">
              <li><Link to="/" className="hover:text-accent transition-colors">Trang chủ</Link></li>
              <li><Link to="/Gioi-thieu" className="hover:text-accent transition-colors">Giới thiệu</Link></li>
              <li><Link to="/Dich-vu" className="hover:text-accent transition-colors">Dịch vụ</Link></li>
              <li><Link to="/Du-an" className="hover:text-accent transition-colors">Dự án</Link></li>
              <li><Link to="/Lien-he" className="hover:text-accent transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Social Network */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-6">Social</h4>
            <ul className="space-y-3 text-xs font-medium text-white/80">
             <li>
                <a href="#facebook" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                  Facebook <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#instagram" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                  Instagram <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#linkedin" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                  LinkedIn <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#behance" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                  Behance <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-6">Newsletter</h4>
            <p className="text-xs text-white/70 mb-4 font-light">Subscribe for selected architectural publications.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex border-b border-white/30 focus-within:border-accent transition-colors pb-1">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent text-xs py-2 w-full text-white placeholder-white/40 focus:outline-none"
              />
              <button 
                type="submit" 
                className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors px-2"
              >
                Join
              </button>
            </form>
          </div> */}

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[11px] text-white/50 font-light">
          <p>© 2026 Your Company. All Rights Reserved.</p>
          
        </div>

      </div>
    </footer>
  );
}