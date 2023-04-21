import { Sketch } from 'p5-typescript'
import { inputManager } from './Input'
import { Presentation } from './Presentation'
import { loadImages } from './loadImages'

export const sketch = new Sketch(
  (p: p5) => {
    p.preload = () => {
      loadImages(p)
    }
    p.setup = async () => {
      sketch.addComponent(inputManager)
      sketch.addComponent(new Presentation(p))
    }
    p.draw = () => {}
    p.resizeCanvas.addFunction(() => {})
  },
  {
    divId: 'canvas',
    canvasColor: { r: 60, g: 60, b: 64 },
    fullscreen: true,
  }
)
