/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },

      // 🎯 ANIMATIONS
      animation: {
        marquee: "marquee 12s linear infinite",
        fill: "fill 5s linear forwards",
        shimmer: "shimmer 1.2s ease-in-out infinite",
      },

      // 🎯 KEYFRAMES
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
      "0%": { transform: "translateX(-120%)" },
      "100%": { transform: "translateX(120%)" },
    },

        fill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};