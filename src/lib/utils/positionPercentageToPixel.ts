import { ExtendedP5 } from 'p5-typescript'
import { PixelPositionRot } from '../Animations/types'
import { Position } from '../Slide'

export const positionPercentageToPixels = (
  sketch: ExtendedP5,
  position: Position,
): PixelPositionRot => {
  let x = 0
  let y = 0

  if (typeof position.x === 'string') {
    const { denom, addition } = createStringComponents(position.x)
    x = sketch.width / (100 / denom) + addition
  } else {
    x = position.x
  }

  if (typeof position.y === 'string') {
    const { denom, addition } = createStringComponents(position.y)
    y = sketch.height / (100 / denom) + addition
  } else {
    y = position.y
  }

  return { x, y }
}

export const tryParseNum = (str: string, fallback: number) => {
  if (str.match(/^-?[0-9]*$/)) return tryParseInt(str, fallback)
  if (str.match(/^-?[0-9]*(\.[0-9]*)?$/)) return tryParseFloat(str, fallback)
  return fallback
}

export const tryParseInt = (str: string, fallback: number) => {
  if (!str.match(/^-?[0-9]*$/)) return fallback

  const parsed = parseInt(str)

  const validParse = !isNaN(parsed)
  return validParse ? parsed : fallback
}

export const tryParseFloat = (str: string, fallback: number) => {
  if (!str.match(/^-?[0-9]*(\.[0-9]*)?$/)) return fallback

  const parsed = parseFloat(str)

  const validParse = !isNaN(parsed)
  return validParse ? parsed : fallback
}

const createStringComponents = (
  str: string,
): { denom: number; addition: number } => {
  const components: string[] = str.split(/[+]/)
  return components.reduce(
    (splitTotals: { denom: number; addition: number }, component) => {
      ;(component as string).includes('%')
        ? (splitTotals.denom += tryParseNum(
            (component as string).split('%')[0].trim(),
            0,
          ))
        : (splitTotals.addition += tryParseNum((component as string).trim(), 0))
      return splitTotals
    },
    { denom: 0, addition: 0 },
  )
}
