/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: '#5C6672',
        blackgray: '#26303E',
        graylight: '#D8D9DD',
        purple: '#4F359B',
        bar: '#F5F5F5',
        gray2: '#485B69',
      },


    },
  },
  plugins: [],
}

