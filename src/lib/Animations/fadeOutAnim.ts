import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'
import { AnimationFn, PixelPositionRot } from './types'

export const fadeOutAnim: AnimationFn = (
  el: SlideElement,
  startPos: PixelPositionRot,
  endPixelPos: PixelPositionRot,
  duration: number,
  endPos: Position,
) => {
  return new Promise((resolve) => {
    el.setPosition(endPos)
    const int = setInterval(() => {
      let opacity = el.opacity()
      opacity -= (1 / duration) * (1000 / 60)
      if (opacity <= 0) opacity = 0
      el.setOpacity(opacity)
    }, 1000 / 60)

    setTimeout(() => {
      clearInterval(int)
      el.setOpacity(0)
      return resolve()
    }, duration)
  })
}
