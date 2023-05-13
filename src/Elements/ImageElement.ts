import { Position } from '../Slide'
import { images } from '../loadImages'
import { SlideElement } from './SlideElement'

type ImageElementDataInput = {
  image: string
  size?: {
    w: number
    h: number
  }
}
type ImageElementData = {
  image: string
  size: {
    w: number
    h: number
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
      this.sketch.tint(255, 255 * this._opacity)
      this.sketch.rectMode('center')
      this.sketch.image(
        this.image,
        this._position.x - this.data.size.w / 2,
        this._position.y - this.data.size.h / 2,
        this.data.size.w,
        this.data.size.h
      )
    })
  }
}
