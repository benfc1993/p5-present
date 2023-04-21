import { PixelPosition } from '../Animations/types'
import { Position } from '../Slide'

export const positionPercentageToPixels = (
  sketch: p5,
  position: Position
): PixelPosition => {
  let x = 0
  let y = 0

  if (typeof position.x === 'string') {
    x =
      sketch.width /
      (100 / tryParseInt((position.x as string).split('%')[0], 0))
  } else {
    x = position.x
  }

  if (typeof position.y === 'string') {
    y =
      sketch.height /
      (100 / tryParseInt((position.y as string).split('%')[0], 0))
  } else {
    y = position.y
  }

  return { x, y }
}

export const tryParseInt = (str: string, fallback: number) => {
  if (!str.match(/^[0-9]*$/)) return fallback

  const parsed = parseInt(str)

  const validParse = !isNaN(parsed)
  return validParse ? parsed : fallback
}
