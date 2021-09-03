module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // or 'media' or 'class'
  darkMode: false,
  theme: {
    // 和 element-plus 的响应式设计统一
    // https://element-plus.org/#/zh-CN/component/layout#col-attributes
    screens: {
      xs: { 'max': '575.98px' }, // => @media (max-width: 575.98px) { ... }
      sm: '768px', // => @media (min-width: 640px) { ... }
      md: '992px', // => @media (min-width: 768px) { ... }
      lg: '1200px', // => @media (min-width: 1024px) { ... }
      xl: '1920px' // => @media (min-width: 1280px) { ... }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
