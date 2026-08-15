import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  Tag,
  Info,
  AlertCircle,
  Bookmark,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../sanityClient";

// Tùy chỉnh cách render các thành phần trong PortableText
const ptComponents = {
  types: {
    // 1. Render Ảnh trong bài viết
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10 flex flex-col items-center justify-center w-full">
          <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-50 shadow-sm w-full">
            <img
              src={urlFor(value).width(1200).url()}
              alt={
                value.caption || value.alt || "Hình ảnh bài viết Tân Minh Nhân"
              }
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

    // 🎯 2. RENDER KHUNG CHÚ Ý (CALLOUT BOX) - Bổ sung phần này để hiện thông báo
    callout: ({ value }) => {
      if (!value?.text) return null;

      const styles = {
        info: {
          bg: "bg-blue-50 border-blue-500 text-blue-900",
          icon: <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />,
          // title: 'THÔNG TIN',
        },
        warning: {
          bg: "bg-red-50 border-[#EB323A] text-red-900",
          icon: (
            <AlertCircle className="text-[#EB323A] shrink-0 mt-0.5" size={20} />
          ),
          // title: 'CẢNH BÁO / LƯU Ý',
        },
        note: {
          bg: "bg-amber-50 border-amber-500 text-amber-900",
          icon: (
            <Bookmark className="text-amber-600 shrink-0 mt-0.5" size={20} />
          ),
          // title: 'GHI CHÚ',
        },
      };

      const currentStyle = styles[value.type] || styles.info;

      return (
        <div
          className={`my-8 p-4 md:p-5 border-l-4 rounded-r-sm ${currentStyle.bg} flex items-start gap-3 shadow-sm`}
        >
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
      <h2 className="font-heading text-3xl sm:text-4xl text-slate-900 font-normal mt-12 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl sm:text-3xl text-slate-800 font-normal mt-10 mb-4 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-700 font-light text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#EB323A] pl-6 italic text-slate-600 my-8 text-xl font-light">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside space-y-3 text-slate-700 font-light text-lg mb-8 pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside space-y-3 text-slate-700 font-light text-lg mb-8 pl-5">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#EB323A] underline hover:no-underline transition-all"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
  },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      "category": categories[0]->title,
      gallery[] {
        ...,
        caption,
        alt
      },
      body
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải bài viết:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Loader2 className="animate-spin text-[#EB323A]" size={40} />
      </section>
    );
  }

  if (!post) {
    return (
      <section
        className="min-h-screen bg-white text-slate-900 py-32 text-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h2 className="text-4xl font-heading mb-6 font-light">
          Không tìm thấy bài viết!
        </h2>
        <p className="text-slate-600 mb-10 text-lg">
          Bài viết có thể đã bị xóa, chuyển đường dẫn hoặc chưa được xuất bản.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-sm uppercase tracking-widest text-white bg-[#EB323A] font-bold border border-[#EB323A] px-8 py-4 hover:bg-white hover:text-[#EB323A] transition-all duration-300 rounded-sm shadow-md"
        >
          <ArrowLeft size={18} /> Quay lại Trang Chủ
        </Link>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen bg-white text-slate-900 pt-36 pb-28 border-b border-slate-100"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Nút Quay lại */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2.5 text-sm uppercase tracking-widest text-slate-500 hover:text-[#EB323A] font-bold transition-colors mb-12"
        >
          <ArrowLeft size={18} /> Quay lại
        </Link>

        {/* Thông tin Chuyên mục & Ngày tháng */}
        <div className="flex items-center gap-8 text-sm text-slate-600 mb-8 border-b border-slate-100 pb-8">
          <span className="inline-flex items-center gap-2 text-[#EB323A] font-bold uppercase tracking-wider">
            <Tag size={16} /> {post.category || "Tin tức"}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar size={16} />{" "}
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Vừa đăng"}
          </span>
        </div>

        {/* Tiêu đề bài viết */}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-slate-950 leading-snug mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* Ảnh đại diện chính */}
        {post.mainImage && (
          <figure className="mb-16 flex flex-col items-center justify-center w-full">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-sm border border-slate-100 shadow-xl bg-slate-50">
              <img
                src={urlFor(post.mainImage).width(1600).url()}
                alt={
                  post.mainImage.caption ||
                  `Ảnh đại diện bài viết: ${post.title}`
                }
                className="w-full h-full object-cover"
              />
            </div>
            {post.mainImage.caption && (
              <figcaption className="text-center text-xs sm:text-sm text-slate-500 mt-3 italic font-light tracking-wide max-w-2xl px-4">
                {post.mainImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Nội dung bài viết */}
        <div className="prose prose-slate prose-lg max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="italic text-slate-500 text-center py-10">
              Bài viết hiện chưa có nội dung chi tiết.
            </p>
          )}
        </div>

        {/* Bộ sưu tập nhiều ảnh */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#EB323A] font-bold">
              Bộ sưu tập hình ảnh
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.gallery.map((item, index) => (
                <figure
                  key={index}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-50 shadow-sm w-full aspect-[4/3]">
                    <img
                      src={urlFor(item).width(800).url()}
                      alt={item.caption || `Ảnh ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="text-center text-xs text-slate-500 mt-2.5 italic font-light px-2">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
