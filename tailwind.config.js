/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slide:{
          "0%":{transform : "translateX(0)"},
          "100%":{transform: "translateX(-50%)"}
        }
      },
      animation:{
        slide:"slide 10s linear infinite"
      }
    },
  },
  plugins: [],
}
