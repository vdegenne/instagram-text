import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

export default {
  input: 'src/app-container.ts',
  output: { file: 'bundle.js', format: 'esm' },
  plugins: [resolve(), typescript(),
    terser()
  ]
}