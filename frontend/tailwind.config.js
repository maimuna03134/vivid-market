/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#6bfe9c",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e1e3e4",
        surface: "#f8f9fa",
        outline: "#8d7168",
        "on-secondary": "#ffffff",
        tertiary: "#006d37",
        "outline-variant": "#e1bfb5",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#45455b",
        "surface-variant": "#e1e3e4",
        "surface-container": "#edeeef",
        "on-secondary-fixed": "#1a1a2e",
        error: "#ba1a1a",
        "primary-fixed-dim": "#ffb59d",
        "on-error-container": "#93000a",
        "secondary-fixed-dim": "#c6c4df",
        "tertiary-container": "#00b15c",
        "primary-fixed": "#ffdbd0",
        "on-surface": "#191c1d",
        "surface-dim": "#d9dadb",
        "on-surface-variant": "#594139",
        primary: "#ab3500",
        "on-primary-container": "#5f1900",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#832600",
        "on-primary-fixed": "#390c00",
        "secondary-fixed": "#e2e0fc",
        "surface-container-low": "#f3f4f5",
        "on-background": "#191c1d",
        "inverse-on-surface": "#f0f1f2",
        "on-error": "#ffffff",
        "on-tertiary-fixed-variant": "#005228",
        secondary: "#5d5c74",
        "tertiary-fixed-dim": "#4ae183",
        "surface-bright": "#f8f9fa",
        "surface-tint": "#ab3500",
        "surface-container-high": "#e7e8e9",
        background: "#f8f9fa",
        "inverse-primary": "#ffb59d",
        "on-secondary-container": "#63627a",
        "secondary-container": "#e2e0fc",
        "on-primary": "#ffffff",
        "on-tertiary-fixed": "#00210c",
        "inverse-surface": "#2e3132",
        "on-tertiary-container": "#003b1a",
        "primary-container": "#ff6b35"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "container-max": "1280px",
        "stack-sm": "0.5rem",
        "margin-desktop": "2rem",
        gutter: "1.5rem",
        "stack-xs": "0.25rem",
        "margin-mobile": "1rem",
        "stack-md": "1rem",
        "stack-lg": "2rem"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-sm": ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "price-lg": ["24px", { lineHeight: "1", fontWeight: "700" }],
        "label-md": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};