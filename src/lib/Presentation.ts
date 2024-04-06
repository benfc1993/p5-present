import { Component, Sketch } from 'p5-typescript'
import { Slide } from './Slide'
import { PresentationData } from '.'

export class Presentation extends Component {
  started: boolean = false
  slides: Slide[] = []
  currentSlide: number = 0
  presentationData: PresentationData

  constructor(p: Sketch, presentationData: PresentationData) {
    super(p)
    this.presentationData = presentationData
  }

  async onLoad(): Promise<void> {
    this.subscribeToKeyPressed(this.next.bind(this))
    this.subscribeToMousePressed(this.onClick.bind(this))
    this.slides = this.presentationData.slides.map(
      (slide) => new Slide(this.sketchInstance, slide),
    )
    this.slides.push(
      new Slide(this.sketchInstance, {
        background: [0, 0, 0],
        frames: [{}],
        title: 'End slide',
      }),
    )
  }
  draw(): void {
    if (!this.started && this.slides.length > 0) {
      this.slides[0].onStartSlide(this.nextSlide.bind(this))
      this.started = true
    }
  }

  onClick = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        if (this.currentSlide === this.slides.length - 1) return false
        this.slides[this.currentSlide].nextFrame()
        return true
      case 1:
        this.slides[this.currentSlide].lastFrame()
        return true
    }

    return false
  }

  next = (e: KeyboardEvent) => {
    let handled = false
    switch (e.code) {
      case 'ArrowRight':
        if (this.currentSlide === this.slides.length - 1) break

        this.slides[this.currentSlide].nextFrame()
        handled = true
        break
      case 'ArrowLeft':
        if (
          this.currentSlide === 0 &&
          this.slides[this.currentSlide].currentFrame === 0
        )
          break
        this.slides[this.currentSlide].lastFrame()
        handled = true
        break
      case 'ArrowUp':
        if (this.currentSlide === this.slides.length - 1) break
        this.slides[this.currentSlide].onEnd(1)
        handled = true
        break
      case 'ArrowDown':
        if (this.currentSlide === 0) break
        this.slides[this.currentSlide].onEnd(-1)
        handled = true
        break
    }

    return handled
  }

  nextSlide(dir: number) {
    if (this.currentSlide + dir === this.slides.length) {
      console.log('end')
    } else if (this.currentSlide + dir >= 0) {
      this.slides[this.currentSlide].active = false
      this.currentSlide += dir
      this.slides[this.currentSlide].onStartSlide(this.nextSlide.bind(this))
    }
  }
}
