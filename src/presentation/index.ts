import { fonts } from './fontsList'
import { images } from './imagesList'
import { PresentationData, startPresentation } from '../lib'
import { createElement } from './slides/CreateElement'
import { Component } from './slides/Component'
import { createElementWithChildren } from './slides/CreateElementChildren'
import { createComponent } from './slides/CreateComponent'
import { hooks } from './slides/hooks'

export const presentationData: PresentationData<typeof fonts, typeof images> = {
  titleFont: 'oswald-regular.ttf',
  titleFontSize: 100,
  textFont: 'comfortaa-regular.ttf',
  mainTextFontSize: 46,
  fonts,
  images,
  slides: [
    // coverSlide,
    createElement,
    createElementWithChildren,
    // Component,
    createComponent,
    hooks,
  ],
}
export const { titleFontSize, mainTextFontSize, textFont, titleFont } =
  presentationData

startPresentation(presentationData)
