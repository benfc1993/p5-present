import { fadeOutAnim, TitleElement } from '../../lib'
import { titleFontSize } from '..'
import { SlideData } from '../../lib/Slide'
import { colors } from '../fontsList'

export const intro: SlideData = {
  title: 'First slide',
  background: colors.bg,
  frames: [
    {
      in: {
        title: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '50%' },
              {
                text: 'How',
                alignment: { h: 'center', v: 'center' },
                size: titleFontSize,
              },
            ),
          simultaneous: true,
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
      },
    },
  ],
}
