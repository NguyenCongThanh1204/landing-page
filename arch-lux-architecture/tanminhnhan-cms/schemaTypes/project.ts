import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Dự án',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên dự án',
      type: 'string',
      validation: (Rule) => Rule.required().error('Vui lòng nhập tên dự án'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Vị trí / Địa điểm',
      type: 'string',
      validation: (Rule) => Rule.required().error('Vui lòng nhập vị trí dự án'),
    }),
    defineField({
      name: 'completionDate',
      title: 'Thời gian hoàn thành',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM', // Hiển thị dạng Năm-Tháng (hoặc có thể dùng YYYY nếu chỉ cần năm)
      },
      description: 'Chọn thời gian/năm hoàn thành công trình',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Hình ảnh dự án',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Vui lòng tải ảnh dự án'),
    }),
    defineField({
      name: 'gallery',
      title: 'Hình ảnh chi tiết dự án',
      type: 'array',
      description: 'Có thể tải lên nhiều ảnh chi tiết để hiển thị trong trang chi tiết dự án.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Chú thích ảnh',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết dự án',
      type: 'blockContent', // Sử dụng blockContent có sẵn trong schemaTypes của bạn để soạn thảo văn bản Rich Text
      description: 'Mô tả chi tiết bài viết dự án (dành cho phát triển sau)',
    }),
  ],
});