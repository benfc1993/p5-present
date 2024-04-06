import { Position } from '../Slide'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { SlideElement } from './SlideElement'
import p5 from 'p5'
import { Sketch } from 'p5-typescript'
import { presentationOptions } from '..'

type ImageElementDataInput = {
  image: string
  size?:
    | {
        w: number | string
        h?: number | string
      }
    | {
        w?: number | string
        h: number | string
      }
}
type ImageElementData = {
  image: string
  size:
    | {
        w: number | string
        h?: number | string
      }
    | {
        w?: number | string
        h: number | string
      }
}

export class ImageElement extends SlideElement {
  data: ImageElementData
  image: p5.Image
  constructor(p: Sketch, position: Position, data: ImageElementDataInput) {
    super(p, position)
    this.image = presentationOptions.images[data.image]
    this.data = {
      size: {
        w: this.image.width,
        h: this.image.height,
        ...data.size,
      },
      ...data,
    }
  }

  draw(): void {
    this.drawElement(() => {
      const { x: w, y: h } = positionPercentageToPixels(this.sketch, {
        x: this.data.size.w || 0,
        y: this.data.size.h || 0,
      })

      const width = w ? w : h * (this.image.width / this.image.height)
      const height = h ? h : w * (this.image.height / this.image.width)

      this.sketch.tint(255, 255 * this._opacity)
      this.sketch.rectMode('center')
      this.sketch.image(
        this.image,
        this.pixelPosition.x - width / 2,
        this.pixelPosition.y - height / 2,
        width,
        height,
      )
    })
  }
}
