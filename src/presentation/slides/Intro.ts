import { fadeInAnim } from '../../../src/Animations/fadeInAnim'
import { ImageElement } from '../../../src/Elements/ImageElement'
import { TextElement } from '../../../src/Elements/TextElement'
import { SlideData } from '../../../src/Slide'

export const introSlide: SlideData = {
  title: 'Introduction',
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
                text: 'Who am I?',
                size: 36,
                alignment: { v: 'center', h: 'center' },
              }
            ),
        },
      },
    },
    {
      in: {
        image: {
          element: (p) =>
            new ImageElement(
              p,
              { x: '50%', y: '60%' },
              {
                image: 'test-alpha',
                size: {
                  w: 100,
                  h: 100,
                },
              }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
      },
    },
  ],
}
