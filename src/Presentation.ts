import { Component } from 'p5-typescript'
import { inputManager } from './Input'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'
import { createSocket } from './socket'
import { APP_TYPE } from '.'
import { PresentationSocket, TransitionData } from './socketTypes'

export const referenceScale = {
  w: 1920,
  h: 1080,
}

export class Presentation extends Component {
  socket!: PresentationSocket
  started: boolean = false
  slides: Slide[] = []
  currentSlide: number = 0
  get activeSlide(): Slide {
    return this.slides[this.currentSlide]
  }
  listeners: ((data: { slide: number; frame: number }) => Promise<void>)[] = []

  constructor(p: p5) {
    super(p)

    if (APP_TYPE === 'presenter') {
      document.querySelector('.presenter ')!.classList.add('show')
    }
  }
  setupSocket() {
    this.socket.onAny((message, data) => {
      switch (message) {
        case 'nextFrame':
        case 'prevFrame':
          if (data.caller === this.socket.id) return
          this.handleChangeFrame(data)
          break
      }
    })
  }

  addListener(listener: (data: any) => Promise<void>) {
    this.listeners.push(listener)
  }

  async load(p: import('p5')): Promise<void> {
    inputManager.subscribeToKeyDown(this.onKeyPressed.bind(this))
    inputManager.subscribeToClick(this.onClick.bind(this))
    this.slides = presentationData.slides.map((slide) => new Slide(p, slide))
    this.slides.push(
      new Slide(p, { background: [0, 0, 0], frames: [{}], title: 'End slide' })
    )

    this.socket = createSocket()
    this.setupSocket()
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
        this.socket.emit('nextFrame', this.nextFrameData(1))
        this.nextFrame()
        break
      case 1:
        this.socket.emit('prevFrame', {
          slide: this.currentSlide,
          frame: this.activeSlide.currentFrame,
        })
        this.prevFrame()
        break
    }
  }

  onKeyPressed = async (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowRight':
        if (this.currentSlide === this.slides.length - 1) return
        this.socket.emit('nextFrame', this.nextFrameData(1))
        this.nextFrame()
        break
      case 'ArrowLeft':
        if (this.currentSlide === 0 && this.activeSlide.currentFrame === 0)
          return
        this.socket.emit('prevFrame', this.nextFrameData(-1))
        this.prevFrame()
        break
      // case 'ArrowUp':
      //   if (this.currentSlide === this.slides.length - 1) return
      //   this.activeSlide.onEnd(1)
      //   await this.activeSlide.goToFrame(
      //     this.activeSlide.frames.length - 1
      //   )
      //   break
      // case 'ArrowDown':
      //   if (this.currentSlide === 0) return
      //   await this.activeSlide.goToFrame(0)
      //   this.activeSlide.onEnd(-1)
      //   break
    }
  }

  nextFrameData(dir: 1 | -1): TransitionData {
    const changeSlide =
      this.activeSlide.currentFrame + dir < 0 ||
      this.activeSlide.currentFrame + dir >= this.activeSlide.frames.length

    return {
      slide: changeSlide ? this.currentSlide + dir : this.currentSlide,
      frame: changeSlide
        ? dir < 0
          ? this.slides[this.currentSlide - 1].frames.length - 1
          : 0
        : this.activeSlide.currentFrame + dir,
    }
  }

  protected async handleChangeFrame(data: any) {
    this.sendChangeToListeners(data)
    if (this.currentSlide === data.slide) {
      if (Math.abs(this.currentSlide - data.slide) === 1)
        this.activeSlide.goToFrame(data.frame)
      else if (data.frame <= this.activeSlide.frames.length - 1)
        await this.activeSlide.goToFrame(data.frame)
    } else {
      await this.activeSlide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      await this.activeSlide.onStartSlide(this.nextSlide.bind(this), true)
      await this.activeSlide.goToFrame(data.frame)
    }
  }

  private async nextFrame() {
    this.sendChangeToListeners(this.nextFrameData(1))
    await this.activeSlide.nextFrame()
  }

  private async prevFrame() {
    this.sendChangeToListeners(this.nextFrameData(-1))
    await this.activeSlide.lastFrame()
  }

  nextSlide(dir: number) {
    if (this.currentSlide + dir === this.slides.length) {
      console.log('end')
    } else if (this.currentSlide + dir >= 0) {
      this.activeSlide.active = false
      this.currentSlide += dir
      this.activeSlide.onStartSlide(this.nextSlide.bind(this))
    }
  }

  sendChangeToListeners(data: { slide: number; frame: number }) {
    this.listeners.forEach((listener) => listener(data))
  }
}
