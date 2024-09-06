/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        growThenFadeIn: {
          "0%": {
            opacity: "0",
            height: "0",
          },
          "70%": {
            opacity: "0",
            height: "100%",
          },
          "100%": {
            opacity: "1",
            height: "100%",
          },
        },
        fadeOutThenShrink: {
          "0%": {
            opacity: "0.5",
            height: "100%",
          },
          "30%": {
            opacity: "0",
            height: "100%",
          },
          "100%": {
            opacity: "0",
            height: "0",
            zIndex: "-1",
          },
        },
        fadeInToView: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInReview: {
          "0%": { opacity: "0" },
          "40%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        placeholderwave: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "40%": { opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutToTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "20%": { opacity: "0" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
      },
      animation: {
        fadeOutThenShrink: "fadeOutThenShrink 0.8s ease-out forwards",
        growThenFadeIn: "growThenFadeIn 0.8s ease-out forwards",
        placeholderwave: "placeholderwave 2s linear infinite",
        fadeInToView: "fadeInToView 1.5s ease-in-out 0s 1 normal both",
        fadeInReview: "fadeInReview 1s ease-in-out 0s 1 normal both",
        slideInFromBottom: "slideInFromBottom 1.5s ease-out forwards",
        slideOutToTop: "slideOutToTop 1.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
