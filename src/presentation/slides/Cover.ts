import { TextElement, TitleElement } from '../../../src/Elements/TextElement'
import { SlideData } from '../../../src/Slide'
import { mainTextFontSize, titleFontSize } from '../utils'
import { slideBackground } from './templates/baseSlide'

export const coverSlide: SlideData = {
  title: 'First slide',
  background: slideBackground,
  frames: [
    {
      in: {
        title: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '50%', y: '50% + -60' },
              {
                text: 'Alarms, diagrams, side-quests',
                alignment: { h: 'center', v: 'center' },
                size: titleFontSize,
              }
            ),
          simultaneous: true,
        },
        divider: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '50%', y: '50%' },
              {
                text: '...',
                alignment: { h: 'center', v: 'center' },
                size: titleFontSize,
              }
            ),
          simultaneous: true,
        },
        subTitle: {
          element: (p: p5) =>
            new TextElement(
              p,
              { x: '50%', y: '50% + 106' },
              {
                text: 'and other lessons from having ADHD in tech',
                alignment: { h: 'center', v: 'center' },
                size: mainTextFontSize,
              }
            ),
        },
      },
    },
  ],
}
