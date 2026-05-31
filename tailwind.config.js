/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7fa",
          100: "#d4e4ee",
          200: "#a8c9dc",
          300: "#7aafca",
          400: "#4c95b8",
          500: "#1E5FA8",
          600: "#1a5594",
          700: "#14457a",
          800: "#103560",
          900: "#0a2342",
        },
        secondary: {
          50: "#f0fdfa",
          100: "#e0faf1",
          200: "#c1f5dd",
          300: "#a1f0ca",
          400: "#66e9b0",
          500: "#2FA84F",
          600: "#289143",
          700: "#1f7436",
          800: "#17572a",
          900: "#0d381a",
        },
        accent: {
          50: "#f0fafa",
          100: "#e0f5f5",
          200: "#c1ebe8",
          300: "#a1e0dd",
          400: "#66d1c9",
          500: "#27b8b8",
          600: "#229c9c",
          700: "#1c7f7f",
          800: "#166262",
          900: "#0d4444",
        },
        alert: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        background: {
          DEFAULT: "#ffffff",
          light: "#f8fafc",
          dark: "#0f172a",
        },
        text: {
          dark: "#1a3a5c",
          DEFAULT: "#475569",
          light: "#94a3b8",
          muted: "#cbd5e1",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "5rem",
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.13)",
      },
    },
  },
  plugins: [],
};
