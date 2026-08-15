import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "Ông là người mạnh mẽ, quyết đoán và có tầm nhìn rộng, đặc biệt luôn coi trọng chữ tín trong kinh doanh. Ông đã đào tạo và phát triển đội ngũ nhân sự trong công ty vừa tinh vừa chất. Ông chính là người xây dựng và định hình văn hóa Tân Minh Nhân",
    author: "Nhan Văn Chiến",
    role: "Chủ tịch hội đồng quản trị",
    avatar: "https://www.tanminhnhan.com.vn/images/persons/nhan-van-chien.jpg",
    rating: 5,
  },
  {
    quote: "Bà là người đồng hành cùng Tân Minh Nhân trong suốt quá trình phát triển, luôn đưa ra những quyết định đúng đắn và sáng suốt. Bà là người có tầm nhìn chiến lược và luôn đặt lợi ích của công ty lên hàng đầu.",
    author: "Nguyễn Thị Thu Phượng",
    role: "Phó chủ tịch hội đồng quản trị",
    avatar: "https://www.tanminhnhan.com.vn/images/persons/nguyen-thi-thu-phuong.jpg",
    rating: 5,
  },
  // {
  //   quote: "Their commitment to zero-carbon engineering paired with avant-garde form makes AURA our preferred partner for sustainable luxury developments.",
  //   author: "Marcus Vance",
  //   role: "Director, Apex Development Group",
  //   avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  //   rating: 5,
  // },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white text-navy relative border-y border-borderLight">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <Quote size={48} className="text-accent/20 mx-auto mb-4" />
          {/* <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-2">
            Endorsements
          </span> */}
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-navy">
            Lãnh đạo <span className="italic text-accent">Công ty</span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="pb-16"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
                {/* Đánh giá sao màu Đỏ */}
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent" />
                  ))}
                </div>

                <p className="font-heading text-2xl md:text-3xl font-light italic text-navy/90 leading-relaxed mb-8">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-navy">{item.author}</h4>
                    <p className="text-xs text-muted font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}