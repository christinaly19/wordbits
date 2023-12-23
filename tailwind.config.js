/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#3490dc',        // Example: Custom primary color
        secondary: '#9561e2',      // Example: Custom secondary color
        accent: '#ff9900',         // Example: Custom accent color
        // ... add more custom colors as needed
      },
    },
  },
  plugins: [],
}

