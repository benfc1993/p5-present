import { Position } from '../Slide'
import { SlideElement } from './SlideElement'
import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN } from 'p5'
import { Sketch } from 'p5-typescript'
import { presentationOptions } from '..'

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
  font: string
}

export class TextElement extends SlideElement {
  protected data: TextElementData

  constructor(
    p: Sketch,
    position: Position,
    data: Partial<TextElementData> = {},
  ) {
    const defaultData: TextElementData = {
      text: '',
      alignment: {
        h: 'left',
        v: 'bottom',
      },
      size: presentationOptions.mainTextFontSize,
      style: 'normal',
      color: [225, 225, 225],
      lineHeight: 1.15,
      font: presentationOptions.textFont,
    }
    super(p, position)
    this.data = defaultData
    Object.entries(data).forEach(([key, value]) =>
      Object.assign(this.data, { [key]: value }),
    )
  }

  onReset(): void {
    this._opacity = 1
  }

  getText(): string | string[] {
    return this.data.text
  }

  setText(text: string | string[]): void {
    this.data.text = text
  }

  getalignment() {
    return this.data.alignment
  }

  setalignment(alignment: { h?: HORIZ_ALIGN; v?: VERT_ALIGN }): void {
    this.data.alignment = alignment
  }

  draw(): void {
    this.drawElement(() => {
      this.sketch.push()
      if (presentationOptions.fonts[this.data.font])
        this.sketch.textFont(presentationOptions.fonts[this.data.font])
      this.sketch.fill([...this.data.color, 255 * this._opacity])
      this.sketch.rectMode('center')
      this.sketch.textAlign(
        this.data.alignment?.h || 'left',
        this.data.alignment?.v || 'bottom',
      )
      this.sketch.textSize(this.data.size)
      this.sketch.textStyle(this.data.style)
      if (this.data.text instanceof Array) {
        this.data.text.forEach((line, idx) =>
          this.sketch.text(
            line,
            this.pixelPosition.x,

            this.pixelPosition.y +
              idx * (this.data.size * this.data.lineHeight + 20),
          ),
        )
      } else {
        this.sketch.text(
          this.data.text,
          this.pixelPosition.x,
          this.pixelPosition.y,
        )
      }
      this.sketch.pop()
    })
  }
}

export class TitleElement extends TextElement {
  constructor(
    p: Sketch,
    position: Position,
    data: Partial<TextElementData> = {},
  ) {
    super(p, position, data)
    this.data.font = presentationOptions.titleFont
  }
}
