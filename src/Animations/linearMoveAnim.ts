import { AnimationFn, PixelPosition } from './types'
import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'

export const linearMoveAnim: AnimationFn = async (
  el: SlideElement,
  startPos: PixelPosition,
  endPixelPos: PixelPosition,
  duration: number,
  endPos: Position
) => {
  return new Promise((resolve) => {
    const distanceX = endPixelPos.x - startPos.x
    const distanceY = endPixelPos.y - startPos.y
    const speedX = distanceX / duration
    const speedY = distanceY / duration

    const int = setInterval(() => {
      const pos = el.pixelPosition
      pos.x += speedX * (1000 / 60)
      pos.y += speedY * (1000 / 60)
      if (
        (distanceX < 0 && pos.x <= endPixelPos.x) ||
        (distanceX > 0 && pos.x >= endPixelPos.x)
      )
        pos.x = endPixelPos.y
      if (
        (distanceY < 0 && pos.y <= endPixelPos.y) ||
        (distanceY > 0 && pos.y >= endPixelPos.y)
      )
        pos.y = endPixelPos.y
      el.setPosition(pos)
    }, 1000 / 60)

    setTimeout(() => {
      clearInterval(int)
      el.setPosition(endPos)
      return resolve()
    }, duration)
  })
}
