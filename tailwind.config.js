/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", //added manually
  "./src/**/*.{js,ts,jsx,tsx}", //added manually
],
  theme: {
    extend: {},
    colors: {
      'primary-cl': '#34568B',
      'secondary-cl': '#8C92AC',
      'error-cl': '#FF0000',
      'success-cl': '#93C47D',
      'warning-cl': '#FFFF00',
      'info-cl': '#00FFFF',
      'hover-cl': '#A4C2F4',
      'surface-cl': '#FFFFFF',
      'background-cl': '#F5F5F5',
    }
  },
  plugins: [],
}

