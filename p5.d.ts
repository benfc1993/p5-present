import * as p5Global from 'p5/global'
import module = require('p5')
export = module
export as namespace p5

declare global {
  interface p5 {}
  interface Window {
    setup: any
    draw: any
  }
}
