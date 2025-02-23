import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'
import { AnimationFn, PixelPositionRot } from './types'
import { lerp, easeInOut } from './utils'

export const fadeInAnim: AnimationFn = (
  el: SlideElement,
  _startPos: PixelPositionRot,
  _endPixelPos: PixelPositionRot,
  duration: number,
  _endPos: Position,
) => {
  return new Promise((resolve) => {
    let t = 0
    let prevTime = 0
    let id = -1

    function step(ts: number = 0) {
      const deltaTime = prevTime === 0 ? 0 : Math.max(0, ts - prevTime)
      prevTime = ts
      t += deltaTime / duration
      if (t >= 1) return
      id = requestAnimationFrame(step)
      el.setOpacity(0)

      el.setOpacity(lerp(0, 1, easeInOut(t)))
    }

    step()

    setTimeout(() => {
      el.setOpacity(1)
      cancelAnimationFrame(id)
      t = 1
      return resolve()
    }, duration)
  })
}
