import { SlideData } from '../Slide'
import { AdhdBrain } from './slides/AdhdBrain'
import { coverSlide } from './slides/Cover'
import { introSlide } from './slides/Intro'
import { contextSwitching } from './slides/contextSwitching'
import { elephant } from './slides/elephant'
import { elephantEasy } from './slides/elephantEasy'
import { elephantSmall } from './slides/elephantSmall'
import { hyperfocus } from './slides/hyperfocus'
import { openDocument } from './slides/openDocument'
import { sideQuests } from './slides/sideQuests'
import { titleSlide } from './slides/templates/title'
import { tipsAndSuperpowers } from './slides/tipsAndSuperpowers'

type PresentationData = {
  slides: SlideData[]
}

export const presentationData: PresentationData = {
  slides: [
    coverSlide,
    introSlide,
    AdhdBrain,
    titleSlide('Oooh... Shiny'),
    openDocument,
    titleSlide("Where's my dopamine?"),
    elephant,
    elephantSmall,
    elephantEasy,
    titleSlide('Hyperfocus'),
    hyperfocus,
    titleSlide('Context switching'),
    contextSwitching,
    tipsAndSuperpowers,
    titleSlide('Side Quests'),
    sideQuests,
  ],
}
