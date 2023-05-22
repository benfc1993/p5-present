import { Sketch } from 'p5-typescript'
import { inputManager } from './Input'
import { Presentation } from './Presentation'
import { loadImages } from './assetInitialisation/loadImages'
import { loadFonts } from './assetInitialisation/loadFonts'
import { PresentationPreview, referenceScale } from './PresentationPreview'

export const APP_TYPE =
  window.location.pathname === '/' ? 'audience' : 'presenter'
localStorage.setItem('app_type', APP_TYPE)

let presentation: Presentation

export const sketch = new Sketch(
  (p: p5) => {
    p.preload = () => {
      loadImages(p)
      loadFonts(p)
    }
    p.setup = async () => {
      sketch.addComponent(inputManager)
      if (APP_TYPE === 'presenter')
        sketch.sketch.createCanvas(
          sketch.sketch.windowWidth / 2,
          (sketch.sketch.windowWidth / 2) *
            (referenceScale.h / referenceScale.w)
        )
      presentation = new Presentation(p)
      sketch.addComponent(presentation)
      if (APP_TYPE === 'presenter') {
        setupWatcher()
      }
    }
    p.draw = () => {}
    p.resizeCanvas.addFunction(() => {
      presentation.draw()
    })
  },
  {
    divId: `canvas-${APP_TYPE}`,
    canvasColor: { r: 60, g: 60, b: 64 },
    fullscreen: APP_TYPE === 'audience',
  }
)

const setupWatcher = () => {
  let presenterPresentation: PresentationPreview

  const nextSketch = new Sketch(
    (p: p5) => {
      p.preload = () => {
        loadImages(p)
        loadFonts(p)
      }
      p.setup = async () => {
        nextSketch.sketch.createCanvas(
          sketch.sketch.windowWidth / 2,
          (sketch.sketch.windowWidth / 2) *
            (referenceScale.h / referenceScale.w)
        )
        presenterPresentation = new PresentationPreview(p, presentation)
        nextSketch.addComponent(presenterPresentation)
      }
      p.draw = () => {}
      p.resizeCanvas.addFunction(() => {
        presenterPresentation.draw()
      })
    },
    {
      divId: `canvas-presenter-next`,
      canvasColor: { r: 60, g: 60, b: 64 },
      fullscreen: false,
    }
  )
}
