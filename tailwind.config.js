/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        '"Noto Sans"',
        '"Noto Sans TC"',
        "sans-serif",
        "ui-sans-serif",
        "system-ui",
      ],
      number: ["Montserrat", "sans-serif"],
    },

    extend: {
      colors: {
        "brand-orange": "#ff6600",
        primary: "#0062ff",
        secondary: "#6c757d",
        success: "#3dd598",
        warning: "#ffc542",
        error: "#fc5a5a",
        gray1: "#fafafb",
        gray2: "#f1f1f5",
        gray3: "#e2e2ea",
        gray4: "#d5d5dc",
        gray5: "#b5b5be",
        gray6: "#92929d",
        gray7: "#696974",
        gray8: "#44444f",
        gray9: "#171725",
      },
    },
  },
  plugins: [],
};
