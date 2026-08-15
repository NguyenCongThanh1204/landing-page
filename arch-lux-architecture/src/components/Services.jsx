import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, Building2, HardHat, Layers, Sparkles } from 'lucide-react';

const services = [
  { icon: Compass, title: 'Xây dựng dân dụng & công nghiệp', desc: 'Tổng thầu thi công khách sạn, resort, nhà máy.' },
  { icon: Home, title: 'Thiết kế & thi công nội - ngoại thất', desc: 'Hoàn thiện trần, tường, sàn và đồ gỗ cao cấp.' },
  { icon: Building2, title: 'Sản xuất & lắp đặt nhôm kính', desc: 'Cung cấp cửa, vách kính, mặt dựng tòa nhà.' },
  { icon: HardHat, title: 'Gia công & thi công đá ốp lát', desc: 'Ốp đá tự nhiên/nhân tạo cho sảnh, mặt tiền.' },
  { icon: Layers, title: 'Thi công cơ khí công trình', desc: 'Lắp đặt kết cấu thép, hệ khung và cấu kiện phụ trợ.' },
  { icon: Sparkles, title: 'Xây dựng cảnh quan & hạ tầng', desc: ' Làm đường nội khu, cây xanh, tiểu cảnh bên ngoài.' },
];

export default function Services() {
  return (
    <section className="py-32 bg-light text-dark relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-borderLight pb-8">
          <div>
            {/* <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-3">
              Our Expertise
            </span> */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-navy">
              Lĩnh vực <span className="italic text-accent">hoạt động</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md mt-4 md:mt-0 font-normal">
            Công ty Tân Minh Nhân không ngừng cách tân, và có hướng đi cho riêng mình để 
            phấn đấu trở thành một trong những nhà thầu chuyên nghiệp và lớn mạnh cả trong và ngoài nước.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-subtle border border-borderLight hover:border-navy/40 p-10 rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-sm bg-navy/10 flex items-center justify-center mb-8 text-navy group-hover:bg-navy group-hover:text-light transition-all duration-500">
                  <Icon size={26} className="transition-transform duration-500 group-hover:rotate-12" />
                </div>

                <h3 className="font-heading text-2xl font-normal text-navy mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed font-normal">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}