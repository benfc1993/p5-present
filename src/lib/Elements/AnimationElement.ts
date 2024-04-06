import { Sketch } from 'p5-typescript'
import { PixelPositionRot } from '../Animations/types'
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
  position: PixelPositionRot
  setPosition: (pos: PixelPositionRot) => void
  draw: () => void
}

export class AnimationElement extends SlideElement {
  animation: AnimationComponent
  constructor(p: Sketch, position: Position, animation: AnimationComponent) {
    super(p, position)
    this.animation = animation
  }
}
