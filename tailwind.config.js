/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "background-page": "var(--backgroud-page)",
        "background-component": "var(--background-component)",
        "background-component-active": "var(--background-component-active)",
        primary: "var(--primary)",
        headline: "var(--headline)",
        "headline-active": "var(--headline-active)",
        "sub-headline": "var(--sub-headline)",
        border: "var(--border)",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        "gray-dark": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "input-focus": "0 0 0 2px white, 0 0 0 4px #2563eb",
      },
      // Custom colors matching your app theme
    },
  },
  plugins: [PrimeUI],
};
