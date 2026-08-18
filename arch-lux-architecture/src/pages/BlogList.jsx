import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Loader2, 
  Search, 
  Calendar, 
  Eye, 
  Tag, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../sanityClient';

const POSTS_PER_PAGE = 12; // 12 bài/trang (chia đều lưới 3 hoặc 4 cột)

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt,
      views,
      "categoryName": categories[0]->title,
      "allCategories": categories[]->title
    }`;

    client
      .fetch(query)
      .then((data) => {
        setPosts(data || []);
        if (data && data.length > 0) {
          const sortedByTime = [...data].sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          setFeaturedPost(sortedByTime[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi lấy danh sách bài viết:', err);
        setLoading(false);
      });
  }, []);

  // Lấy Top 4 bài nhiều lượt xem nhất để cân bằng chiều cao với Featured Post
  const topViewedPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 6);
  }, [posts]);

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

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      let matchesCategory = false;
      if (selectedCategory === 'Tất cả' || selectedCategory === 'All') {
        matchesCategory = true;
      } else {
        const targetSlug = normalizeText(selectedCategory);
        if (post.allCategories && Array.isArray(post.allCategories)) {
          matchesCategory = post.allCategories.some((catTitle) =>
            normalizeText(catTitle).includes(targetSlug) || targetSlug.includes(normalizeText(catTitle))
          );
        } else if (post.categoryName) {
          const catSlug = normalizeText(post.categoryName);
          matchesCategory = catSlug.includes(targetSlug) || targetSlug.includes(catSlug);
        }
      }

      const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    if (filteredPosts.length > 0) {
      const nextFeatured = filteredPosts[0];
      setFeaturedPost((prev) => {
        if (!prev) return nextFeatured;
        const synced = filteredPosts.find((post) => post._id === prev._id) || nextFeatured;
        return synced;
      });
    } else {
      setFeaturedPost(null);
    }
  }, [selectedCategory, searchTerm, filteredPosts]);

  useEffect(() => {
    if (!posts.length) return;

    setFeaturedPost((prev) => {
      if (!prev) {
        const sortedByTime = [...posts].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        return sortedByTime[0] || null;
      }

      const matched = posts.find((post) => post._id === prev._id);
      return matched || prev;
    });
  }, [posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

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
        
        {/* THANH TÌM KIẾM & BỘ LỌC */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8 bg-white p-3.5 border border-slate-200 shadow-xs rounded-sm">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#EB323A] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterCategories.map((cat) => {
              const isActive =
                selectedCategory === cat || (selectedCategory === 'All' && cat === 'Tất cả');

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

        {/* NỘI DUNG CHÍNH */}
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
          <>
            {/* KHU VỰC TOP: CÂN BẰNG TỈ LỆ 8:4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
              
              {/* CỘT TRÁI: FEATURED POST (Rộng 8/12, ảnh to hơn) */}
              {featuredPost && (
                <div className="lg:col-span-8 bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featuredPost._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col h-full justify-between"
                    >
                      <div>
                        <Link 
                          to={`/Tin-tuc/${featuredPost.slug?.current}`} 
                          className="group block mb-4"
                        >
                          <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[420px] overflow-hidden bg-slate-100 rounded-xs">
                            {featuredPost.mainImage ? (
                              <img
                                src={urlFor(featuredPost.mainImage).width(1600).quality(85).url()}
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

                        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500 mb-3">
                          <span className="inline-flex items-center gap-1 text-[#EB323A] font-semibold uppercase tracking-[0.12em]">
                            <Tag size={12} /> {featuredPost.categoryName || featuredPost.allCategories?.[0] || 'Tin tức'}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="inline-flex items-center gap-1 font-medium">
                            <Calendar size={12} className="text-slate-400" />
                            {formatDate(featuredPost.publishedAt)}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="inline-flex items-center gap-1 font-medium">
                            <Eye size={13} className="text-slate-400" />
                            {(featuredPost.views || 0).toLocaleString()} lượt xem
                          </span>
                        </div>

                        <Link 
                          to={`/Tin-tuc/${featuredPost.slug?.current}`}
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-snug tracking-[-0.02em] hover:text-[#EB323A] transition-colors">
                            {featuredPost.title}
                          </h2>
                        </Link>

                        {featuredPost.excerpt && (
                          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal mb-5 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        )}
                      </div>

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

              {/* CỘT PHẢI: TOP 4 BÀI XEM NHIỀU (Rộng 4/12, vừa khít chiều cao) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-[0.12em] pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Lượt xem nhiều nhất</span>
                    <Eye size={15} className="text-[#EB323A]" />
                  </div>

                  <div className="divide-y divide-slate-100">
                    {topViewedPosts.map((post, index) => (
                      <Link
                        key={post._id}
                        to={`/Tin-tuc/${post.slug?.current}`}
                        className="flex gap-3 py-3.5 first:pt-1.5 last:pb-0 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="relative w-20 h-16 sm:w-24 sm:h-18 shrink-0 overflow-hidden bg-slate-100 rounded-xs">
                          <span className="absolute top-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs z-10">
                            #{index + 1}
                          </span>
                          {post.mainImage ? (
                            <img
                              src={urlFor(post.mainImage).width(600).quality(80).url()}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-[9px]">
                              NO IMAGE
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <h3 className="text-[15px] sm:text-base font-semibold leading-snug line-clamp-2 text-slate-800 group-hover:text-[#EB323A] transition-colors">
                              {post.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                            <span>{formatDate(post.publishedAt)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-[#EB323A] font-semibold">
                              <Eye size={10} /> {(post.views || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* KHU VỰC DƯỚI: DANH SÁCH BÀI VIẾT (GRID 3 CỘT ĐỀU ĐẸP) */}
            <div className="border-t border-slate-200 pt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-[0.08em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#EB323A] inline-block" />
                  Danh Sách Bài Viết ({filteredPosts.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white border border-slate-200/90 rounded-xs overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    <Link
                      to={`/Tin-tuc/${post.slug?.current}`}
                      className="block relative h-48 overflow-hidden bg-slate-100"
                    >
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(1000).quality(85).url()}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs uppercase">
                          No Image
                        </div>
                      )}
                      <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs">
                        {post.categoryName || post.allCategories?.[0] || 'Tin tức'}
                      </span>
                    </Link>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-slate-400 mb-2.5">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span className="flex items-center gap-1 text-[#EB323A]">
                            <Eye size={12} /> {(post.views || 0).toLocaleString()}
                          </span>
                        </div>
                        <Link
                          to={`/Tin-tuc/${post.slug?.current}`}
                        >
                          <h4 className="text-sm sm:text-[18px] font-bold text-slate-900 leading-snug tracking-[-0.01em] line-clamp-2 group-hover:text-[#EB323A] transition-colors mb-2">
                            {post.title}
                          </h4>
                        </Link>
                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          to={`/Tin-tuc/${post.slug?.current}`}
                          className="text-[11px] font-bold uppercase tracking-wider text-[#EB323A] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                        >
                          <span>Đọc tiếp</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PHÂN TRANG */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 bg-white rounded-xs text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 text-xs font-bold rounded-xs transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#EB323A] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 bg-white rounded-xs text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </section>
  );
}