/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0ea5e9",
          "primary-content": "#fff",
          secondary: "#FDBF2D",
          "secondary-content": "#9ca3af",
          accent: "#6559ff",
          neutral: "#fff",
          "neutral-content": "#c5cbc8",
          "base-100": "#032541",
          "base-content": "#f3f4f6",
          info: "#009dd4",
          success: "#00c675",
          warning: "#fb8800",
          error: "#ff8482",
        },
      },
      "garden",
      "winter",
      "fantasy",
      "emerald",
      "corporate",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
