import { AnimationFn, PixelPositionRot } from './types'
import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'

export const linearMoveAnim: AnimationFn = async (
  el: SlideElement,
  startPos: PixelPositionRot,
  endPixelPos: PixelPositionRot,
  duration: number,
  endPos: Position,
) => {
  if (startPos.x == endPixelPos.x && startPos.y == endPixelPos.y) {
    startPos.x = -100
  }
  el.setPosition(startPos)

  return new Promise((resolve) => {
    const startDistanceX = endPixelPos.x - el.pixelPosition.x
    const startDistanceY = endPixelPos.y - el.pixelPosition.y
    const speedX = startDistanceX / duration
    const speedY = startDistanceY / duration

    const int = setInterval(() => {
      const pos = el.pixelPosition

      const distanceX = endPixelPos.x - pos.x
      const distanceY = endPixelPos.y - pos.y

      pos.x += speedX * (1000 / 60)
      pos.y += speedY * (1000 / 60)
      if (distanceX < 0.01) pos.x = endPixelPos.x
      if (distanceY < 0.01) pos.y = endPixelPos.y

      el.setPosition(pos)
    }, 1000 / 60)

    setTimeout(() => {
      clearInterval(int)
      el.setPosition(endPos)
      return resolve()
    }, duration)
  })
}
