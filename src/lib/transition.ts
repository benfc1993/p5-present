import { ExtendedP5 } from 'p5-typescript'
import { ElementGroup, SlideElement } from './Elements'
import { Transition } from './Slide'
import { positionPercentageToPixels } from './utils/positionPercentageToPixel'

export async function doTransition(
  sketch: ExtendedP5,
  transition: Transition,
  element: SlideElement,
  callback?: () => void,
) {
  if (!transition.animation) return

  if (transition.simultaneous) {
    return void new Promise<void>(async (resolve) => {
      await transition.animation?.(
        element,
        positionPercentageToPixels(
          sketch,
          transition.startPos || element.getPosition(),
        ),
        positionPercentageToPixels(
          sketch,
          transition.endPos || element.getPosition(),
        ),
        transition.duration || 0,
        transition.endPos || element.getPosition(),
      )
      resolve()
    }).then(callback)
  } else {
    return await new Promise<void>(async (resolve) => {
      await transition.animation?.(
        element,
        positionPercentageToPixels(
          sketch,
          transition.startPos || element.getPosition(),
        ),
        positionPercentageToPixels(
          sketch,
          transition.endPos || element.getPosition(),
        ),
        transition.duration || 0,
        transition.endPos || element.getPosition(),
      )
      resolve()
    })
  }
}
