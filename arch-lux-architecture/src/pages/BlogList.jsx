import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Loader2, Search, Calendar, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../sanityClient';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt,
      "categoryName": categories[0]->title,
      "allCategories": categories[]->title
    }`;

    client
      .fetch(query)
      .then((data) => {
        setPosts(data);
        if (data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          setFeaturedPost(sorted[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi lấy danh sách bài viết:', err);
        setLoading(false);
      });
  }, []);

  // 1. Sắp xếp thời gian đăng bài gần nhất lên trên
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return timeB - timeA;
    });
  }, [posts]);

  // 2. Tạo danh sách nút bấm Lọc chuyên mục chuẩn
  const filterCategories = useMemo(() => {
    const preset = ['Tất cả', 'Tin Công Ty', 'Tin Công Trình'];
    const dynamic = [];

    posts.forEach((p) => {
      if (p.allCategories) {
        p.allCategories.forEach((cat) => cat && dynamic.push(cat));
      } else if (p.categoryName) {
        dynamic.push(p.categoryName);
      }
    });

    return Array.from(new Set([...preset, ...dynamic]));
  }, [posts]);

  // 🔄 Chuẩn hóa chuỗi so sánh không lo viết hoa/thường hay dấu tiếng Việt
  const normalizeText = (str) => {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  // 3. LOGIC LỌC CHUẨN XÁC DỰA TRÊN REFERENCE CATEGORIES
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      // 1. Kiểm tra Lọc theo danh mục
      let matchesCategory = false;
      if (selectedCategory === 'Tất cả' || selectedCategory === 'All') {
        matchesCategory = true;
      } else {
        const targetSlug = normalizeText(selectedCategory);

        // Kiểm tra xem danh mục được chọn có nằm trong mảng allCategories của bài viết không
        if (post.allCategories && Array.isArray(post.allCategories)) {
          matchesCategory = post.allCategories.some((catTitle) =>
            normalizeText(catTitle).includes(targetSlug) || targetSlug.includes(normalizeText(catTitle))
          );
        } else if (post.categoryName) {
          const catSlug = normalizeText(post.categoryName);
          matchesCategory = catSlug.includes(targetSlug) || targetSlug.includes(catSlug);
        }
      }

      // 2. Kiểm tra Tìm kiếm theo từ khóa
      const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [sortedPosts, selectedCategory, searchTerm]);

  // Tự động cập nhật bài Featured
  useEffect(() => {
    if (filteredPosts.length > 0) {
      setFeaturedPost(filteredPosts[0]);
    } else {
      setFeaturedPost(null);
    }
  }, [selectedCategory, searchTerm, filteredPosts]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Mới cập nhật';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        

        {/* Search & Categories Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8 bg-white p-3.5 border border-slate-200 shadow-xs rounded-sm">
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#EB323A] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterCategories.map((cat) => {
              const isActive =
                selectedCategory === cat ||
                (selectedCategory === 'All' && cat === 'Tất cả');

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'Tất cả' ? 'All' : cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#EB323A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Render Bài Viết */}
        {loading ? (
          <div className="flex justify-center items-center py-32 bg-white border border-slate-200">
            <Loader2 className="animate-spin text-[#EB323A]" size={36} />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white border border-dashed border-slate-200 rounded-sm">
            <p className="text-base mb-2">Chưa có bài viết nào thuộc chuyên mục này.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold uppercase tracking-wider text-[#EB323A] underline cursor-pointer"
            >
              Xem tất cả bài viết
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* CỘT TRÁI - FEATURED */}
            {featuredPost && (
              <div className="lg:col-span-7 bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredPost._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col"
                  >
                    <Link to={`/Tin-tuc/${featuredPost.slug?.current}`} className="group block mb-4">
                      <div className="relative w-full h-[280px] sm:h-[360px] overflow-hidden bg-slate-100 rounded-xs">
                        {featuredPost.mainImage ? (
                          <img
                            src={urlFor(featuredPost.mainImage).width(1000).url()}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs uppercase">
                            No Image
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                      <span className="inline-flex items-center gap-1 text-[#EB323A] font-semibold uppercase tracking-wider">
                        <Tag size={12} /> {featuredPost.categoryName || featuredPost.allCategories?.[0] || 'Tin tức'}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-mono text-slate-500">
                        <Calendar size={12} className="text-slate-400" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                    </div>

                    <Link to={`/Tin-tuc/${featuredPost.slug?.current}`}>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug hover:text-[#EB323A] transition-colors">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    {featuredPost.excerpt && (
                      <p className="text-slate-600 text-sm leading-relaxed font-normal mb-5 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div>
                      <Link
                        to={`/Tin-tuc/${featuredPost.slug?.current}`}
                        className="inline-flex items-center gap-2 bg-[#EB323A] hover:bg-[#c82229] text-white font-semibold text-xs uppercase px-5 py-2.5 transition-all shadow-xs rounded-xs"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* CỘT PHẢI - SCROLLABLE LIST */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-4 sm:p-5 shadow-xs">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Lượt xem nhiều nhất ({filteredPosts.length})</span>
                <Clock size={14} className="text-[#EB323A]" />
              </div>

              <div
                data-lenis-prevent="true"
                className="max-h-[540px] overflow-y-auto overscroll-contain touch-pan-y pr-1 space-y-3 custom-scrollbar"
              >
                {filteredPosts.map((post) => {
                  const isSelected = featuredPost?._id === post._id;

                  return (
                    <div
                      key={post._id}
                      onClick={() => setFeaturedPost(post)}
                      className={`flex gap-3.5 p-2 rounded-xs transition-all duration-200 cursor-pointer group border-b border-slate-100 last:border-b-0 ${
                        isSelected 
                          ? 'bg-slate-50 border-l-4 border-l-[#EB323A]' 
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden bg-slate-100 rounded-xs">
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(300).url()}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px]">
                            NO IMAGE
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <h3 className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 transition-colors ${
                          isSelected ? 'text-[#EB323A]' : 'text-slate-800 group-hover:text-[#EB323A]'
                        }`}>
                          {post.title}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400 mt-1">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}