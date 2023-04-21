import { TextElement } from '../../Elements/TextElement'
import { SlideData } from '../../Slide'

export const AdhdBrain: SlideData = {
  title: 'ADHD brain',
  background: 'intro-bg',
  frames: [
    {
      in: {
        title: {
          element: (p) =>
            new TextElement(
              p,
              { x: '50%', y: '25%' },
              {
                text: 'The ADHD brain',
                size: 36,
                alignment: { v: 'center', h: 'center' },
              }
            ),
        },
      },
    },
  ],
}
