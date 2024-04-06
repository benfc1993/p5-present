import { addFunction, Sketch } from 'p5-typescript'
import { Presentation } from './Presentation'
import { loadImages } from './assetInitialisation/loadImages'
import { loadFonts } from './assetInitialisation/loadFonts'
import { SlideData } from './Slide'
import p5 from 'p5'
export * from 'p5-typescript'

class PresentationOptions
  implements Omit<PresentationData, 'slides' | 'images' | 'fonts'>
{
  titleFont: Lowercase<string> = ''
  titleFontSize: number = 0
  textFont: Lowercase<string> = ''
  mainTextFontSize: number = 0
  fonts: Record<string, p5.Font> = {}
  images: Record<string, p5.Image> = {}

  public setData(presentationData: PresentationData): void {
    this.textFont = presentationData.textFont
    this.mainTextFontSize = presentationData.mainTextFontSize
    this.titleFont = presentationData.titleFont
    this.titleFontSize = presentationData.titleFontSize
  }

  public setFonts(fonts: Record<string, p5.Font>): void {
    this.fonts = fonts
  }

  public setImages(images: Record<string, p5.Image>): void {
    this.images = images
  }
}

export type PresentationData<
  TFonts extends readonly string[] = readonly string[],
  TImages extends readonly string[] = readonly string[],
> = {
  titleFont: Lowercase<TFonts[number]>
  titleFontSize: number
  textFont: Lowercase<TFonts[number]>
  mainTextFontSize: number
  fonts?: TFonts
  images?: TImages
  slides: SlideData[]
}

export const presentationOptions = new PresentationOptions()

export let sketch: Sketch

export const startPresentation = (presentationData: PresentationData) => {
  let presentation: Presentation
  sketch = new Sketch(
    (p) => {
      p.preload = () => {
        presentationOptions.setImages(
          loadImages(p, presentationData.images ?? []),
        )
        presentationOptions.setFonts(loadFonts(p, presentationData.fonts ?? []))
        presentationOptions.setData(presentationData)
      }
      p.setup = async () => {
        presentation = sketch.addComponent(Presentation, presentationData)
      }
      p.draw = () => {}
    },
    {
      divId: 'canvas',
      canvasColor: { r: 60, g: 60, b: 64 },
      fullscreen: true,
    },
  )
  sketch.sketch.windowResized = addFunction(sketch.sketch.windowResized, () =>
    presentation.draw(),
  )
}

export * from './Elements'
export * from './Animations'
export * from './Input'
export * from './Presentation'
export * from './Slide'
