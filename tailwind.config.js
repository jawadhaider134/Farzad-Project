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

      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Source Sans 3", "sans-serif"],
      },

      keyframes: {
        slideDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },

        spreadOut: {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(1.2)",
            opacity: 0,
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
      },

      animation: {
        slideDown: "slideDown 0.5s ease-out",
        spreadOut: "spreadOut 0.5s ease-in forwards",
        shimmer: "shimmer 1.8s linear infinite",
      },

      backgroundSize: {
        shimmer: "1000px 100%",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};