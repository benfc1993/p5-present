import { fadeInAnim } from '../../Animations/fadeInAnim'
import { ElementGroup } from '../../Elements/ElementGroup'
import { RectElement } from '../../Elements/RectElement'
import { SlideElement } from '../../Elements/SlideElement'
import { TitleElement } from '../../Elements/TextElement'
import { SlideData } from '../../Slide'
import { bulletPoints } from '../bulletPoints'
import { mainTextFontSize, titleFontSize } from '../utils'
import { slideBackground } from './templates/baseSlide'
import { mainSlide } from './templates/main'

export const elephantSmall: SlideData = mainSlide(
  'How to eat an elephant:',
  [
    {
      in: {
        titleAddition: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '6% + 880', y: '15% + -5' },
              { text: 'One small bite at a time', size: titleFontSize - 20 }
            ),
        },
        slicedStack: {
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
              ...createSlices(p, -20),
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
              ...createSlices(p, 125),
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
              ...createSlices(p, 270),
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
              ...createSlices(p, 415),
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
              ...createSlices(p, 560),
            ]),
        },
      },
    },
    ...bulletPoints(
      'bullets',
      [
        'Small chunks',
        'Well-defined requirements',
        'Checklists',
        'Good indication of effort / time',
      ],
      { x: '35%', y: '40%' },
      { size: mainTextFontSize },
      {
        animation: fadeInAnim,
        duration: 200,
      }
    ),
  ],
  '',
  true
)

const createSlices = (p: p5, startY: number): SlideElement[] => {
  const slices: SlideElement[] = []
  for (let i = 0; i <= 4; i++) {
    slices.push(
      new RectElement(
        p,
        { x: 0, y: startY + i * 27.5 },
        {
          size: {
            w: 210,
            h: 10,
          },
          color: slideBackground as number[],
        },
        true
      )
    )
  }
  return slices
}
