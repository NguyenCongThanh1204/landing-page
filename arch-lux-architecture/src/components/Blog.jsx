import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Truy vấn 3 bài viết mới nhất từ Sanity
    const query = `*[_type == "post"] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      category,
      publishedAt,
      mainImage
    }`;

    client
      .fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy bài viết Sanity:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-32 bg-[#0F172A] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-white/10 pb-6 gap-4">
          {/* Tiêu đề góc trái */}
          <div>
            {/* <span className="text-xs uppercase tracking-[0.3em] text-[#EB323A] font-bold block mb-2">
              05 / Insights & Journal
            </span> */}
            <h2 className="font-heading text-4xl sm:text-5xl font-light">
              Bản tin <span className="italic text-[#EB323A]">Công ty</span>
            </h2>
          </div>

          {/* Nút Xem tất cả góc phải */}
          <Link
            to="/Tin-tuc"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-[#EB323A] font-bold transition-colors border border-white/20 hover:border-[#EB323A] px-5 py-3 rounded-sm group"
          >
            Xem tất cả
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Trạng thái Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#EB323A]" size={36} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            Chưa có bài viết nào được xuất bản.
          </div>
        ) : (
          /* Lưới Bài Viết */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/Tin-tuc/${post.slug?.current}`}
                className="group cursor-pointer block"
              >
                <article>
                  {/* Khung Ảnh */}
                  <div className="aspect-[16/10] overflow-hidden rounded-sm mb-6 bg-slate-800 border border-white/10">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(800).url()}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs uppercase">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Chuyên mục & Ngày tháng */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="text-[#EB323A] font-bold uppercase tracking-wider">
                      {post.category || "Tin tức"}
                    </span>
                    <span>•</span>
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
                        : "Mới nhất"}
                    </span>
                  </div>

                  {/* Tiêu đề */}
                  <h3 className="font-heading text-2xl font-normal text-white group-hover:text-[#EB323A] transition-colors leading-snug mb-4 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Link Xem Bài */}
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white group-hover:text-[#EB323A] font-bold transition-colors">
                    Xem chi tiết <ArrowUpRight size={14} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
