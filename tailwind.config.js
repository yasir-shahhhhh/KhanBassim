/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./demo.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border, oklch(0.25 0.01 260))",
        input: "var(--input, oklch(0.25 0.01 260))",
        ring: "var(--ring, oklch(0.65 0.15 250))",
        background: "var(--background, oklch(0.12 0.01 260))",
        foreground: "var(--foreground, oklch(0.95 0.01 260))",
        primary: {
          DEFAULT: "var(--primary, oklch(0.65 0.15 250))",
          foreground: "var(--primary-foreground, oklch(0.12 0 0))",
        },
        secondary: {
          DEFAULT: "var(--secondary, oklch(0.22 0.01 260))",
          foreground: "var(--secondary-foreground, oklch(0.9 0.01 260))",
        },
        destructive: {
          DEFAULT: "var(--destructive, oklch(0.396 0.141 25.723))",
          foreground: "var(--destructive-foreground, oklch(0.637 0.237 25.331))",
        },
        muted: {
          DEFAULT: "var(--muted, oklch(0.22 0.01 260))",
          foreground: "var(--muted-foreground, oklch(0.65 0.02 260))",
        },
        accent: {
          DEFAULT: "var(--accent, oklch(0.7 0.12 45))",
          foreground: "var(--accent-foreground, oklch(0.98 0.01 45))",
        },
        card: {
          DEFAULT: "var(--card, oklch(0.16 0.01 260))",
          foreground: "var(--card-foreground, oklch(0.95 0.01 260))",
        },
        "folder-back": "var(--folder-back, #b45309)",
        "folder-front": "var(--folder-front, #d97706)",
        "folder-tab": "var(--folder-tab, #92400e)",
      },
    },
  },
  plugins: [],
}
