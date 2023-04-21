import p5 from 'p5'
import { Position } from '../Slide'
import { SlideElement } from './SlideElement'

type RectElementData = {
  size: {
    w: number
    h: number
  }
  color: number[]
}

export class RectElement extends SlideElement {
  private data: RectElementData

  constructor(p: p5, position: Position, data: RectElementData) {
    super(p, position)
    this.data = data
    this.addState()
  }

  draw() {
    this.drawElement(() => {
      this.sketch.push()
      this.data.color[3] = this._opacity * 255
      this.sketch.noStroke()
      this.sketch.fill(this.data.color)
      this.sketch.rect(
        this._position.x,
        this._position.y,
        this.data.size.w,
        this.data.size.h
      )
      this.sketch.pop()
    })
  }

  onAnimatedIn() {
    this.data.color = [0, 255, 0, 255]
    super.onAnimatedIn()
  }
}
