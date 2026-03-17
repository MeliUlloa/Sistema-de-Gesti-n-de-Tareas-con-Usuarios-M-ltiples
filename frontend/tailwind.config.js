/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuquenBlue: "#0F4C81",
        neuquenLight: "#2E86C1",
        neuquenAccent: "#F4B400",
        neuquenBg: "#bfc4cd",
      },
    },
  },
  plugins: [],
}