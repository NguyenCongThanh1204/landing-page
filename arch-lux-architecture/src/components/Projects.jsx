import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom'; // 📌 ĐÃ BỔ SUNG: Import Link từ react-router-dom
import { client } from '../sanityClient';

// CẤU HÌNH GIỚI HẠN SỐ LƯỢNG HÌNH HIỂN THỊ
const ALL_LIMIT = 6;       // Tab "All" chỉ hiện 6 cái mới nhất
const LOCATION_LIMIT = 4;  // Các tab vị trí chỉ hiện 4 cái

// Câu truy vấn GROQ lấy dự án từ Sanity Studio
const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  location,
  completionDate,
  "image": thumbnail.asset->url
}`;

export default function Projects({ isLightPageProp }) {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const location = useLocation();

  // Fetch dữ liệu từ Sanity khi Component mount
  useEffect(() => {
    client
      .fetch(PROJECTS_QUERY)
      .then((data) => {
        setProjectsData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải dữ liệu từ Sanity:', err);
        setLoading(false);
      });
  }, []);

  // Tự động nhận biết Light / Dark mode
  const isLightPage = isLightPageProp ?? location.pathname.startsWith('/Du-an');

  // Lấy danh sách Vị trí tự động từ Sanity làm Filter
  const locationsList = Array.from(
    new Set(projectsData.map((p) => p.location).filter(Boolean))
  );
  const categories = ['All', ...locationsList];

  // LOGIC LỌC VÀ GIỚI HẠN DỰ ÁN
  const getFilteredProjects = () => {
    if (activeFilter === 'All') {
      return projectsData.slice(0, ALL_LIMIT);
    } else {
      return projectsData
        .filter((p) => p.location === activeFilter)
        .slice(0, LOCATION_LIMIT);
    }
  };

  const displayedProjects = getFilteredProjects();

  // Class màu sắc linh hoạt theo Light / Dark Mode
  const sectionBg = isLightPage ? 'bg-white text-slate-900' : 'bg-dark text-light';
  const filterBorder = isLightPage ? 'border-slate-200' : 'border-borderDark';
  const filterInactiveText = isLightPage ? 'text-slate-500 hover:text-slate-900' : 'text-muted hover:text-light';

  return (
    <section 
      id="projects" 
      className={`py-20 transition-colors duration-500 ${sectionBg}`}
      style={isLightPage ? { backgroundColor: '#ffffff' } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Filter Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            {/* <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium block mb-3">
              Selected Works
            </span> */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light">
              Dự án <span className="italic text-accent">tiêu biểu</span>
            </h2>
          </div>

          {/* Filter Bar */}
          <div className={`flex flex-wrap gap-2 md:gap-4 border-b ${filterBorder} pb-4`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 relative cursor-pointer ${
                  activeFilter === cat ? 'text-accent font-semibold' : filterInactiveText
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Trạng thái Loading */}
        {loading ? (
          <div className="py-20 text-center font-mono text-sm opacity-60">
            Đang tải dữ liệu từ Sanity...
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-light">
            Không có dự án nào thuộc khu vực này.
          </div>
        ) : (
          /* Grid danh sách dự án */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedProjects.map((project) => {
                const yearFormatted = project.completionDate
                  ? new Date(project.completionDate).getFullYear()
                  : '';
                
                // Xác định đường dẫn chi tiết dựa theo slug hoặc _id
                const projectPath = `/Du-an/${project.slug || project._id}`;

                return (
                  <motion.div
                    layout
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="group relative overflow-hidden bg-borderDark/30 rounded-sm cursor-pointer"
                  >
                    {/* 📌 BỌC LINK ĐỂ NỔI BẬT KHẢ NĂNG CHUYỂN TRANG */}
                    <Link to={projectPath} className="block w-full h-full">
                      {/* Image Container with Zoom Effect */}
                      <div className="aspect-[3/4] overflow-hidden relative">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                            [ Chưa có ảnh ]
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase tracking-[0.25em] bg-dark/80 text-accent px-3 py-1 border border-accent/30">
                            {project.location || 'Dự án'}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-light/10 backdrop-blur-md flex items-center justify-center text-light opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight size={18} />
                          </div>
                        </div>

                        <div>
                          <span className="text-xs text-muted block mb-1">
                            📍 {project.location} {yearFormatted ? `— ${yearFormatted}` : ''}
                          </span>
                          <h3 className="font-heading text-2xl md:text-3xl text-light font-normal group-hover:text-accent transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}