// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important!
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // emerald-500
        secondary: '#3b82f6', // blue-500
        accent: '#f59e0b', // amber-500
        danger: '#ef4444', // red-500
      },
    },
  },
  plugins: [],
};
