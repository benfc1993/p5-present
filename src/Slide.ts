import { Component } from 'p5-typescript'
import { AnimationFn } from './Animations/types'
import { SlideElement } from './Elements/SlideElement'
import { positionPercentageToPixels } from './utils/positionPercentageToPixel'
import { images } from './assetInitialisation/loadImages'
import { ElementGroup } from './Elements/ElementGroup'
import { APP_TYPE } from '.'

export type Position = { x: number | string; y: number | string; rot?: number }

export type SlideData = {
  title: string
  background: [number, number, number] | string
  frames: Frame[]
  notes?: string
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
    [elementType: string]: Transition & { element: (p: p5) => SlideElement }
  }
  out?: {
    [id: string]: Transition
  }
}

type Elements = Record<string, SlideElement>

export class Slide extends Component {
  frames: Frame[]
  notes: string | undefined
  currentFrame: number = 0
  elements: Elements = {}
  background: [number, number, number] | string = [60, 60, 64]
  active: boolean = false
  onEndSlide: (dir: number) => void = () => {}

  constructor(p: p5, data: SlideData) {
    super(p)
    this.background = data.background
    this.frames = data.frames
    this.notes = data.notes
  }

  async nextFrame(animate: boolean = true) {
    if (this.currentFrame === this.frames.length - 1) return this.onEnd(1)
    this.currentFrame += 1
    await this.drawFrame(animate)
  }

  lastFrame() {
    if (this.currentFrame === 0) return this.onEnd(-1)
    this.goToFrame(this.currentFrame - 1)
  }

  async goToFrame(index: number, animate: boolean = true) {
    const dir = this.currentFrame < index ? 1 : -1
    while (this.currentFrame !== index) {
      this.currentFrame += dir
      if (dir === 1) {
        await this.drawFrame(animate)
      } else {
        await this.revertFrame()
      }
    }
  }

  onStartSlide(onFinish: (dir: number) => void, preview: boolean = false) {
    this.active = true
    this.onEndSlide = onFinish
    this.drawFrame()
    if (APP_TYPE === 'presenter' && !preview) {
      const notes = document.getElementById('notes')!
      notes.innerHTML = this.notes || ''
    }
  }

  onEnd(dir: number) {
    if (dir < 0) {
      this.goToFrame(0, false)
    }
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
        images[this.background],
        0,
        0,
        this.sketch.width,
        this.sketch.height
      )
    }
    this.sketch.pop()
    Object.values(this.elements).forEach((el) => el.draw())
  }

  async drawFrame(allowAnimation: boolean = true) {
    const frame = this.frames[this.currentFrame]

    if (frame.out) {
      for (const [elementId, transition] of Object.entries(frame.out)) {
        const element = this.elements[elementId]
        if (!transition.animation) {
          element.setPosition(transition.endPos || element.position())
          element.onAnimatedIn()
        } else {
          if (transition.simultaneous) {
            if (element instanceof ElementGroup) {
              element.elements.forEach((groupElement) =>
                transition.animation?.(
                  groupElement,
                  positionPercentageToPixels(
                    this.sketch,
                    transition.startPos || groupElement.position()
                  ),
                  positionPercentageToPixels(
                    this.sketch,
                    transition.endPos || groupElement.position()
                  ),
                  allowAnimation ? transition.duration || 0 : 0,
                  transition.startPos || groupElement.position()
                )
              )
            } else {
              transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.position()
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.position()
                ),
                allowAnimation ? transition.duration || 0 : 0,
                transition.startPos || element.position()
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
                      transition.startPos || groupElement.position()
                    ),
                    positionPercentageToPixels(
                      this.sketch,
                      transition.endPos || groupElement.position()
                    ),
                    allowAnimation ? transition.duration || 0 : 0,
                    transition.startPos || groupElement.position()
                  )
                )
              )
            } else {
              await transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.position()
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.position()
                ),
                allowAnimation ? transition.duration || 0 : 0,
                transition.startPos || element.position()
              )
            }
          }
        }

        element.onAnimatedOut()
      }
    }

    if (frame.in) {
      for (const [elementId, transition] of Object.entries(frame.in)) {
        if (!(elementId in this.elements))
          this.elements[elementId] = transition.element(this.sketch)
        const element = this.elements[elementId]

        if (!transition.animation) {
          element.setPosition(transition.endPos || element.position())
          element.onAnimatedOut()
        } else {
          if (transition.simultaneous) {
            if (element instanceof ElementGroup) {
              element.elements.map((groupElement) =>
                transition.animation?.(
                  groupElement,
                  positionPercentageToPixels(
                    this.sketch,
                    transition.startPos || groupElement.position()
                  ),
                  positionPercentageToPixels(
                    this.sketch,
                    transition.endPos || groupElement.position()
                  ),
                  allowAnimation ? transition.duration || 0 : 0,
                  transition.endPos || groupElement.position()
                )
              )
            } else {
              transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.position()
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.position()
                ),
                allowAnimation ? transition.duration || 0 : 0,
                transition.endPos || element.position()
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
                      transition.startPos || groupElement.position()
                    ),
                    positionPercentageToPixels(
                      this.sketch,
                      transition.endPos || groupElement.position()
                    ),
                    allowAnimation ? transition.duration || 0 : 0,
                    transition.endPos || groupElement.position()
                  )
                )
              )
            } else {
              await transition.animation(
                element,
                positionPercentageToPixels(
                  this.sketch,
                  transition.startPos || element.position()
                ),
                positionPercentageToPixels(
                  this.sketch,
                  transition.endPos || element.position()
                ),
                allowAnimation ? transition.duration || 0 : 0,
                transition.endPos || element.position()
              )
            }
          }
        }
        element.onAnimatedIn()
      }
    }
  }

  async revertFrame() {
    const prevFrame = this.frames[this.currentFrame + 1]
    const frame = this.frames[this.currentFrame]

    if (prevFrame.out)
      for (const [elementId, transition] of Object.entries(prevFrame.out)) {
        this.elements[elementId].onReset()
      }
    if (prevFrame.in)
      for (const [elementId, transition] of Object.entries(prevFrame.in)) {
        this.elements[elementId].remove()
        delete this.elements[elementId]
      }

    if (frame.in)
      for (const [elementId, transition] of Object.entries(frame.in)) {
        if (transition.animation) {
          await transition.animation(
            this.elements[elementId],
            positionPercentageToPixels(
              this.sketch,
              transition.startPos || this.elements[elementId].position()
            ),
            positionPercentageToPixels(
              this.sketch,
              transition.endPos || this.elements[elementId].position()
            ),
            0,
            transition.endPos || this.elements[elementId].position()
          )
        } else {
          this.elements[elementId].setPosition(
            transition.endPos || this.elements[elementId].position()
          )
        }
      }
  }
}
