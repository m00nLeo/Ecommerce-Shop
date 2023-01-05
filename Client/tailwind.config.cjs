/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner:
          "url('https://images.unsplash.com/photo-1558236714-d1a6333fce68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')",
      },
      height: {
        navbar: "var(--navbar-height)",
        banner: "var(--banner-height)",
      },
    },
  },
  plugins: [require("daisyui")],
};
