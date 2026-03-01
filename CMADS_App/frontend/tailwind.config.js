/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#000000",
        "text-primary": "#E7E5DF",
        "text-secondary": "#000000",
        "risk-safe": "#4A5D23",
        "risk-moderate": "#D4AF37",
        "risk-critical": "#8B0000",
      },
      fontFamily: {
        "koulen": ["Koulen", "sans-serif"],
        "mono": ["Roboto Mono", "monospace"],
        "serif": ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
}
