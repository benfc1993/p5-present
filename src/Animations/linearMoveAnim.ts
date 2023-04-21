import { AnimationFn, PixelPosition } from './types'
import { SlideElement } from '../Elements/SlideElement'

export const linearMoveAnim: AnimationFn = async (
  el: SlideElement,
  startPos: PixelPosition,
  endPos: PixelPosition,
  duration: number
) => {
  return new Promise((resolve) => {
    const distanceX = endPos.x - startPos.x
    const distanceY = endPos.y - startPos.y
    const speedX = distanceX / duration
    const speedY = distanceY / duration

    const int = setInterval(() => {
      const pos = el.position()
      pos.x += speedX * (1000 / 60)
      pos.y += speedY * (1000 / 60)
      if (
        (distanceX < 0 && pos.x <= endPos.x) ||
        (distanceX > 0 && pos.x >= endPos.x)
      )
        pos.x = endPos.y
      if (
        (distanceY < 0 && pos.y <= endPos.y) ||
        (distanceY > 0 && pos.y >= endPos.y)
      )
        pos.y = endPos.y
      el.setPosition(pos)
    }, 1000 / 60)

    setTimeout(() => {
      clearInterval(int)
      el.setPosition(endPos)
      return resolve()
    }, duration)
  })
}
