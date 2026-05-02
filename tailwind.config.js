/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        bp: {
          bg: "#FFF6E9",
          bgAlt: "#FFEFD8",
          ink: "#1A1918",
          inkMid: "#4A4743",
          inkSoft: "#8A857D",
          card: "#FFFCF5",
          coral: "#FF5B3A",
          green: "#2FD576",
          violet: "#6B5BFF",
          yellow: "#FFC83A",
          sky: "#9FD9F7",
          pink: "#FFB5C2"
        }
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      boxShadow: {
        bp: "3px 3px 0 #1A1918",
        "bp-sm": "2px 2px 0 #1A1918",
        "bp-lg": "4px 4px 0 #1A1918",
        "bp-coral": "3px 3px 0 #FF5B3A"
      },
      keyframes: {
        bpPulse: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.15)" } },
        bpSlideUp: { from: { transform: "translateY(20px)", opacity: "0" }, to: { transform: "none", opacity: "1" } }
      },
      animation: { bpPulse: "bpPulse 1.4s infinite", bpSlideUp: "bpSlideUp 0.3s cubic-bezier(.3,1.2,.4,1)" }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
