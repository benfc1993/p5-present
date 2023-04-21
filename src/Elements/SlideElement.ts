import p5 from 'p5'
import { Component } from 'p5-typescript'
import { Position } from '../Slide'
import { positionPercentageToPixels } from '../utils/positionPercentageToPixel'
import { PixelPosition } from '../Animations/types'
import { deepCopy } from '../utils/deepCopy'

export class SlideElement extends Component {
  protected _position: PixelPosition
  protected _opacity: number = 1
  protected _state: Partial<SlideElement>[] = []

  constructor(p: p5, position: Position) {
    super(p)
    const { x, y } = positionPercentageToPixels(p, position)
    this._position = { x, y, rot: position.rot }
  }

  draw() {}

  drawElement(drawFn: () => void) {
    this.sketch.push()
    if (this._position.rot) {
      this.sketch.angleMode('degrees')
      this.sketch.translate(this._position.x, this._position.y)
      this.sketch.rotate(this._position.rot)
      this.sketch.translate(-this._position.x, -this._position.y)
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

  public position() {
    return this._position
  }

  public setPosition(pos: Position) {
    const { x, y } = positionPercentageToPixels(this.sketch, pos)
    this._position = { ...pos, ...this._position, x, y }
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
        Object.assign(this, { [key]: value })
      )
    }
  }

  remove() {
    this.eventUnsubscriptions.draw()
    this.eventUnsubscriptions.setup()
  }
}
