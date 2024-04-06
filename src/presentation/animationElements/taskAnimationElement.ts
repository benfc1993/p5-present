import { Component, Sketch } from 'p5-typescript'
import {
  AnimationComponent,
  AnimationElement,
  AnimationState,
  PixelPositionRot,
} from '../../lib'

export class TaskAnimationElement extends AnimationElement {
  constructor(p: Sketch, position: PixelPositionRot) {
    super(p, position, new TaskAnimation(p, position))
  }

  onAnimatedIn(): void {
    this.animation.play()
  }
  draw(): void {
    this.drawElement(() => this.animation.draw())
  }
}

export class TaskAnimation extends Component implements AnimationComponent {
  startTime: number
  frameRate: number
  position: PixelPositionRot
  playState: AnimationState = 'STOPPED'

  rotations: number = 0
  taskAngle: number = 0

  completedTasks: number[][] = []
  toDoTasks: number[][] = []
  currentTask: number[] | null = null
  taskSize = { width: 55, height: 40 }
  timeToAdd: number = 0

  constructor(p: Sketch, position: PixelPositionRot) {
    super(p)
    this.position = position
    this.startTime = Infinity
    this.frameRate = 24
  }
  play() {
    this.reset()
    this.playState = 'PLAYING'
  }
  pause() {
    this.playState = 'PAUSED'
  }
  resume() {
    this.playState = 'PLAYING'
  }
  stop() {
    this.playState = 'STOPPED'
    this.reset()
  }

  reset() {
    this.taskAngle = 0
    this.rotations = 0
    this.startTime = Infinity
    this.currentTask = null
    this.completedTasks = []
  }

  setPosition(pos: PixelPositionRot) {
    this.position = pos
  }

  animate() {
    if (this.playState !== 'PLAYING') return

    const randomColor = () => Math.floor(Math.random() * 255)

    if (!this.currentTask) {
      this.currentTask = this.toDoTasks.pop() || null
    }

    if (this.toDoTasks.length < 1 && Date.now() >= this.timeToAdd) {
      this.toDoTasks.unshift([
        randomColor(),
        randomColor(),
        randomColor(),
        255,
        0,
      ])

      this.timeToAdd = Date.now() + Math.random() * 6 * 1000
    }

    this.taskAngle += (this.sketch.PI / 4) * (this.sketch.deltaTime / 1000)

    if (this.taskAngle >= this.sketch.TWO_PI) {
      this.rotations++
      this.taskAngle = 0
    }

    if (!this.currentTask) return

    this.currentTask[4] +=
      (255 / (this.sketch.TWO_PI * 2)) * (this.sketch.deltaTime / 1000)

    // if (this.currentTask[4] >= 255) {
    if (this.toDoTasks.length > 0 || this.currentTask[4] >= 255) {
      if (this.completedTasks.length === 7) this.completedTasks = []
      this.completedTasks.push([...this.currentTask])
      this.currentTask = null
    }
  }

  draw() {
    this.animate()

    this.sketch.push()
    this.sketch.strokeWeight(4)

    this.sketch.push()
    this.sketch.stroke(10, 203, 18, 120)
    this.sketch.fill(10, 203, 18, 120)
    this.sketch.translate(this.position.x, this.position.y)
    this.sketch.rotate(this.taskAngle)
    this.sketch.rect(-100, -10, 20, 20)
    this.sketch.pop()

    this.sketch.push()
    this.sketch.noFill()
    this.sketch.stroke(255)
    this.sketch.circle(this.position.x, this.position.y, 200)
    this.sketch.circle(this.position.x, this.position.y, 160)
    this.sketch.pop()

    if (this.currentTask) {
      this.drawTask(this.position.x, this.position.y, this.currentTask)
    }

    let i = 0
    for (const toDo of this.toDoTasks) {
      this.drawTask(this.position.x + 150, this.position.y + 150 - i * 40, toDo)
      i++
    }

    let j = 0
    for (const completed of this.completedTasks) {
      this.drawTask(
        this.position.x - 150,
        this.position.y + 150 - j * 40,
        completed,
      )
      j++
    }

    this.sketch.pop()
  }

  drawTask(x: number, y: number, fill: number[]) {
    this.sketch.push()
    this.sketch.rectMode('center')
    this.sketch.stroke(255)
    this.sketch.fill(fill)
    this.sketch.strokeWeight(2)
    this.sketch.rect(x, y, this.taskSize.width, this.taskSize.height)
    this.sketch.noStroke()
    this.sketch.fill(fill[0] > 200 || fill[1] > 200 || fill[2] > 200 ? 0 : 255)
    this.sketch.textAlign('center', 'center')
    this.sketch.text(`${Math.floor((fill[4] / 255) * 100)}%`, x, y)
    this.sketch.pop()
  }
}
