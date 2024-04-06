import { AdhdBrain } from './slides/AdhdBrain'
import { coverSlide } from './slides/Cover'
import { introSlide } from './slides/Intro'
import { elephant } from './slides/elephant'
import { elephantEasy } from './slides/elephantEasy'
import { elephantSmall } from './slides/elephantSmall'
import { hyperfocus } from './slides/hyperfocus'
import { titleSlide } from './slides/templates/title'
import { fonts } from './fontsList'
import { images } from './imagesList'
import { PresentationData, startPresentation } from '../lib'

export const presentationData: PresentationData<typeof fonts, typeof images> = {
  titleFont: 'oswald-regular.ttf',
  titleFontSize: 100,
  textFont: 'comfortaa-regular.ttf',
  mainTextFontSize: 46,
  fonts,
  images,
  slides: [
    coverSlide,
    introSlide,
    AdhdBrain,
    titleSlide('Ooh Shiny'),
    //openDocment,
    titleSlide("Where's my dopamine"),
    elephant,
    elephantSmall,
    elephantEasy,
    titleSlide('Hyperfocus'),
    hyperfocus,
    titleSlide('Context switching'),
    //contextSwitching,
    titleSlide('Sidequests'),
  ],
}
export const { titleFontSize, mainTextFontSize, textFont, titleFont } =
  presentationData

startPresentation(presentationData)
