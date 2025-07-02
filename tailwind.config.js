/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./contexts/**/*.{ts,tsx}",
        "./styles/**/*.css",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a23",
                yellow: {
                    flashy: "#fde047",
                },
                pink: {
                    flashy: "#f472b6",
                },
                sky: {
                    flashy: "#38bdf8",
                },
            },
            fontFamily: {
                comic: ['"Comic Neue"', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "fade-in-out": {
                    "0%, 100%": { opacity: "0", transform: "translateY(10px)" },
                    "10%, 90%": { opacity: "1", transform: "translateY(0)" },
                },
                "magic-sparkle": {
                    "0%, 100%": {
                        opacity: "0",
                        transform: "scale(0) rotate(0deg)"
                    },
                    "50%": {
                        opacity: "1",
                        transform: "scale(1) rotate(180deg)"
                    },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "glow": {
                    "0%, 100%": {
                        boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor"
                    },
                    "50%": {
                        boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor"
                    },
                },
            },
            animation: {
                "fade-in-out": "fade-in-out 3s ease-in-out",
                "magic-sparkle": "magic-sparkle 2s ease-in-out infinite",
                "float": "float 3s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

module.exports = config; 