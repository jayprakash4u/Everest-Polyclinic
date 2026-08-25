const plugin = require("tailwindcss/plugin");

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
        // Both families are anchored at 600 — the step actually used for buttons
        // and links — and the ramp is generated around it at a fixed hue, so
        // tints (100/200) belong to the same family as the solids.
        primary: {
          // hue ~212°, anchored on the logo's blue core
          50: "#F1F6FC",
          100: "#DFEAF7",
          200: "#C0D6EF",
          300: "#97BAE2",
          400: "#6597D0",
          500: "#3576BE",
          600: "#1E5FA8", // brand blue — 6.45:1 on white
          700: "#174E8C",
          800: "#113B6F",
          900: "#0B2951",
        },
        secondary: {
          // hue ~136°, anchored on the logo's green ring
          50: "#F2FBF4",
          100: "#DFF3E5",
          200: "#BEE7CB",
          300: "#92D5A8",
          400: "#5CBF7C",
          500: "#2FA84F", // logo green — accents, rules, icons
          600: "#1F843C", // action green — 4.75:1 on white, AA at button sizes
          700: "#196A31",
          800: "#145226",
          900: "#0D371A",
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
        // These must stay as var() — next/font generates hashed family names,
        // so the CSS variable set in layout.js is the only stable reference.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
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
        // Two elevation levels for the redesigned surfaces: a hairline at rest,
        // one lift on hover. Anything heavier reads as a template.
        e1: "0 1px 2px rgba(15,23,42,0.04)",
        e2: "0 18px 38px -20px rgba(15,23,42,0.28)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Hero carousel timer bar. Duration is set inline from the same
        // constant that drives the interval, so the two can't drift apart.
        "hero-progress": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "rise-in": "rise-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
        // Duration here is a placeholder — Hero.jsx overrides it inline from
        // SLIDE_MS so the bar and the slide timer can never drift apart.
        "hero-progress": "hero-progress 3500ms linear forwards",
      },
    },
  },
  plugins: [
    // `group-active-or-hover:` — same as the built-in `group-hover:`, except
    // it also fires when the nearest `.group` ancestor carries
    // `data-active="true"`. Lets a component force its own "hovered" look
    // (e.g. ServiceCard's programmatic active-card highlight) without
    // maintaining a second, hand-duplicated set of utilities alongside every
    // `group-hover:` one — both states drive the exact same styles.
    plugin(function ({ addVariant }) {
      addVariant(
        "group-active-or-hover",
        ':merge(.group):is(:hover,[data-active="true"]) &',
      );
    }),
  ],
};
