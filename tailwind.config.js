/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    center: true,
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
