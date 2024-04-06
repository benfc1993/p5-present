import { titleFontSize } from '../..'
import { RectElement, TitleElement } from '../../../lib'
import { SlideData } from '../../../lib/Slide'
import { slideBackground } from './baseSlide'

export const titleSlide = (title: string): SlideData => ({
  title,
  background: slideBackground,
  frames: [
    {
      in: {
        corner: {
          element: (p) =>
            new RectElement(
              p,
              { x: '100% + -100', y: 0, rot: 45 },
              { color: [62, 217, 181], size: { w: 500, h: 200 } },
            ),
          simultaneous: true,
        },
        title: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '50%' },
              {
                text: title,
                size: titleFontSize,
                alignment: { h: 'center', v: 'center' },
              },
            ),
        },
      },
    },
  ],
})
