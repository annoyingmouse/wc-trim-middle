import { terser } from 'rollup-plugin-terser'

export default {
  input: './wc-trim-middle.js',
  output: {
    file: 'dist/wc-trim-middle.min.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    terser()
  ],
}