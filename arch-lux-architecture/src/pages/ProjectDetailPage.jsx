import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import {
  Building2,
  MapPin,
  Calendar,
  ArrowLeft,
  Maximize2,
  X,
  ChevronRight,
  PhoneCall,
  Loader2,
  Info,
  Bookmark,
  AlertCircle,
} from 'lucide-react';
import { client, urlFor } from '../sanityClient';

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  location,
  completionDate,
  "slug": slug.current,
  "mainImage": thumbnail,
  "gallery": gallery[] {
    ...,
    asset->{
      _id,
      url
    }
  },
  content
}`;

const RELATED_PROJECTS_QUERY = `*[_type == "project" && slug.current != $slug] | order(_createdAt desc) [0...6]{
  _id,
  title,
  location,
  completionDate,
  "slug": slug.current,
  "mainImage": thumbnail
}`;

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <figure className="my-8 flex flex-col items-center justify-center w-full">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm w-full">
            <img
              src={urlFor(value).width(1200).url()}
              alt={value.alt || value.caption || 'Hình ảnh dự án'}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs sm:text-sm text-slate-500 mt-3 italic font-light tracking-wide px-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      if (!value?.text) return null;

      const styles = {
        info: {
          bg: 'bg-blue-50 border-blue-500 text-blue-900',
          icon: <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />,
          title: 'Thông tin',
        },
        warning: {
          bg: 'bg-red-50 border-[#EB323A] text-red-900',
          icon: <AlertCircle className="text-[#EB323A] shrink-0 mt-0.5" size={20} />,
          title: 'Lưu ý',
        },
        note: {
          bg: 'bg-amber-50 border-amber-500 text-amber-900',
          icon: <Bookmark className="text-amber-600 shrink-0 mt-0.5" size={20} />,
          title: 'Ghi chú',
        },
      };

      const currentStyle = styles[value.type] || styles.info;

      return (
        <div className={`my-8 p-4 md:p-5 border-l-4 rounded-r-2xl ${currentStyle.bg} flex items-start gap-3 shadow-sm`}>
          {currentStyle.icon}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              {currentStyle.title}
            </span>
            <p className="text-sm md:text-base font-normal leading-relaxed m-0 text-slate-800">
              {value.text}
            </p>
          </div>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl sm:text-3xl text-slate-900 font-normal mt-12 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl sm:text-2xl text-slate-800 font-normal mt-10 mb-4 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-700 font-light text-base sm:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#EB323A] pl-6 italic text-slate-600 my-8 text-lg sm:text-xl font-light">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside space-y-3 text-slate-700 font-light text-base sm:text-lg mb-8 pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside space-y-3 text-slate-700 font-light text-base sm:text-lg mb-8 pl-5">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-[#EB323A] underline hover:no-underline transition-all">
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const galleryScrollRef = useRef(null);

  const normalizeGallery = (gallery) => {
    if (!Array.isArray(gallery) || gallery.length === 0) {
      return [];
    }

    return gallery
      .map((item) => {
        if (!item) return '';
        if (typeof item === 'string') return item;

        const imageUrl = item.asset ? urlFor(item.asset).width(1600).url() : '';
        return imageUrl || '';
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const container = galleryScrollRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      const isScrollable = container.scrollHeight > container.clientHeight;
      if (!isScrollable) return;

      const delta = event.deltaY || event.deltaX || 0;
      if (delta === 0) return;

      event.preventDefault();
      event.stopPropagation();
      container.scrollTop += delta;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [project?.gallery?.length]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    Promise.all([
      client.fetch(PROJECT_QUERY, { slug }),
      client.fetch(RELATED_PROJECTS_QUERY, { slug }),
    ])
      .then(([data, related]) => {
        if (!data) {
          setProject(null);
          setRelatedProjects([]);
          setLoading(false);
          return;
        }

        const mainImage = data.mainImage ? urlFor(data.mainImage).width(1600).url() : '';
        const detailImages = normalizeGallery(data.gallery);
        const galleryImages = detailImages.length > 0
          ? [mainImage, ...detailImages.filter((img) => img !== mainImage)].filter(Boolean)
          : [];

        setProject({
          ...data,
          mainImage,
          gallery: galleryImages,
        });
        setSelectedImage(mainImage || galleryImages[0] || '');
        setRelatedProjects(
          (related || []).map((item) => ({
            ...item,
            mainImage: item.mainImage ? urlFor(item.mainImage).width(900).url() : '',
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dự án từ Sanity:', error);
        setProject(null);
        setRelatedProjects([]);
        setLoading(false);
      });
  }, [slug]);

  const openLightbox = (imgUrl) => {
    if (!imgUrl) return;
    setLightboxImg(imgUrl);
    setLightboxOpen(true);
  };

  const formatDate = (value) => {
    if (!value) return 'Chưa cập nhật';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#EB323A]" size={40} />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] text-slate-900 py-32 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-heading mb-6 font-light">Không tìm thấy dự án!</h2>
          <p className="text-slate-600 mb-10 text-lg">
            Dự án này có thể chưa được cập nhật trên Sanity hoặc đường dẫn đã thay đổi.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 text-sm uppercase tracking-widest text-white bg-[#EB323A] font-bold border border-[#EB323A] px-8 py-4 hover:bg-white hover:text-[#EB323A] transition-all duration-300 rounded-sm shadow-md"
          >
            <ArrowLeft size={18} /> Quay lại danh sách dự án
          </Link>
        </div>
      </section>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : project.mainImage ? [project.mainImage] : [];
  const activeImage = selectedImage || project.mainImage || '';

  return (
    <div className="pt-20 sm:pt-24 bg-[#F8FAFC] text-[#0F172A] min-h-screen relative select-none">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pb-20">
        <div className="flex items-center justify-between py-6 border-b border-slate-200/80 mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#EB323A] transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại danh sách dự án
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Dự án</span>
            <ChevronRight size={14} />
            <span className="text-[#0F172A] font-bold truncate max-w-[200px]">{project.title}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB323A] bg-red-50 px-3 py-1 rounded-full border border-red-200 shadow-xs">
              Công trình
            </span>
            {project.completionDate && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {formatDate(project.completionDate)}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <MapPin size={16} className="text-[#EB323A] flex-shrink-0" />
            <span>{project.location || 'Chưa cập nhật vị trí'}</span>
          </div>
        </div>

        {project.mainImage && (
          <div className={`grid grid-cols-1 ${gallery.length > 0 ? 'lg:grid-cols-12' : ''} gap-4 mb-12`}>
            <div className={`${gallery.length > 0 ? 'lg:col-span-9' : ''} aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 relative group shadow-sm border border-slate-200/80`}>
              <img
                src={activeImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => openLightbox(activeImage)}
                className="absolute bottom-4 right-4 p-2.5 bg-black/60 hover:bg-[#EB323A] text-white rounded-xl backdrop-blur-sm transition-colors cursor-pointer"
                title="Phóng to ảnh"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {gallery.length > 0 && (
              <div
                ref={galleryScrollRef}
                className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[540px] pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
              >
                {gallery.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-24 sm:w-32 lg:w-full aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img
                        ? 'border-[#EB323A] shadow-md scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
              <h2 className="text-lg font-black uppercase tracking-tight text-[#0F172A] mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 size={20} className="text-[#EB323A]" />
                Tổng quan dự án
              </h2>
              <div className="text-slate-700">
                {project.content?.length ? (
                  <PortableText value={project.content} components={ptComponents} />
                ) : (
                  <p className="text-slate-500 italic">Nội dung dự án đang được cập nhật.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-28 z-20 self-start space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 mb-4">
                Thông tin dự án
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Vị trí</span>
                  <span className="font-bold text-[#0F172A] text-sm">{project.location || 'Chưa cập nhật'}</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Thời gian hoàn thành</span>
                  <span className="font-bold text-[#0F172A]">{formatDate(project.completionDate)}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-slate-600">
                  <Calendar size={16} className="text-[#EB323A]" />
                  <span>{project.completionDate ? new Date(project.completionDate).getFullYear() : 'Chưa rõ'}</span>
                </div>
              </div>

              {/* <div className="mt-6 pt-5 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="w-full py-3 bg-[#EB323A] hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <PhoneCall size={15} /> Liên hệ hợp tác dự án
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase tracking-tight">
                Dự án khác
              </h3>
              <Link
                to="/projects"
                className="text-xs font-bold uppercase tracking-wider text-[#EB323A] hover:text-red-700"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="overflow-x-auto pb-3 no-scrollbar">
              <div className="flex gap-5 min-w-max">
                {relatedProjects.map((item) => (
                  <Link
                    key={item._id}
                    to={`/projects/${item.slug}`}
                    className="group block w-[280px] sm:w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                      {item.mainImage ? (
                        <img
                          src={item.mainImage}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-medium">
                          Chưa có hình ảnh
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#EB323A]">
                          {item.location || 'Dự án'}
                        </span>
                        {item.completionDate && (
                          <span className="text-[10px] text-slate-500">
                            {new Date(item.completionDate).getFullYear()}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0F172A] line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-[#EB323A] text-white rounded-full transition-colors z-10 cursor-pointer"
              >
                <X size={18} />
              </button>
              <img src={lightboxImg} alt="Phóng to ảnh" className="w-full h-full object-contain" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>  
  );
}