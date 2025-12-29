import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'echo-teal': '#3A666D',
        'origin-brown': '#7B5C4F',
        'ivory': '#F7F5EC',
        'charcoal': '#2D323A',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'], // Headings
        serif: ['var(--font-merriweather)'], // Body
      },
    },
  },
  plugins: [],
};

export default config;
