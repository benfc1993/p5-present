import { Position } from '../Slide'
import { images } from '../assetInitialisation/loadImages'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { SlideElement } from './SlideElement'

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
  constructor(p: p5, position: Position, data: ImageElementDataInput) {
    super(p, position)
    this.image = images[data.image]
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
      const { x, y } = positionPercentageToPixels(this.sketch, {
        x: this.data.size.w || 0,
        y: this.data.size.h || 0,
      })

      const width = x ? x : y * (this.image.width / this.image.height)
      const height = y ? y : x * (this.image.height / this.image.width)

      this.sketch.tint(255, 255 * this._opacity)
      this.sketch.rectMode('center')
      this.sketch.image(
        this.image,
        this.pixelPosition.x - width / 2,
        this.pixelPosition.y - height / 2,
        width,
        height
      )
    })
  }
}
