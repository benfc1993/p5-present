import { fadeOutAnim, TextElement, TitleElement } from '../../lib'
import { mainTextFontSize, titleFontSize } from '..'
import { SlideData } from '../../lib/Slide'
import { colors } from '../fontsList'

export const coverSlide: SlideData = {
  title: 'First slide',
  background: colors.bg,
  frames: [
    {
      in: {
        title: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '50% + -60' },
              {
                text: 'React',
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
                text: 'Behind the curtain',
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
