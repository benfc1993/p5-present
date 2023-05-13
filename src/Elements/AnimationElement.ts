import { PixelPosition } from '../Animations/types'
import { Position } from '../Slide'
import { SlideElement } from './SlideElement'

export type AnimationState = 'PLAYING' | 'PAUSED' | 'STOPPED'

export interface AnimationComponent {
  startTime: number
  frameRate: number
  playState: AnimationState
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  position: PixelPosition
  setPosition: (pos: PixelPosition) => void
  draw: () => void
}

export class AnimationElement extends SlideElement {
  animation: AnimationComponent
  constructor(p: p5, position: Position, animation: AnimationComponent) {
    super(p, position)
    this.animation = animation
  }
}
