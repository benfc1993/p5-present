import { Sketch } from 'p5-typescript'
import { SlideElement } from './SlideElement'
import { PixelPosition } from 'p5-typescript/dist/types/position'
import { hex } from '../utils/hex'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { Position } from '../Slide'

export class LineElement extends SlideElement {
  start: PixelPosition
  end: PixelPosition
  thickness: number
  color: number[]

  constructor(
    p: Sketch,
    options: {
      start: Position
      end: Position
      color: [number, number, number] | string
      thickness?: number
    },
  ) {
    const { start, end, color, thickness } = options
    super(p, { x: 0, y: 0 })
    this.start = positionPercentageToPixels(this.sketch, start)
    this.end = positionPercentageToPixels(this.sketch, end)
    this.thickness = thickness ?? 3
    this.color = color instanceof Array ? color : hex(color)
  }

  draw(): void {
    this.drawElement(() => {
      this.sketch.strokeWeight(this.thickness)
      this.color[3] = 255 * this._opacity
      this.sketch.stroke(this.color)
      this.sketch.line(
        this.pixelPosition.x + this.start.x,
        this.pixelPosition.y + this.start.y,
        this.pixelPosition.x + this.end.x,
        this.pixelPosition.y + this.end.y,
      )
    })
  }
}
