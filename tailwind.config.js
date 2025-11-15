/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#3A7DFF',
				accent: '#64FFDA',
				'background-light': '#f6f7f8',
				'background-dark': '#0A192F',
			},
			fontFamily: {
				display: ['Inter', 'sans-serif'],
				heading: ['Plus Jakarta Sans', 'sans-serif'],
				mono: ['Roboto Mono', 'monospace'],
			},
			borderRadius: {
				DEFAULT: '1rem',
				lg: '1.5rem',
				xl: '2rem',
				full: '9999px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}


