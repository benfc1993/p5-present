import { AnimationFn } from '../Animations/types'
import { TextElement, TextElementData } from './TextElement'
import { Frame, Position } from '../Slide'
import { Sketch } from 'p5-typescript'

export const bulletPoints = (
  listName: string,
  items: string[],
  position: Position,
  data: Partial<Omit<TextElementData, 'text'>>,
  animation?: {
    animation?: AnimationFn | undefined
    startPos?: Position | undefined
    endPos?: Position | undefined
    duration?: number | undefined
  },
): Frame[] => {
  return items.map((item, idx) => {
    const posY = idx > 0 ? createYpos(position.y, idx, data.size) : position.y
    return {
      in: {
        [`${listName}${idx}`]: {
          element: (p: Sketch) =>
            new TextElement(
              p,
              {
                x: position.x,
                y: posY,
              },
              { text: `-    ${item}`, ...data },
            ),
          ...(animation && { ...animation }),
        },
      },
    }
  })
}

const createYpos = (
  y: number | string,
  index: number,
  size: number = 14,
): string | number => {
  if (typeof y === 'string') {
    return y + ` + ${((size || 14) + 20) * index}`
  } else {
    return (y as number) + ((size || 14) + 20) * index
  }
}

export function bulletPointsOut(name: string, length: number) {
  const res = Array.from({ length }).reduce<Record<string, {}>>(
    (acc, _, idx) => {
      acc[`${name}${idx}`] = {}
      return acc
    },
    {},
  )
  return res
}
