import { fadeInAnim } from '../../Animations/fadeInAnim'
import { fadeOutAnim } from '../../Animations/fadeOutAnim'
import { TextElement } from '../../Elements/TextElement'
import { mainTextFontSize } from '../utils'
import { mainSlide } from './templates/main'

export const contextSwitching = mainSlide('Context Switching', [
  {
    in: {
      firstMessage: {
        element: (p: p5) =>
          new TextElement(
            p,
            { x: '50%', y: '45%' },
            {
              text: 'Hey do you have a minute?',
              size: mainTextFontSize,
              alignment: { h: 'center' },
            }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
  {
    in: {
      firstReply: {
        element: (p: p5) =>
          new TextElement(
            p,
            { x: '50%', y: '55%' },
            { text: 'Yeah', size: mainTextFontSize, alignment: { h: 'center' } }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
  {
    out: {
      firstReply: {
        animation: fadeOutAnim,
        duration: 250,
        simultaneous: true,
      },
    },
    in: {
      secondReply: {
        element: (p: p5) =>
          new TextElement(
            p,
            { x: '50%', y: '55%' },
            {
              text: 'Yeah, give me 5',
              size: mainTextFontSize,
              alignment: { h: 'center' },
            }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
  {
    out: {
      firstMessage: {
        animation: fadeOutAnim,
        duration: 250,
        simultaneous: true,
      },
    },
    in: {
      secondMessage: {
        element: (p: p5) =>
          new TextElement(
            p,
            { x: '50%', y: '45%' },
            {
              text: 'Hey can I grab you in 5?',
              size: mainTextFontSize,
              alignment: { h: 'center' },
            }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
  {
    out: {
      secondReply: {
        animation: fadeOutAnim,
        duration: 250,
        simultaneous: true,
      },
    },
    in: {
      finalReply: {
        element: (p: p5) =>
          new TextElement(
            p,
            { x: '50%', y: '55%' },
            {
              text: 'Yeah',
              size: mainTextFontSize,
              alignment: { h: 'center' },
            }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
])
