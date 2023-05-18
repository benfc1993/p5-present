import { Component } from 'p5-typescript'
import { inputManager } from './Input'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'

export const referenceScale = {
  w: 1920,
  h: 1080,
}

export class Presentation extends Component {
  started: boolean = false
  slides: Slide[] = []
  currentSlide: number = 0

  constructor(p: p5) {
    super(p)
  }

  async load(p: import('p5')): Promise<void> {
    inputManager.subscribeToKeyDown(this.next.bind(this))
    inputManager.subscribeToClick(this.onClick.bind(this))
    this.slides = presentationData.slides.map((slide) => new Slide(p, slide))
    this.slides.push(
      new Slide(p, { background: [0, 0, 0], frames: [{}], title: 'End slide' })
    )
  }
  draw(): void {
    if (!this.started) {
      this.slides[0].onStartSlide(this.nextSlide.bind(this))
      this.started = true
    }
  }

  onClick = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        if (this.currentSlide === this.slides.length - 1) return
        this.slides[this.currentSlide].nextFrame()
        break
      case 1:
        this.slides[this.currentSlide].lastFrame()
        break
    }
  }

  next = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        if (this.currentSlide === this.slides.length - 1) return
        this.slides[this.currentSlide].nextFrame()
        break
      case 'ArrowLeft':
        if (
          this.currentSlide === 0 &&
          this.slides[this.currentSlide].currentFrame === 0
        )
          return
        this.slides[this.currentSlide].lastFrame()
        break
      case 'ArrowUp':
        if (this.currentSlide === this.slides.length - 1) return
        this.slides[this.currentSlide].onEnd(1)
        break
      case 'ArrowDown':
        if (this.currentSlide === 0) return
        this.slides[this.currentSlide].onEnd(-1)
        break
    }
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
