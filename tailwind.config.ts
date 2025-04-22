import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate"; // ✅ use ESM-style import

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        pehnawa: {
          cream: '#C4C3CB',
          terracotta: '#E8835F',
          green: '#6F96CF',
          blue: '#7A5FFF', // vibrant, still stylish and brand-safe
        }
      },
      borderRadius: {
        'premium': '1.5rem'
      }
    }
  },
  plugins: [animatePlugin], // ✅ now clean and ESLint-compliant
} satisfies Config;
