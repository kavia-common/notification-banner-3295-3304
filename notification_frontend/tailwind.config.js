/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',      // Blue
        secondary: '#F59E0B',    // Amber
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
