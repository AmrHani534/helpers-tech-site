import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#05070d",
          900: "#0a0e1a",
          800: "#101624",
          700: "#1a2235",
          600: "#273149",
        },
        brand: {
          DEFAULT: "#4f7cff",
          50: "#eef3ff",
          100: "#dde8ff",
          200: "#bcd0ff",
          300: "#8aacff",
          400: "#5f87ff",
          500: "#4f7cff",
          600: "#3b5fe0",
          700: "#3049b3",
          800: "#253984",
          900: "#1a2a64",
        },
        accent: {
          DEFAULT: "#b794f6",
          500: "#b794f6",
          600: "#9f7aea",
          700: "#805ad5",
        },
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,124,255,0.18), transparent 60%)",
      },
      keyframes: {
        "float-slow": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
