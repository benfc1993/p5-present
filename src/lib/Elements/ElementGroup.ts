import { Sketch } from 'p5-typescript'
import { PixelPositionRot } from '../Animations/types'
import { Position } from '../Slide'
import { SlideElement } from './SlideElement'

export class ElementGroup extends SlideElement {
  elements: SlideElement[] = []
  elementOffsets: PixelPositionRot[] = []

  constructor(p: Sketch, position: Position, elements: SlideElement[]) {
    super(p, position)
    for (const element of elements) {
      this.elementOffsets.push(element.pixelPosition)
    }

    this.elements = elements
  }

  draw(): void {
    this.drawElement(() => {
      this.elements.map((element) => {
        const currentPos = element.getPosition()
        this.positionElement(element)
        element.draw()
        element.setPosition(currentPos)
      })
    })
  }

  positionElement(element: SlideElement) {
    const { x, y } = this.pixelPosition
    const { x: elX, y: elY } = element.pixelPosition
    element.setPosition({
      x: x + elX,
      y: y + elY,
      rot: element.getPosition().rot,
    })
  }

  onDestroy(): void {
    this.elements.map((element) => element.onDestroy())
    super.onDestroy()
  }
}
