import { AnimationFn, PixelPositionRot } from './types'
import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'
import { lerp, easeInOut } from './utils'

export const linearMoveAnim: AnimationFn = async (
  el: SlideElement,
  startPos: PixelPositionRot,
  endPixelPos: PixelPositionRot,
  duration: number,
  endPos: Position,
) => {
  return new Promise((resolve) => {
    let t = 0
    let prevTime = 0
    let id = -1
    const startRot = startPos.rot ? startPos.rot : 0
    const endRot = endPixelPos.rot ? endPixelPos.rot : (startPos.rot ?? 0)

    function step(ts: number) {
      const deltaTime = prevTime === 0 ? 0 : Math.max(0, ts - prevTime)
      prevTime = ts
      t += deltaTime / duration
      if (t >= 1) return
      id = requestAnimationFrame(step)
      const pos = el.pixelPosition

      pos.x = lerp(startPos.x, endPixelPos.x, easeInOut(t))
      pos.y = lerp(startPos.y, endPixelPos.y, easeInOut(t))
      pos.rot = lerp(startRot, endRot, easeInOut(t))

      el.setPosition(pos)
    }

    step(0)

    setTimeout(() => {
      el.setPosition(endPos)
      cancelAnimationFrame(id)
      t = 1
      return resolve()
    }, duration)
  })
}
