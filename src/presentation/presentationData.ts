import { fadeInAnim } from '../Animations/fadeInAnim'
import { fadeOutAnim } from '../Animations/fadeOutAnim'
import { linearMoveAnim } from '../Animations/linearMoveAnim'
import { ImageElement } from '../Elements/ImageElement'
import { SlideData } from '../Slide'
import { AdhdBrain } from './slides/AdhdBrain'
import { coverSlide } from './slides/Cover'
import { introSlide } from './slides/Intro'

type PresentationData = {
  slides: SlideData[]
}

export const presentationData: PresentationData = {
  slides: [coverSlide, introSlide, AdhdBrain],
}
