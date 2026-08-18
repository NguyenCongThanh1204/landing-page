/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F172A",       // Xanh Đen Than (Luxury Deep Navy) - dùng cho điểm tựa/footer
        navy: "#1E3A8A",       // Xanh Royal/Navy chuẩn kiến trúc
        accent: "#EB323A",     // Đỏ nhấn
        light: "#FFFFFF",      // Trắng Tinh (Tạo tương phản tối đa)
        subtle: "#F8FAFC",     // Xám trắng siêu nhẹ
        muted: "#64748B",      // Text xám đá
        hairline: "rgba(15, 23, 42, 0.08)", // Viền mỏng chuẩn xa xỉ
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '.25em',
        luxury: '.18em',
      },
    },
  },
  plugins: [],
}