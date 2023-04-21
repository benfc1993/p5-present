import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN, WRAP_STYLE } from '../../p5'
import { Position } from '../Slide'
import { SlideElement } from './SlideElement'

type TextElementData = {
  text: string
  alignment: {
    h: HORIZ_ALIGN
    v: VERT_ALIGN
  }
  size: number
  style: THE_STYLE
  color: [number, number, number]
}

export class TextElement extends SlideElement {
  private data: TextElementData
  constructor(p: p5, position: Position, data: Partial<TextElementData> = {}) {
    const defaultData: TextElementData = {
      text: '',
      alignment: {
        h: 'left',
        v: 'bottom',
      },
      size: 14,
      style: 'normal',
      color: [255, 255, 255],
    }
    super(p, position)
    this.data = defaultData
    Object.entries(data).forEach(([key, value]) =>
      Object.assign(this.data, { [key]: value })
    )
  }

  onReset(): void {
    this._opacity = 1
  }

  draw(): void {
    this.drawElement(() => {
      this.sketch.push()
      this.sketch.fill([...this.data.color, 255 * this._opacity])
      this.sketch.textAlign(this.data.alignment.h, this.data.alignment.v)
      this.sketch.textSize(this.data.size)
      this.sketch.textStyle(this.data.style)
      this.sketch.text(this.data.text, this._position.x, this._position.y)
      this.sketch.pop()
    })
  }
}
