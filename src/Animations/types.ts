import { SlideElement } from '../Elements/SlideElement'
import { Position } from '../Slide'

export type PixelPosition = { x: number; y: number; rot?: number }

export type AnimationFn = (
  el: SlideElement,
  startPos: PixelPosition,
  endPos: PixelPosition,
  duration: number
) => Promise<void>
