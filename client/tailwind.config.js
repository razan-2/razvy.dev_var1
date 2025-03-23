/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      screens: {
        xs: "480px",
      },
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			glitch: {
  				'0%': {
  					clipPath: 'inset(40% 0 61% 0)',
  					transform: 'translate(-2px, 2px)'
  				},
  				'20%': {
  					clipPath: 'inset(92% 0 1% 0)',
  					transform: 'translate(1px, -3px)'
  				},
  				'40%': {
  					clipPath: 'inset(43% 0 1% 0)',
  					transform: 'translate(-1px, 3px)'
  				},
  				'60%': {
  					clipPath: 'inset(25% 0 58% 0)',
  					transform: 'translate(3px, -1px)'
  				},
  				'80%': {
  					clipPath: 'inset(54% 0 7% 0)',
  					transform: 'translate(-3px, 2px)'
  				},
  				'100%': {
  					clipPath: 'inset(58% 0 43% 0)',
  					transform: 'translate(2px, -2px)'
  				}
  			},
  			noise: {
  				'0%, 100%': {
  					transform: 'translate(0, 0)'
  				},
  				'10%': {
  					transform: 'translate(-5%, -5%)'
  				},
  				'20%': {
  					transform: 'translate(-10%, 5%)'
  				},
  				'30%': {
  					transform: 'translate(5%, -10%)'
  				},
  				'40%': {
  					transform: 'translate(-5%, 15%)'
  				},
  				'50%': {
  					transform: 'translate(-10%, 5%)'
  				},
  				'60%': {
  					transform: 'translate(15%, 0)'
  				},
  				'70%': {
  					transform: 'translate(0, 10%)'
  				},
  				'80%': {
  					transform: 'translate(-15%, 0)'
  				},
  				'90%': {
  					transform: 'translate(10%, 5%)'
  				}
  			}
  		},
  		animation: {
  			glitch: 'glitch 500ms infinite',
  			noise: 'noise 150ms steps(2) infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}

