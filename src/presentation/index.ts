import { colors, fonts } from './fontsList'
import { images } from './imagesList'
import { PresentationData, startPresentation } from '../lib'
import { createElement } from './slides/CreateElement'
import { createElementWithChildren } from './slides/CreateElementChildren'
import { createComponent } from './slides/CreateComponent'
import { hooks } from './slides/hooksFiber'
import { hooksInternals } from './slides/hookInternals'
import { useState } from './slides/useState'
import { rerenderComponent } from './slides/RerenderComponent'
import { coverSlide } from './slides/Cover'
import { intro } from './slides/Intro'

export const presentationData: PresentationData<typeof fonts, typeof images> = {
  titleFont: 'oswald-regular.ttf',
  titleFontSize: 100,
  textFont: 'comfortaa-regular.ttf',
  mainTextFontSize: 46,
  textColor: colors.white,
  fonts,
  images,
  slides: [
    coverSlide,
    intro,
    createElement,
    createElementWithChildren,
    createComponent,
    hooks,
    hooksInternals,
    useState,
    rerenderComponent,
  ],
}
export const { titleFontSize, mainTextFontSize, textFont, titleFont } =
  presentationData

startPresentation(presentationData)

// TODO: check component ref is parent or first child
