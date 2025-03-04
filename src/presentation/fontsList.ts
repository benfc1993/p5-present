import { hex } from '../lib/utils/hex'

export const fonts = ['Comfortaa-Regular.ttf', 'Oswald-Regular.ttf'] as const

export const colors = {
  get white() {
    return hex('#bb')
  },
  get yellow() {
    return hex('#fedd5b')
  },
  get green() {
    return hex('#14feb0')
  },
  get red() {
    return hex('#ff0f54')
  },
  get blue() {
    return hex('#33bbf9')
  },
  get purple() {
    return hex('#8b39b5')
  },
  get bg() {
    return hex('#0e1a24')
  },
}
