/** @type {import('tailwindcss').Config} */
import typographyPlugin from '@tailwindcss/typography';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                cyber: {
                    black: '#050505',
                    dark: '#0A0A0A',
                    gray: '#121212',
                    slate: '#1E1E1E',
                    purple: '#8B5CF6',
                    cyan: '#06B6D4',
                    emerald: '#10B981',
                    neon: {
                        purple: '#A855F7',
                        blue: '#3B82F6',
                        cyan: '#22D3EE',
                        green: '#34D399',
                        pink: '#EC4899',
                    }
                }
            },
            backgroundImage: {
                'cyber-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #121212 100%)',
                'neon-gradient': 'linear-gradient(to right, #8B5CF6, #06B6D4)',
                'glass-dark': 'linear-gradient(180deg, rgba(20, 20, 20, 0.7) 0%, rgba(10, 10, 10, 0.8) 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-in': 'slideIn 0.5s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'cyber-pulse': 'cyberPulse 3s infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
                },
                cyberPulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
            boxShadow: {
                'neon-purple': '0 0 10px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.1)',
                'neon-cyan': '0 0 10px rgba(6, 182, 212, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
        },
    },
    plugins: [
        typographyPlugin,
    ],
}
