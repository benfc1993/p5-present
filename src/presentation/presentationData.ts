import { SlideData } from '../Slide'
import { AdhdBrain } from './slides/AdhdBrain'
import { coverSlide } from './slides/Cover'
import { introSlide } from './slides/Intro'
import { elephant } from './slides/elephant'
import { elephantEasy } from './slides/elephantEasy'
import { elephantSmall } from './slides/elephantSmall'
import { hyperfocus } from './slides/hyperfocus'
import { titleSlide } from './slides/templates/title'

type PresentationData = {
  slides: SlideData[]
}

export const titleFont = 'oswald-regular'
export const titleFontSize = 100
export const textFont = 'comfortaa-regular'
export const mainTextFontSize = 46

export const presentationData: PresentationData = {
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
