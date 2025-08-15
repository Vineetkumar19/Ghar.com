
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eef7ff",
          100: "#d9edff",
          200: "#b3dbff",
          300: "#85c4ff",
          400: "#52a4ff",
          500: "#2563eb",
          600: "#1e4fd1",
          700: "#1a43b3",
          800: "#163a95",
          900: "#122f78"
        },
        accent: {500: "#22c55e"}
      },
      boxShadow: { soft: "0 6px 30px rgba(0,0,0,0.08)" }
    },
  },
  plugins: [],
}
