/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                erc: {
                    dark: '#0a0a0a',
                    primary: '#3b82f6', // Adjust based on brand
                    accent: '#8b5cf6',
                },
                social: {
                    github: '#ffffff',
                    linkedin: '#0077B5',
                    instagram: '#E1306C',
                    twitter: '#1DA1F2',
                }
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            }
        },
    },
    plugins: [],
}
