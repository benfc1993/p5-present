import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN, WRAP_STYLE } from '../../p5'
import { Position } from '../Slide'
import { fonts } from '../assetInitialisation/loadFonts'
import { titleFont, textFont } from '../presentation/presentationData'
import { SlideElement } from './SlideElement'

export type TextElementData = {
  text: string | string[]
  alignment: {
    h?: HORIZ_ALIGN
    v?: VERT_ALIGN
  }
  size: number
  style: THE_STYLE
  color: [number, number, number]
  lineHeight: 1 | 1.15 | 1.5 | 1.75 | 2
}

export class TextElement extends SlideElement {
  private data: TextElementData
  protected font: string = textFont

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
      lineHeight: 1.15,
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
      this.sketch.textFont(fonts[this.font])
      this.sketch.fill([...this.data.color, 255 * this._opacity])
      this.sketch.textAlign(
        this.data.alignment?.h || 'left',
        this.data.alignment?.v || 'bottom'
      )
      this.sketch.textSize(this.data.size)
      this.sketch.textStyle(this.data.style)
      if (this.data.text instanceof Array) {
        this.data.text.forEach((line, idx) =>
          this.sketch.text(
            line,
            this.pixelPosition.x,
            this.pixelPosition.y +
              idx * (this.data.size * this.data.lineHeight + 20)
          )
        )
      } else {
        this.sketch.text(
          this.data.text,
          this.pixelPosition.x,
          this.pixelPosition.y
        )
      }
      this.sketch.pop()
    })
  }
}

export class TitleElement extends TextElement {
  constructor(p: p5, position: Position, data: Partial<TextElementData> = {}) {
    super(p, position, data)
    this.font = titleFont
  }
}
