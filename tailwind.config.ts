import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#FF5C93", dark: "#E8467F", soft: "#FFEEF3", bar: "#FFC9DA", ink: "#1F1B1D" } },
      fontFamily: {
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
