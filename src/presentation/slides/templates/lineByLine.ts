import {
  AnimationFn,
  fadeOutAnim,
  Frame,
  Position,
  TextElement,
  TextElementData,
} from '../../../lib'

export function lineByLine(
  position: Position,
  data: Partial<TextElementData>,
  animation?: {
    animation?: AnimationFn | undefined
    startPos?: Position | undefined
    endPos?: Position | undefined
    duration?: number | undefined
  },
): Frame[] {
  const uuid = Math.random()
  const lines =
    data.text instanceof Array ? data.text : (data.text ?? '').split('\n')

  const frames = lines
    .map((line, idx) => {
      if (line.trim() === '') {
        console.log('line is blank')
        return null
      }

      const prevIsBlank = lines[idx - 1]?.trim() === ''
      const nextIsBlank = lines[idx + 1]?.trim() === ''

      const res: Frame = {}
      if (idx > 0 && !prevIsBlank)
        res.out = {
          [`line_${uuid}_${idx - 1}`]: {
            animation: fadeOutAnim,
            duration: (animation?.duration ?? 0) * 1.5,
            simultaneous: true,
          },
        }

      res.in = {
        [`line_${uuid}_${idx}`]: {
          ...(animation && animation),
          element: (p) =>
            new TextElement(p, position, {
              ...data,
              text:
                lines.slice(0, idx + 1).join('\n') + (nextIsBlank ? '\n' : ''),
            }),
        },
      }

      return res
    })
    .filter((frame) => frame !== null)
  return frames
}
