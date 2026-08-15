import React from 'react';
import { PortableText } from '@portabletext/react';
import { Info, AlertCircle, Bookmark } from 'lucide-react';

// 🎯 CẤU HÌNH HIỂN THỊ NỘI DUNG TỪ BLOCKCONTENT (BODY)
const portableTextComponents = {
  types: {
    // 1. Xử lý Ảnh đơn chèn trực tiếp trong nội dung Body
    image: ({ value }) => {
      if (!value?.asset?.url && !value?.url) return null;
      const imageUrl = value.asset?.url || value.url;

      return (
        <figure className="my-8 flex flex-col items-center justify-center w-full">
          <img
            src={imageUrl}
            alt={value.caption || 'Hình ảnh bài viết'}
            className="max-w-full h-auto object-cover rounded-sm shadow-md"
            loading="lazy"
          />
          {/* Căn giữa tự động, chữ nhỏ, in nghiêng nếu CÓ Caption */}
          {value.caption && (
            <figcaption className="mt-2.5 text-xs sm:text-sm text-slate-500 italic text-center font-light tracking-wide max-w-3xl px-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // 2. Xử lý KHUNG CHÚ Ý (Callout Box) trong Body
    callout: ({ value }) => {
      if (!value?.text) return null;

      const styles = {
        info: {
          bg: 'bg-blue-50 border-blue-500 text-blue-900',
          icon: <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />,
          title: 'THÔNG TIN',
        },
        warning: {
          bg: 'bg-red-50 border-[#EB323A] text-red-900',
          icon: <AlertCircle className="text-[#EB323A] shrink-0 mt-0.5" size={20} />,
          title: 'CHÚ Ý QUAN TRỌNG',
        },
        note: {
          bg: 'bg-amber-50 border-amber-500 text-amber-900',
          icon: <Bookmark className="text-amber-600 shrink-0 mt-0.5" size={20} />,
          title: 'GHI CHÚ',
        },
      };

      const currentStyle = styles[value.type] || styles.info;

      return (
        <div className={`my-6 p-4 md:p-5 border-l-4 rounded-r-sm ${currentStyle.bg} flex items-start gap-3 shadow-sm`}>
          {currentStyle.icon}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              {currentStyle.title}
            </span>
            <p className="text-sm font-normal leading-relaxed">{value.text}</p>
          </div>
        </div>
      );
    },
  },
};

export default function PostDetail({ post }) {
  if (!post) return null;

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* Tiêu đề bài viết */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
        {post.title}
      </h1>

      {/* 🎯 1. BỨC ẢNH CHÍNH (MAIN IMAGE) + CAPTION */}
      {post.mainImage?.url && (
        <figure className="my-8 flex flex-col items-center justify-center w-full">
          <img
            src={post.mainImage.url}
            alt={post.mainImage.caption || post.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-sm shadow-md"
          />
          {post.mainImage.caption && (
            <figcaption className="mt-3 text-xs sm:text-sm text-slate-500 italic text-center font-light tracking-wide max-w-2xl px-4">
              {post.mainImage.caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* 🎯 2. BỘ SƯU TẬP NHIỀU ẢNH (GALLERY) */}
      {post.gallery && post.gallery.length > 0 && (
        <div className="my-10 space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#EB323A] font-bold border-b border-slate-200 pb-2">
            Bộ sưu tập hình ảnh
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.gallery.map((item, index) => (
              <figure key={index} className="flex flex-col items-center justify-center w-full group">
                <div className="overflow-hidden rounded-sm shadow-sm w-full bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.caption || `Ảnh gallery ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-xs text-slate-500 italic text-center font-light px-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* 🎯 3. NỘI DUNG CHÍNH (BODY) */}
      <div className="prose prose-slate max-w-none text-[#0F172A] leading-relaxed">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </article>
  );
}