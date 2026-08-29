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
          navy: {
            DEFAULT: '#0B132B',
            dark: '#070D1E',
            light: '#1C2541',
            muted: '#3A506B',
          },
          blue: {
            DEFAULT: '#2563EB',
            dark: '#1D4ED8',
            light: '#3B82F6',
            soft: '#EFF6FF',
            border: '#DBEAFE',
          },
          slate: {
            bg: '#F8FAFC',
            card: '#FFFFFF',
            subtle: '#F1F5F9',
            border: '#E2E8F0',
            text: '#334155',
            muted: '#64748B',
          },
          green: {
            DEFAULT: '#10B981',
            dark: '#059669',
            soft: '#ECFDF5',
            border: '#A7F3D0',
          },
          amber: {
            DEFAULT: '#F59E0B',
            soft: '#FFFBEB',
            border: '#FDE68A',
          }
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
