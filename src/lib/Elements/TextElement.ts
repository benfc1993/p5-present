import { Position } from '../Slide'
import { SlideElement } from './SlideElement'
import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN } from 'p5'
import { ExtendedP5, Sketch } from 'p5-typescript'
import { presentationOptions } from '..'
import { hex } from '../utils/hex'

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
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'text' && typeof value === 'string' && value.includes('\n')) {
        this.data.text = value.split('\n')
        return
      }
      Object.assign(this.data, { [key]: value })
    })
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
    if (this._removed) return
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
        const textLineHight = this.data.size * this.data.lineHeight * 1.5
        const yOffset =
          this.data.alignment.v === 'center'
            ? (-this.data.text.length * textLineHight) / 2
            : 0
        this.data.text.forEach((line, idx) => {
          drawText(
            line,
            this.data.color,
            this._opacity,

            this.pixelPosition.x,

            this.pixelPosition.y + idx * textLineHight + yOffset,
            this.sketch,
          )
        })
      } else {
        drawText(
          this.data.text,
          this.data.color,
          this._opacity,
          this.pixelPosition.x,
          this.pixelPosition.y,

          this.sketch,
        )
      }
      this.sketch.pop()
    })
  }
}

function drawText(
  str: string,
  defaultColor: [number, number, number],
  opacity: number,
  x: number,
  y: number,
  sketch: ExtendedP5,
) {
  const arr = str.split('[*').flatMap((sub) => sub.split('*]'))
  let offset = 0
  arr.forEach((line) => {
    if (line.slice(1).startsWith('#')) {
      sketch.fill([...hex(line.slice(1, -1)), 255 * opacity])
      return
    }

    if (line.match(/^\(\d+,\d+,\d+\)$/)) {
      sketch.fill([
        ...(line
          .slice(1, -1)
          .split(',')
          .map((s) => parseInt(s)) as [number, number, number]),
        255 * opacity,
      ])
      return
    }

    if (line === '0r') {
      sketch.fill([...defaultColor, 255 * opacity])
      return
    }
    sketch.text(line, x + offset, y)
    offset += sketch.textWidth(line)
  })
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
