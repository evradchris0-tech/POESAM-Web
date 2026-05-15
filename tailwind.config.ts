import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B4D8E",
          900: "#0E2E55",
          700: "#1B4D8E",
          500: "#2E6DA4",
          200: "#D6E8F7",
          100: "#EBF4FF",
          50: "#F4F8FC",
        },
        orange: {
          DEFAULT: "#E87722",
          700: "#C95E0E",
          500: "#E87722",
          300: "#F5A55B",
          100: "#FBE8D5",
        },
        success: {
          DEFAULT: "#27AE60",
          500: "#27AE60",
          100: "#EAF3DE",
          700: "#3B6D11",
        },
        danger: {
          DEFAULT: "#E24B4A",
          500: "#E24B4A",
          100: "#FCEBEB",
          700: "#A32D2D",
        },
        warning: {
          DEFAULT: "#E67E22",
          500: "#E67E22",
          100: "#FAEEDA",
          700: "#854F0B",
        },
        ink: {
          900: "#1A1A1A",
          700: "#4A4A4A",
          500: "#6B7280",
          400: "#888888",
          300: "#B5BCC5",
          200: "#E5E7EB",
          100: "#EEF1F5",
        },
        surface: "#F5F7FA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, .04)",
        panel: "0 1px 3px rgba(15, 23, 42, .06), 0 0 0 0.5px rgba(0,0,0,0.04)",
        lift: "0 8px 24px rgba(15, 23, 42, .08), 0 0 0 0.5px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
