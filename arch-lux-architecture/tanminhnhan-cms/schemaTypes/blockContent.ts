import {defineType, defineArrayMember} from 'sanity'

/**
 * Đây là định nghĩa schema cho các trường rich text (nội dung chi tiết)
 * được sử dụng trong studio này. Nó có thể được tái sử dụng ở các schema khác với:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles cho phép người dùng chọn định dạng cho khối văn bản.
      // Tương ứng với các thẻ HTML, bạn có thể định nghĩa title và value tùy ý.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks cho phép đánh dấu văn bản inline (trong cùng 1 dòng).
      marks: {
        // Decorators mô tả các thuộc tính định dạng đơn giản - ví dụ: đậm, nghiêng.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations có thể là bất kỳ cấu trúc đối tượng nào - ví dụ: liên kết (link).
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    
    // 🎯 1. CHÈN ẢNH VÀO NỘI DUNG (CÓ THÊM TRƯỜNG CAPTION KHÔNG BẮT BUỘC)
    // Đã xóa bỏ phần image cũ không có fields để tránh lỗi trùng lặp type.
    defineArrayMember({
      type: 'image',
      title: 'Hình ảnh',
      options: {
        hotspot: true // Cho phép chọn điểm tâm ảnh để crop đẹp hơn
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Ghi chú dưới ảnh (Caption - Không bắt buộc)',
          description: 'Hiển thị chữ nhỏ, in nghiêng và căn giữa dưới ảnh',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Thẻ Alt (Mô tả cho SEO/Trình đọc màn hình)',
        },
      ],
    }),

    // 🎯 2. THÊM KHUNG CHÚ Ý (CALLOUT BOX) VÀO NỘI DUNG
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Khung Chú Ý (Callout Box)',
      fields: [
        {
          name: 'type',
          title: 'Loại chú ý',
          type: 'string',
          options: {
            list: [
              {title: 'Thông tin (Màu xanh)', value: 'info'},
              {title: 'Cảnh báo (Màu đỏ)', value: 'warning'},
              {title: 'Ghi chú (Màu vàng)', value: 'note'},
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'text',
          title: 'Nội dung chú ý',
          type: 'text',
          rows: 3,
        },
      ],
    }),
  ],
})