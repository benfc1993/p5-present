import { fadeOutAnim, TextElement, TitleElement } from '../../lib'
import { mainTextFontSize, titleFontSize } from '..'
import { slideBackground } from './templates/baseSlide'
import { SlideData } from '../../lib/Slide'

export const coverSlide: SlideData = {
  title: 'First slide',
  background: slideBackground,
  frames: [
    {
      in: {
        title: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '50% + -60' },
              {
                text: 'Alarms, diagrams, side-quests',
                alignment: { h: 'center', v: 'center' },
                size: titleFontSize,
              },
            ),
          simultaneous: true,
        },
        divider: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '50%' },
              {
                text: '...',
                alignment: { h: 'center', v: 'center' },
                size: titleFontSize,
              },
            ),
          simultaneous: true,
        },
        subTitle: {
          element: (p) =>
            new TextElement(
              p,
              { x: '50%', y: '50% + 106' },
              {
                text: 'and other lessons from having ADHD in tech',
                alignment: { h: 'center', v: 'center' },
                size: mainTextFontSize,
              },
            ),
        },
      },
    },

    {
      out: {
        title: {
          animation: fadeOutAnim,
          duration: 200,
          simultaneous: true,
        },
        divider: {
          animation: fadeOutAnim,
          duration: 200,
          simultaneous: true,
        },
        subTitle: {
          animation: fadeOutAnim,
          duration: 200,
        },
      },
    },
  ],
}
