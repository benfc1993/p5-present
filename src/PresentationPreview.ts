import { Component, addFunction } from 'p5-typescript'
import { Slide } from './Slide'
import { presentationData } from './presentation/presentationData'
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
  get activeSlide(): Slide {
    return this.slides[this.currentSlide]
  }

  constructor(p: p5, reference: Presentation) {
    super(p)
    this.reference = reference
    this.setupWatcher()

    if (APP_TYPE === 'presenter') {
      document.querySelector('.presenter ')!.classList.add('show')
    }
  }

  setupWatcher() {
    this.reference.addListener(this.handleChangeFrame.bind(this))
  }

  async load(p: import('p5')): Promise<void> {
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
      this.slides[0].onStartSlide(this.nextSlide.bind(this), true)
      this.activeSlide.nextFrame()
      this.started = true
    }
    this.sketch.rect(0, 0, 100, 30)
    this.sketch.push()
    this.sketch.rectMode('corner')
    this.sketch.textAlign('center')
    this.sketch.textSize(16)
    this.sketch.text('Next Frame', 0, 7, 100, 30)
    this.sketch.pop()
  }

  nextSlide(dir: number) {
    if (this.currentSlide + dir === this.slides.length) {
      console.log('end')
    } else if (this.currentSlide + dir >= 0) {
      this.activeSlide.active = false
      this.currentSlide += dir
      this.activeSlide.onStartSlide(this.nextSlide.bind(this), true)
    }
  }

  async handleChangeFrame(data: any) {
    if (data.frame >= this.slides[data.slide].frames.length) {
      data.slide++
      data.frame = 0
    }

    if (this.currentSlide === data.slide) {
      if (Math.abs(this.currentSlide - data.slide) === 1)
        this.activeSlide.goToFrame(data.frame, false)
      else if (data.frame <= this.activeSlide.frames.length - 1)
        await this.activeSlide.goToFrame(data.frame, false)
      this.activeSlide.nextFrame(false)
    } else {
      await this.activeSlide.onEnd(data.slide - this.currentSlide)
      this.currentSlide = data.slide
      await this.activeSlide.onStartSlide(this.nextSlide.bind(this), true)
      await this.activeSlide.goToFrame(data.frame, false)
      this.activeSlide.nextFrame(false)
    }
  }
}
