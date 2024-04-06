import { Component, Sketch } from 'p5-typescript'
import { AnimationFn } from './Animations/types'
import { SlideElement } from './Elements/SlideElement'
import { positionPercentageToPixels } from './utils/positionPercentageToPixel'
import { ElementGroup } from './Elements/ElementGroup'
import { presentationOptions } from '.'

export type Position = { x: number | string; y: number | string; rot?: number }

export type SlideData = {
  title: string
  background: [number, number, number] | string
  frames: Frame[]
}

type Transition = {
  animation?: AnimationFn
  startPos?: Position
  endPos?: Position
  duration?: number
  simultaneous?: boolean
}

export interface Frame {
  in?: {
    [elementType: string]: Transition & { element: (p: Sketch) => SlideElement }
  }
  out?: {
    [id: string]: Transition
  }
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

    if (frame.out) {
      for (const [elementId, transition] of Object.entries(frame.out)) {
        const element = this.elements[elementId]
        if (!transition.animation) {
          element.setPosition(transition.endPos || element.getPosition())
          element.onAnimatedIn()
        } else {
          if (transition.simultaneous) {
            if (element instanceof ElementGroup) {
              element.elements.forEach((groupElement) =>
                transition.animation?.(
                  groupElement,
                  positionPercentageToPixels(
                    this.sketch,
                    transition.startPos || groupElement.getPosition(),
                  ),
                  positionPercentageToPixels(
                    this.sketch,
                    transition.endPos || groupElement.getPosition(),
                  ),
                  transition.duration || 0,
                  transition.startPos || groupElement.getPosition(),
                ),
              )
            } else {
              transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.getPosition(),
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.getPosition(),
                ),
                transition.duration || 0,
                transition.startPos || element.getPosition(),
              )
            }
          } else {
            if (element instanceof ElementGroup) {
              await Promise.all(
                element.elements.map((groupElement) =>
                  transition.animation?.(
                    groupElement,
                    positionPercentageToPixels(
                      this.sketch,
                      transition.startPos || groupElement.getPosition(),
                    ),
                    positionPercentageToPixels(
                      this.sketch,
                      transition.endPos || groupElement.getPosition(),
                    ),
                    transition.duration || 0,
                    transition.startPos || groupElement.getPosition(),
                  ),
                ),
              )
            } else {
              await transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.getPosition(),
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.getPosition(),
                ),
                transition.duration || 0,
                transition.startPos || element.getPosition(),
              )
            }
          }
        }

        element.onAnimatedOut()
        element.onDestroy()
      }
    }

    if (frame.in) {
      for (const [elementId, transition] of Object.entries(frame.in)) {
        if (!(elementId in this.elements))
          this.elements[elementId] = transition.element(this.sketchInstance)
        const element = this.elements[elementId]

        if (!transition.animation) {
          element.setPosition(transition.endPos || element.getPosition())
          element.onAnimatedOut()
        } else {
          if (transition.simultaneous) {
            if (element instanceof ElementGroup) {
              element.elements.map((groupElement) =>
                transition.animation?.(
                  groupElement,
                  positionPercentageToPixels(
                    this.sketch,
                    transition.startPos || groupElement.getPosition(),
                  ),
                  positionPercentageToPixels(
                    this.sketch,
                    transition.endPos || groupElement.getPosition(),
                  ),
                  transition.duration || 0,
                  transition.endPos || groupElement.getPosition(),
                ),
              )
            } else {
              transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.getPosition(),
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.getPosition(),
                ),
                transition.duration || 0,
                transition.endPos || element.getPosition(),
              )
            }
          } else {
            if (element instanceof ElementGroup) {
              await Promise.all(
                element.elements.map((groupElement) =>
                  transition.animation?.(
                    groupElement,
                    positionPercentageToPixels(
                      this.sketch,
                      transition.startPos || groupElement.getPosition(),
                    ),
                    positionPercentageToPixels(
                      this.sketch,
                      transition.endPos || groupElement.getPosition(),
                    ),
                    transition.duration || 0,
                    transition.endPos || groupElement.getPosition(),
                  ),
                ),
              )
            } else {
              await transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.getPosition(),
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.getPosition(),
                ),
                transition.duration || 0,
                transition.endPos || element.getPosition(),
              )
            }
          }
        }
        element.onAnimatedIn()
      }
    }
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
        this.elements[elementId].remove()
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
