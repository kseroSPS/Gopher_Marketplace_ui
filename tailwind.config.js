/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        // Rainbow colors
        red: {
          DEFAULT: '#FF0000',       // Red color
          '50': '#FFB3B3',          // Lighter red
          '100': '#FF6666',
          '200': '#FF3333',
          '300': '#FF0000',         // Default red
          '400': '#CC0000',
          '500': '#990000',
          '600': '#660000',
          '700': '#330000',
          '800': '#1A0000',
          '900': '#0D0000'
        },
        orange: {
          DEFAULT: '#FFA500',       // Orange color
          '50': '#FFE0B3',          // Lighter orange
          '100': '#FFCC66',
          '200': '#FF9900',
          '300': '#FF6600',
          '400': '#FF3300',
          '500': '#FF6600',
          '600': '#CC5200',
          '700': '#993F00',
          '800': '#662D00',
          '900': '#331600'
        },
        yellow: {
          DEFAULT: '#FFFF00',       // Yellow color
          '50': '#FFFF99',          // Lighter yellow
          '100': '#FFFF66',
          '200': '#FFCC00',
          '300': '#FF9900',
          '400': '#FF6600',
          '500': '#FF9900',
          '600': '#CC7A00',
          '700': '#996300',
          '800': '#664D00',
          '900': '#332600'
        },
        green: {
          DEFAULT: '#008000',       // Green color
          '50': '#A8D08D',          // Lighter green
          '100': '#88B977',
          '200': '#66A24D',
          '300': '#4D8C33',
          '400': '#338220',
          '500': '#006400',        // Default green
          '600': '#004C00',
          '700': '#003300',
          '800': '#002200',
          '900': '#001100'
        },
        blue: {
          DEFAULT: '#0000FF',       // Blue color
          '50': '#B3C9FF',          // Lighter blue
          '100': '#99B3FF',
          '200': '#6699FF',
          '300': '#3385FF',
          '400': '#0066FF',
          '500': '#0000FF',        // Default blue
          '600': '#0000CC',
          '700': '#000099',
          '800': '#000066',
          '900': '#000033'
        },
        indigo: {
          DEFAULT: '#4B0082',       // Indigo color
          '50': '#D0B0FF',          // Lighter indigo
          '100': '#A382FF',
          '200': '#7A4DFF',
          '300': '#5531FF',
          '400': '#3200FF',
          '500': '#4B0082',        // Default indigo
          '600': '#3D0066',
          '700': '#2E004D',
          '800': '#1F0033',
          '900': '#13001A'
        },
        violet: {
          DEFAULT: '#8A2BE2',       // Violet color
          '50': '#D6A7FF',          // Lighter violet
          '100': '#C17DFF',
          '200': '#B04CFF',
          '300': '#9E1DFF',
          '400': '#8A2BE2',        // Default violet
          '500': '#7A1FC3',
          '600': '#5D17A1',
          '700': '#490F7E',
          '800': '#350A5C',
          '900': '#23063A'
        },
        'gray': {
          DEFAULT: '#9E9E9E',         // Main gray
          '100': '#F5F5F5',           // Light gray
          '200': '#E0E0E0',
          '300': '#BDBDBD',
          '400': '#9E9E9E',           // Default gray
          '500': '#616161',
          '600': '#424242',           // Darker gray
          '700': '#212121',
          '800': '#0D0D0D',
          '900': '#000000'
        },
        maroon: {
          DEFAULT: '#800000',       // Maroon color
          '50': '#F2D6D6',          // Lighter shade of maroon
          '100': '#E6A9A9',
          '200': '#D17373',
          '300': '#BF3C3C',
          '400': '#B22A2A',
          "450": "#9E2626",
          "475": "#8F1313",
          "490": "#851111",
          "492": "#840C0C",
          "495": "#820808",
          '500': '#800000',         // Default maroon
          "550": "#740000",
          '600': '#6B0000',
          '700': '#550000',
          '800': '#400000',
          '900': '#2A0000',
          'logo': '#74160d',
        }
      }
    }
  }
}

