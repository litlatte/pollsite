/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.7s",
        "single-pulse": "pulse 2s ease-in-out",
        "spin-pulse-fast": "spin 0.8s linear infinite , pulse 2s infinite",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translateX(-1px)",
          },
          "20%, 80%": {
            transform: "translateX(2px)",
          },
          "30%, 50%, 70%": {
            transform: "translateX(-4px)",
          },
          "40%, 60%": {
            transform: "translateX(4px)",
          },
        },
      },
    },
  },
  plugins: [],
}