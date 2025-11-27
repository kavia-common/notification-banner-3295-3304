/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure Tailwind scans all React source files
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ocean Professional palette
        primary: '#2563EB',      // Blue
        secondary: '#F59E0B',    // Amber (also used as success)
        success: '#F59E0B',      // Alias to secondary per style guide
        error: '#EF4444',        // Red
        background: '#f9fafb',   // Gray-50
        surface: '#ffffff',      // White
        text: '#111827'          // Gray-900
      }
    }
  },
  plugins: []
};
