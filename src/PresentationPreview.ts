import { Component, addFunction } from 'p5-typescript'
import { inputManager } from './Input'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'
import { socket } from './socket'
import { APP_TYPE } from '.'
import { Presentation } from './Presentation'

export const referenceScale = {
  w: 1920,
  h: 1080,
}

export class PresentationPreview extends Component {
  reference: Presentation
  started: boolean = false
  slides: Slide[] = []
  currentSlide: number = 0
  start: { slide: number; frame: number } = { slide: 0, frame: 0 }

  constructor(p: p5, reference: Presentation) {
    super(p)
    this.reference = reference
    this.setupSocket()

    if (APP_TYPE === 'presenter') {
      document.querySelector('.presenter ')!.classList.add('show')
    }
  }
  setupSocket() {
    socket.onAny((message, data) => {
      switch (message) {
        case 'nextFrame':
          if (data.caller === socket.id) return
          this.handleNextFrame(data)
          break
        case 'prevFrame':
          if (data.caller !== socket.id) this.prevFrame()
      }
    })
  }

  async handleNextFrame(data: any) {
    if (data.caller === socket.id) return
    const slide = this.slides[this.currentSlide]
    if (data.frame > 0 && slide.currentFrame + 1 !== data.frame) {
      slide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      await this.slides[this.currentSlide].goToFrame(data.frame)
      await this.slides[this.currentSlide].nextFrame()
      return
    }
    const lastFrame = slide.currentFrame === slide.frames.length - 1
    if (lastFrame && this.currentSlide + 1 !== data.slide) {
      slide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      await this.slides[this.currentSlide].goToFrame(data.frame)
      await this.slides[this.currentSlide].nextFrame()
      return
    }
    this.nextFrame()
  }

  async load(p: import('p5')): Promise<void> {
    inputManager.subscribeToKeyDown(this.onKeyPressed.bind(this))
    inputManager.subscribeToClick(this.onClick.bind(this))
    this.slides = presentationData.slides.map((slide) => new Slide(p, slide))
    this.slides.push(
      new Slide(p, { background: [0, 0, 0], frames: [{}], title: 'End slide' })
    )
    this.slides.push(
      new Slide(p, { background: [0, 0, 0], frames: [{}], title: 'End slide' })
    )
  }
  draw(): void {
    if (!this.started) {
      this.slides[0].onStartSlide(this.nextSlide.bind(this))
      this.slides[this.currentSlide].nextFrame()
      this.started = true
      this.start = {
        slide: this.currentSlide,
        frame: this.slides[this.currentSlide].currentFrame,
      }
    }
    this.sketch.rect(0, 0, 100, 30)
    this.sketch.push()
    this.sketch.rectMode('corner')
    this.sketch.textAlign('center')
    this.sketch.textSize(16)
    this.sketch.text('Next Frame', 0, 7, 100, 30)
    this.sketch.pop()
  }

  onClick = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        if (this.currentSlide === this.slides.length - 1) return
        this.nextFrame()
        break
      case 1:
        if (
          this.currentSlide === this.start.slide &&
          this.slides[this.currentSlide].currentFrame === this.start.frame
        )
          this.prevFrame()
        break
    }
  }

  onKeyPressed = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        if (this.currentSlide === this.slides.length - 1) return
        this.nextFrame()
        break
      case 'ArrowLeft':
        if (
          this.currentSlide === this.start.slide &&
          this.slides[this.currentSlide].currentFrame === this.start.frame
        )
          return

        this.prevFrame()
        break
      // case 'ArrowUp':
      //   if (this.currentSlide === this.slides.length - 1) return
      //   this.slides[this.currentSlide].onEnd(1)
      //   break
      // case 'ArrowDown':
      //   if (this.currentSlide === 0) return
      //   this.slides[this.currentSlide].onEnd(-1)
      //   break
    }
  }

  nextFrame() {
    this.slides[this.currentSlide].nextFrame()
  }

  prevFrame() {
    this.slides[this.currentSlide].lastFrame()
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
