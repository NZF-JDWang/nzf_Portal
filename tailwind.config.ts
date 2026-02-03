import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#0b0f13",
          850: "#11161c",
          800: "#141b22",
          700: "#1b2430",
          600: "#263241",
          500: "#3a4a5f"
        },
        accent: {
          500: "#7ea84a",
          600: "#6d943f"
        },
        status: {
          open: "#6fa863",
          limited: "#c6a94e",
          full: "#c26a5a",
          closed: "#6b7280"
        }
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
