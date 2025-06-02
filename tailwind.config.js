/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FEAF00",
        secondary: "#f59e0b",   // orange
        success: "#10b981",     // vert
        danger: "#ef4444",      // rouge
        light: "#f3f4f6",       // gris clair
        dark: "#111827"         // gris foncé
      },
      boxShadow: {
        'top': '0 -4px 6px rgba(0, 0, 0, 0.1)',
      },
    }
  },
  plugins: []
}
