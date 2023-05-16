import { Sketch } from 'p5-typescript'
import { inputManager } from './Input'
import { Presentation } from './Presentation'
import { loadImages } from './assetInitialisation/loadImages'
import { loadFonts } from './assetInitialisation/loadFonts'

let presentation: Presentation

export const sketch = new Sketch(
  (p: p5) => {
    p.preload = () => {
      loadImages(p)
      loadFonts(p)
    }
    p.setup = async () => {
      sketch.addComponent(inputManager)
      presentation = new Presentation(p)
      sketch.addComponent(presentation)
    }
    p.draw = () => {}
    p.resizeCanvas.addFunction(() => {
      presentation.draw()
    })
  },
  {
    divId: 'canvas',
    canvasColor: { r: 60, g: 60, b: 64 },
    fullscreen: true,
  }
)
