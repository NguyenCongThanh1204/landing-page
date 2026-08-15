import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

const stats = [
  { value: 15, suffix: '', label: 'NĂM HOẠT ĐỘNG' },
  { value: 800, suffix: '+', label: 'NHÂN SỰ' },
  { value: 4000, suffix: 'tỷ', label: 'DOANH THU (NĂM 2025)' },
  { value: 19500, suffix: 'tỷ', label: 'DOANH THU DỰ KIẾN' },
];

export default function Statistics() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-subtle text-dark border-y border-borderDark/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-dark mb-2">
                {isInView ? (
                  <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-dark/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}