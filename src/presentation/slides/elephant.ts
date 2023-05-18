import { fadeInAnim } from '../../Animations/fadeInAnim'
import { fadeOutAnim } from '../../Animations/fadeOutAnim'
import { ElementGroup } from '../../Elements/ElementGroup'
import { ImageElement } from '../../Elements/ImageElement'
import { RectElement } from '../../Elements/RectElement'
import { TitleElement } from '../../Elements/TextElement'
import { SlideData } from '../../Slide'
import { titleFontSize } from '../utils'
import { mainSlide } from './templates/main'

export const elephant: SlideData = mainSlide(
  'How to eat an elephant:',
  [
    {
      in: {
        code: {
          element: (p: p5) =>
            new ImageElement(
              p,
              { x: '50%', y: '55%' },
              { image: 'code', size: { h: '65%' } }
            ),
        },
      },
    },
    {
      out: {
        code: {
          animation: fadeOutAnim,
          duration: 500,
          simultaneous: true,
        },
      },
      in: {
        tasksTangle: {
          element: (p: p5) =>
            new ImageElement(
              p,
              { x: '50%', y: '55%' },
              { image: 'tasks-tangle', size: { h: '65%' } }
            ),
          animation: fadeInAnim,
          duration: 750,
        },
      },
    },
    {
      out: {
        tasksTangle: {
          animation: fadeOutAnim,
          duration: 750,
        },
      },
      in: {
        titleAddition: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '6% + 880', y: '15% + -5' },
              { text: 'One bite at a time', size: titleFontSize - 20 }
            ),
          simultaneous: true,
        },
        stack: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '10%', y: '26%' }, [
              new RectElement(
                p,
                { x: 0, y: 20 },
                {
                  size: {
                    w: 200,
                    h: 125,
                  },
                  color: [255, 217, 102],
                  radius: 20,
                },
                true
              ),
              new RectElement(
                p,
                { x: 0, y: 165 },
                {
                  size: {
                    w: 200,
                    h: 125,
                  },
                  color: [224, 102, 102],
                  radius: 20,
                },
                true
              ),
              new RectElement(
                p,
                { x: 0, y: 310 },
                {
                  size: {
                    w: 200,
                    h: 125,
                  },
                  color: [62, 217, 181],
                  radius: 20,
                },
                true
              ),
              new RectElement(
                p,
                { x: 0, y: 455 },
                {
                  size: {
                    w: 200,
                    h: 125,
                  },
                  color: [111, 168, 220],
                  radius: 20,
                },
                true
              ),
              new RectElement(
                p,
                { x: 0, y: 600 },
                {
                  size: {
                    w: 200,
                    h: 125,
                  },
                  color: [225, 153, 0],
                  radius: 20,
                },
                true
              ),
            ]),
          animation: fadeInAnim,
          duration: 750,
        },
      },
    },
  ],
  true
)
