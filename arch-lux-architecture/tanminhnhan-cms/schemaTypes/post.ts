import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    
    // 🎯 1. ẢNH CHÍNH (CÓ THÊM TRƯỜNG CAPTION KHÔNG BẮT BUỘC)
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Ghi chú dưới ảnh (Caption)',
          description: 'Hiển thị chữ nhỏ, in nghiêng và căn giữa dưới ảnh',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Thẻ Alt (Mô tả SEO)',
        },
      ],
    }),

    // 🎯 2. THÊM MỤC BỘ SƯU TẬP (ĐĂNG ĐƯỢC NHIỀU ẢNH CÙNG LÚC + CAPTION TỪNG ẢNH)
    defineField({
      name: 'gallery',
      title: 'Bộ sưu tập ảnh (Gallery)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Ghi chú dưới ảnh (Caption)',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Thẻ Alt',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField( {
  name: 'views',
  title: 'Lượt xem',
  type: 'number',
  initialValue: 0,
  readOnly: true,
}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})