import { Component } from 'p5-typescript'
import { inputManager } from './Input'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'
import { socket } from './socket'
import { APP_TYPE } from '.'

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
          if (data.caller === socket.id) return
          this.prevFrame()
      }
    })
  }

  handleNextFrame(data: any) {
    const slide = this.slides[this.currentSlide]
    if (data.frame > 0 && slide.currentFrame + 1 !== data.frame) {
      slide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      this.slides[this.currentSlide].goToFrame(data.frame)
      return
    }
    const lastFrame = slide.currentFrame === slide.frames.length - 1
    if (lastFrame && this.currentSlide + 1 !== data.slide) {
      slide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      this.slides[this.currentSlide].goToFrame(data.frame)
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
        this.nextFrame()
        socket.emit('nextFrame', {
          slide: this.currentSlide,
          frame: this.slides[this.currentSlide].currentFrame,
        })
        break
      case 1:
        this.prevFrame()
        socket.emit('prevFrame', {
          slide: this.currentSlide,
          frame: this.slides[this.currentSlide].currentFrame,
        })
        break
    }
  }

  onKeyPressed = async (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        if (this.currentSlide === this.slides.length - 1) return
        this.nextFrame()
        socket.emit('nextFrame', {
          slide: this.currentSlide,
          frame: this.slides[this.currentSlide].currentFrame,
        })
        break
      case 'ArrowLeft':
        if (
          this.currentSlide === 0 &&
          this.slides[this.currentSlide].currentFrame === 0
        )
          return

        this.prevFrame()
        socket.emit('prevFrame', {
          slide: this.currentSlide,
          frame: this.slides[this.currentSlide].currentFrame,
        })
        break
      // case 'ArrowUp':
      //   if (this.currentSlide === this.slides.length - 1) return
      //   this.slides[this.currentSlide].onEnd(1)
      //   await this.slides[this.currentSlide].goToFrame(
      //     this.slides[this.currentSlide].frames.length - 1
      //   )
      //   break
      // case 'ArrowDown':
      //   if (this.currentSlide === 0) return
      //   await this.slides[this.currentSlide].goToFrame(0)
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
