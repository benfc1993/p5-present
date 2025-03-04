import { Component, Sketch } from 'p5-typescript'
import { AnimationFn } from './Animations/types'
import { SlideElement } from './Elements/SlideElement'
import { presentationOptions } from '.'
import { doTransition } from './transition'

export type Position = { x: number | string; y: number | string; rot?: number }

export type SlideData = {
  title: string
  background: [number, number, number] | string
  frames: Frame[]
}

export type Transition = {
  animation?: AnimationFn
  startPos?: Position
  endPos?: Position
  duration?: number
  simultaneous?: boolean
}

export interface Frame {
  in?: {
    [elementType: string]: Transition & {
      element?: (p: Sketch) => SlideElement
    }
  }
  out?: {
    [id: string]: Transition
  }
  onEnter?: () => void
  onExit?: () => void
}

type Elements = Record<string, SlideElement>

export class Slide extends Component {
  frames: Frame[]
  currentFrame: number = 0
  elements: Elements = {}
  background: [number, number, number] | string = [60, 60, 64]
  active: boolean = false
  onEndSlide: (dir: number) => void = () => {}

  constructor(p: Sketch, data: SlideData) {
    super(p, 2)
    this.background = data.background
    this.frames = data.frames
  }

  async nextFrame() {
    if (this.currentFrame === this.frames.length - 1) return this.onEnd(1)
    await this.goToFrame(this.currentFrame + 1)
  }

  lastFrame() {
    if (this.currentFrame === 0) return this.onEnd(-1)
    this.goToFrame(this.currentFrame - 1)
  }

  async goToFrame(index: number) {
    const dir = this.currentFrame < index ? 1 : -1
    while (this.currentFrame !== index) {
      this.currentFrame += dir
      if (dir === 1) {
        return new Promise<void>(async (resolve) => {
          await this.drawFrame()
          setTimeout(() => {
            return resolve()
          }, 250)
        })
      } else {
        this.revertFrame()
      }
    }
  }

  onStartSlide(onFinish: (dir: number) => void) {
    this.active = true
    this.onEndSlide = onFinish
    this.drawFrame()
  }

  onEnd(dir: number) {
    this.active = false
    this.onEndSlide(dir)
  }

  draw(): void {
    if (!this.active) return
    this.sketch.push()
    if (this.background instanceof Array) {
      this.sketch.fill(this.background)
      this.sketch.noStroke()
      this.sketch.rect(0, 0, this.sketch.width, this.sketch.height)
    } else {
      this.sketch.image(
        presentationOptions.images[this.background],
        0,
        0,
        this.sketch.width,
        this.sketch.height,
      )
    }
    this.sketch.pop()
    Object.values(this.elements).forEach((el) => el.draw())
  }

  async drawFrame() {
    const frame = this.frames[this.currentFrame]

    frame?.onEnter?.()

    if (frame.out) {
      for (const [elementId, transition] of Object.entries(frame.out)) {
        const element = this.elements[elementId]
        if (!transition.animation) {
          element.setPosition(transition.endPos || element.getPosition())
          element.onAnimatedOut()
          element.onDestroy()
        } else {
          await doTransition(this.sketch, transition, element, () => {
            element.onAnimatedOut()
            element.onDestroy()
          })
        }
      }
    }

    if (frame.in) {
      for (const [elementId, transition] of Object.entries(frame.in)) {
        if (!(elementId in this.elements) && transition.element)
          this.elements[elementId] = transition.element(this.sketchInstance)

        const element = this.elements[elementId]

        if (!transition.animation) {
          element.setPosition(transition.endPos || element.getPosition())
          element.onAnimatedOut()
        } else {
          await doTransition(this.sketch, transition, element)
        }
        element.onAnimatedIn()
      }
    }

    frame?.onExit?.()
  }

  revertFrame() {
    const prevFrame = this.frames[this.currentFrame + 1]
    const frame = this.frames[this.currentFrame]

    if (prevFrame.out)
      for (const [elementId, _transition] of Object.entries(prevFrame.out)) {
        this.elements[elementId].onReset()
      }
    if (prevFrame.in)
      for (const [elementId, _transition] of Object.entries(prevFrame.in)) {
        this.elements[elementId].onDestroy()
        delete this.elements[elementId]
      }

    if (frame.in)
      for (const [elementId, transition] of Object.entries(frame.in)) {
        this.elements[elementId].setPosition(
          transition.endPos || this.elements[elementId].getPosition(),
        )
      }
  }
}
