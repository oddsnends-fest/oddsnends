import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        'custom-dark-gray': '#353535',
        'custom-light-gray': '#C4C4C4',
      },
    },
  },
  plugins: [],
} satisfies Config;
