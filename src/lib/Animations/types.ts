import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'

export type PixelPositionRot = { x: number; y: number; rot?: number }

export type AnimationFn = (
  el: SlideElement,
  startPos: PixelPositionRot,
  endPixelPos: PixelPositionRot,
  duration: number,
  endPos: Position,
) => Promise<void>
