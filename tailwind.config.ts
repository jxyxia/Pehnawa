
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        // Darker pastel color palette with more vibrant colors
        pehnawa: {
          cream: '#C4C3CB',  // Darker soft gray-blue
          terracotta: '#E8835F',  // Darker soft peach
          green: '#6F96CF',  // Darker soft blue
          blue: '#9D85D6'    // Darker soft purple
        }
      },
      borderRadius: {
        'premium': '1.5rem'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
