import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'
import { AnimationFn, PixelPosition } from './types'

export const fadeInAnim: AnimationFn = (
  el: SlideElement,
  startPos: PixelPosition,
  endPixelPos: PixelPosition,
  duration: number,
  endPos: Position
) => {
  return new Promise((resolve) => {
    el.setPosition(endPos)
    el.setOpacity(0)
    const int = setInterval(() => {
      let opacity = el.opacity()
      opacity += (1 / duration) * (1000 / 60)
      if (opacity <= 0) opacity = 0
      el.setOpacity(opacity)
    }, 1000 / 60)

    setTimeout(() => {
      clearInterval(int)
      clearInterval(int)
      el.setOpacity(1)
      return resolve()
    }, duration)
  })
}
