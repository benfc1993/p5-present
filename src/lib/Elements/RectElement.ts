import { Position } from '../Slide'
import { SlideElement } from './SlideElement'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { Sketch } from 'p5-typescript'

type RectElementData = {
  size: {
    w: string | number
    h: string | number
  }
  color?: number[]
  stroke?: number[]
  strokeWeight?: number
  radius?: number | [number, number] | [number, number, number, number]
}

export class RectElement extends SlideElement {
  private data: RectElementData
  alpha: number = 1
  radius: [number, number, number, number]
  color: number[] = [255, 255, 255, 0]
  stroke: number[] | null = null
  strokeWeight: number = 1

  constructor(p: Sketch, position: Position, data: RectElementData) {
    super(p, position)
    this.data = data
    if (data.color) this.color = data.color
    if (data.stroke) this.stroke = data.stroke
    if (data.strokeWeight) this.strokeWeight = data.strokeWeight
    this.alpha = data?.color ? (data.color?.[3] ?? 255) / 255 : 0
    this.radius = this.setRadius(data.radius)
    this.addState()
  }

  draw() {
    this.drawElement(() => {
      this.color[3] = 255 * this.alpha * this._opacity
      this.sketch.noStroke()

      if (this.stroke) {
        this.stroke[3] = 255 * this.alpha * this._opacity
        this.sketch.strokeWeight(this.strokeWeight)
        this.sketch.stroke(this.stroke)
      }

      this.sketch.fill(this.color)
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
