import { RectElement } from '../../../Elements/RectElement'
import { TitleElement } from '../../../Elements/TextElement'
import { Frame, SlideData } from '../../../Slide'
import { titleFontSize } from '../../utils'
import { slideBackground } from './baseSlide'

export const titleSlide = (title: string): SlideData => ({
  title,
  background: slideBackground,
  frames: [
    {
      in: {
        corner: {
          element: (p: p5) =>
            new RectElement(
              p,
              { x: '100% + -100', y: 0, rot: 45 },
              { color: [62, 217, 181], size: { w: 500, h: 200 } }
            ),
          simultaneous: true,
        },
        title: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '50%', y: '50%' },
              {
                text: title,
                size: titleFontSize,
                alignment: { h: 'center', v: 'center' },
              }
            ),
        },
      },
    },
  ],
})
