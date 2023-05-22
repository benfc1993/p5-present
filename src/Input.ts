import { Component } from 'p5-typescript'

export class InputManager extends Component {
  onClickSubscribers: Set<(e: MouseEvent) => void> = new Set()
  onKeyDownSubscribers: Set<(e: KeyboardEvent) => void> = new Set()

  subscribeToClick(sub: (e: MouseEvent) => void) {
    this.onClickSubscribers.add(sub)
    return () => this.onClickSubscribers.delete(sub)
  }

  subscribeToKeyDown(sub: (e: KeyboardEvent) => void) {
    this.onKeyDownSubscribers.add(sub)
    return () => this.onKeyDownSubscribers.delete(sub)
  }

  onClick(e: MouseEvent) {
    if (
      this.sketch.mouseX < 0 ||
      this.sketch.mouseX > this.sketch.width ||
      this.sketch.mouseY < 0 ||
      this.sketch.mouseY > this.sketch.height
    )
      return
    e.preventDefault()
    this.onClickSubscribers.forEach((subscriber) => subscriber(e))
  }

  onKeyPress(event?: KeyboardEvent | undefined) {
    if (!event) return
    this.onKeyDownSubscribers.forEach((subscriber) => subscriber(event))
  }
  setup(): void {
    this.sketch.mouseClicked = this.onClick.bind(this)
    this.sketch.mouseButton = this.onClick.bind(this)
    this.sketch.keyPressed = this.onKeyPress.bind(this)
  }

  draw(): void {}
}

export const inputManager = new InputManager()
