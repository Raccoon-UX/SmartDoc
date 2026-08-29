/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smartdoc: {
          primary: {
            DEFAULT: '#6366F1', // Refined Indigo
            hover: '#4F46E5',
            dark: '#4338CA',
            light: '#818CF8',
            soft: '#EEF2FF',
            border: '#E0E7FF',
          },
          secondary: {
            DEFAULT: '#8B5CF6', // Refined Violet
            hover: '#7C3AED',
            dark: '#6D28D9',
            light: '#A78BFA',
            soft: '#F5F3FF',
            border: '#EDE9FE',
          },
          accent: {
            DEFAULT: '#10B981', // Subtle Mint / Emerald
            dark: '#059669',
            soft: '#ECFDF5',
            border: '#A7F3D0',
          },
          navy: {
            DEFAULT: '#0F172A', // Slate 900 Primary
            dark: '#020617',
            light: '#1E293B',
            muted: '#475569',
          },
          blue: {
            DEFAULT: '#6366F1',
            dark: '#4F46E5',
            light: '#818CF8',
            soft: '#EEF2FF',
            border: '#E0E7FF',
          },
          slate: {
            bg: '#F5F7FA', // Refined SaaS Background
            surface: '#FFFFFF',
            card: '#FFFFFF',
            subtle: '#F8FAFC',
            border: '#E2E8F0',
            text: '#0F172A',
            muted: '#64748B',
          },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}
