import { PixelPosition } from '../Animations/types'
import { referenceScale } from '../PresentationPreview'
import { Position } from '../Slide'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { SlideElement } from './SlideElement'

export class ElementGroup extends SlideElement {
  elements: SlideElement[] = []
  elementOffsets: PixelPosition[] = []

  constructor(p: p5, position: Position, elements: SlideElement[]) {
    super(p, position)
    for (const element of elements) {
      // if (
      //   typeof element.position().x === 'string' ||
      //   typeof element.position().y === 'string'
      // )
      //   throw new Error(`Group elements cannot have relative positions`)
      this.elementOffsets.push(element.pixelPosition)
    }

    this.elements = elements
  }

  draw(): void {
    this.drawElement(() => {
      this.elements.map((element) => {
        const currentPos = element.position()
        this.positionElement(element)
        element.draw()
        element.setPosition(currentPos)
      })
    })
  }

  positionElement(element: SlideElement) {
    const { x, y } = this.pixelPosition
    const { x: elX, y: elY } = element.pixelPosition
    console.log(this.elements)
    console.log(x)
    console.log(elX)
    element.setPosition({
      x: (x + elX) / (this.sketch.width / referenceScale.w),
      y: (y + elY) / (this.sketch.height / referenceScale.h),
      rot: element.position().rot,
    })
  }
}
