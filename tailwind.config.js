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
      },
      boxShadow: {
        "input-focus": "0 0 0 2px white, 0 0 0 4px #2563eb",
      },
    },
  },
  plugins: [PrimeUI],
};
