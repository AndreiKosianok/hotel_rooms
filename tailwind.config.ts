import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors() {
        return {
          primary: {
            DEFAULT: "#7e22ce",
            dark: "#6b21a8",
            light: "#7e22ce78",
          },
          secondary: {
            DEFAULT: "#2264ce",
            dark: "#1e40af",
            light: "#2267ce78",
          },
        };
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
