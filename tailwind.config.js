module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // or 'media' or 'class'
  darkMode: false,
  theme: {
    // 和 element-plus 的响应式设计统一
    // https://element-plus.gitee.io/zh-CN/component/layout.html#col-attributes
    screens: {
      xs: { 'max': '767.98px' }, // => @media (max-width: 767.98px) { ... }
      sm: '768px', // => @media (min-width: 768px) { ... }
      md: '992px', // => @media (min-width: 992px) { ... }
      lg: '1200px', // => @media (min-width: 1200px) { ... }
      xl: '1920px' // => @media (min-width: 1920px) { ... }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
