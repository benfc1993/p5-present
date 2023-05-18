import p5 from 'p5'
import { Position } from '../Slide'
import { SlideElement } from './SlideElement'
import { sizePercentageToPixels } from '../utils/positionPercentageToPixel'
import { referenceScale } from '../Presentation'

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
  capSize: boolean = false

  constructor(
    p: p5,
    position: Position,
    data: RectElementData,
    capSize = false
  ) {
    super(p, position)
    this.data = data
    this.alpha = data.color[3] / 255 || 1
    this.radius = this.setRadius(data.radius)
    this.capSize = capSize
    this.addState()
  }

  draw() {
    this.drawElement(() => {
      this.sketch.push()
      this.data.color[3] = this._opacity * this.alpha * 255
      this.sketch.noStroke()
      this.sketch.fill(this.data.color)
      this.sketch.rectMode('center')
      const { x, y } = this.rectSize()
      this.sketch.rect(
        this.pixelPosition.x,
        this.pixelPosition.y,
        x,
        y,
        ...this.radius
      )
      this.sketch.pop()
    })
  }
  rectSize(): { x: number; y: number } {
    if (
      typeof this.data.size.w === 'string' ||
      typeof this.data.size.h === 'string'
    ) {
      return sizePercentageToPixels(this.sketch, {
        x: this.data.size.w,
        y: this.data.size.h,
      })
    }

    const scaledWidth =
      this.data.size.w * (this.sketch.width / referenceScale.w)
    const scaledHeight =
      this.data.size.h * (this.sketch.width / referenceScale.w)

    return {
      x: this.capSize ? Math.min(scaledWidth, this.data.size.w) : scaledWidth,
      y: this.capSize ? Math.min(scaledHeight, this.data.size.h) : scaledHeight,
    }
  }

  onAnimatedIn() {
    super.onAnimatedIn()
  }

  setRadius(
    radius?:
      | number
      | [number, number]
      | [number, number, number, number]
      | undefined
  ): [number, number, number, number] {
    if (!radius) return [0, 0, 0, 0]
    if (typeof radius === 'number') return [radius, radius, radius, radius]
    if (radius.length === 2) return [radius[0], radius[1], radius[0], radius[1]]
    else return radius
  }
}
