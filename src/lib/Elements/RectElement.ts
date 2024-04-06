import { Position } from '../Slide'
import { SlideElement } from './SlideElement'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { Sketch } from 'p5-typescript'

type RectElementData = {
  size: {
    w: string | number
    h: string | number
  }
  color: number[]
  radius?: number | [number, number] | [number, number, number, number]
}

export class RectElement extends SlideElement {
  private data: RectElementData
  alpha: number = 1
  radius: [number, number, number, number]

  constructor(p: Sketch, position: Position, data: RectElementData) {
    super(p, position)
    this.data = data
    this.alpha = data.color[3] / 255 || 1
    this.radius = this.setRadius(data.radius)
    this.addState()
  }

  draw() {
    this.drawElement(() => {
      this.sketch.push()
      this.data.color[3] = this._opacity * this.alpha * 255
      this.sketch.noStroke()
      this.sketch.fill(this.data.color)
      this.sketch.rectMode('center')
      const { x, y } = positionPercentageToPixels(this.sketch, {
        x: this.data.size.w,
        y: this.data.size.h,
      })
      this.sketch.rect(
        this.pixelPosition.x,
        this.pixelPosition.y,
        x,
        y,
        ...this.radius,
      )
      this.sketch.pop()
    })
  }

  onAnimatedIn() {
    super.onAnimatedIn()
  }

  setRadius(
    radius?:
      | number
      | [number, number]
      | [number, number, number, number]
      | undefined,
  ): [number, number, number, number] {
    if (!radius) return [0, 0, 0, 0]
    if (typeof radius === 'number') return [radius, radius, radius, radius]
    if (radius.length === 2) return [radius[0], radius[1], radius[0], radius[1]]
    else return radius
  }
}
