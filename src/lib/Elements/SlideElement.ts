import { Component, ExtendedP5, Sketch } from 'p5-typescript'
import { Position } from '../Slide'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { PixelPositionRot } from '../Animations/types'
import { deepCopy } from '../utils/deepCopy'

export class SlideElement extends Component {
  protected _position: Position = { x: 0, y: 0 }
  get pixelPosition(): PixelPositionRot {
    const { x, y } = positionPercentageToPixels(this.sketch, this._position)

    return { x, y, rot: this._position.rot }
  }

  protected _opacity: number = 1
  protected _state: Partial<SlideElement>[] = []
  protected sketchInstance: Sketch
  get sketch(): ExtendedP5 {
    return this.sketchInstance.sketch
  }

  constructor(p: Sketch, position: Position) {
    super(p)
    this._position = position
    this.sketchInstance = p
  }

  draw() {}

  drawElement(drawFn: () => void) {
    this.sketch.push()
    if (this.pixelPosition.rot) {
      this.sketch.angleMode('degrees')
      this.sketch.translate(this.pixelPosition.x, this.pixelPosition.y)
      this.sketch.rotate(this.pixelPosition.rot)
      this.sketch.translate(-this.pixelPosition.x, -this.pixelPosition.y)
    }

    drawFn()
    this.sketch.pop()
  }

  onAnimatedIn() {
    this.addState()
  }

  onAnimatedOut() {
    this.addState()
  }

  public getPosition() {
    return this._position
  }

  public setPosition(pos: Position) {
    this._position = pos
  }

  public opacity() {
    return this._opacity
  }

  public setOpacity(opacity: number) {
    this._opacity = opacity
  }

  protected addState() {
    const state = {}
    Object.entries(this).map(([key, value]) => {
      if (
        typeof value !== 'function' &&
        key !== 'sketch' &&
        key !== '_state' &&
        key !== 'eventUnsubscriptions'
      ) {
        Object.assign(state, { [key]: value })
      }
    })
    this._state.push(state)
  }

  onReset(): void {
    this._state.pop()
    const state = deepCopy(this._state[this._state.length - 1])
    if (state) {
      Object.entries(state).forEach(([key, value]) =>
        Object.assign(this, { [key]: value }),
      )
    }
  }

  remove() {
    this.onDestroy()
  }
}
