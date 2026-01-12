import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jd: {
          green: "#367C2B",
          yellow: "#FFDE00",
          dark: "#1F4D1A",
          black: "#1A1A1A",
          cream: "#F4F1E8",
          sand: "#C9B06E",
        },
      },
      fontFamily: {
        display: ["Arial", "Helvetica", "sans-serif"],
        body: ["Arial", "Helvetica", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(60% 60% at 10% 10%, #FFDE00 0%, rgba(255, 222, 0, 0.3) 40%, rgba(244, 241, 232, 0.5) 75%, #F4F1E8 100%)",
        "mesh": "linear-gradient(120deg, rgba(54, 124, 43, 0.15), rgba(255, 222, 0, 0.15))",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(26, 26, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
