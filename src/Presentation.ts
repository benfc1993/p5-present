import { Component } from 'p5-typescript'
import { inputManager } from './Input'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'

export class Presentation extends Component {
  started: boolean = false
  slides: Slide[] = []
  currentSlide: number = 0

  constructor(p: p5) {
    super(p)
  }

  load(p: import('p5')): void {
    inputManager.subscribeToKeyDown(this.next.bind(this))
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

  next = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        this.slides[this.currentSlide].nextFrame()
        break
      case 'ArrowLeft':
        this.slides[this.currentSlide].lastFrame()
        break
      case 'ArrowUp':
        this.slides[this.currentSlide].onEnd(1)
        break
      case 'ArrowDown':
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
