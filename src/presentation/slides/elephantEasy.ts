import { ElementGroup } from '../../Elements/ElementGroup'
import { RectElement } from '../../Elements/RectElement'
import { SlideElement } from '../../Elements/SlideElement'
import { TextElement, TitleElement } from '../../Elements/TextElement'
import { SlideData } from '../../Slide'
import { mainTextFontSize, titleFontSize } from '../utils'
import { slideBackground } from './templates/baseSlide'
import { mainSlide } from './templates/main'

export const elephantEasy: SlideData = mainSlide(
  'How to eat an elephant:',
  [
    {
      in: {
        titleAddition: {
          element: (p: p5) =>
            new TitleElement(
              p,
              { x: '6% + 880', y: '15% + -5' },
              {
                text: ['One small, easy to digest', 'bite at a time'],
                size: titleFontSize - 20,
              }
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
    {
      in: {
        visualTop: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '30%', y: '33%' }, [
              new TextElement(
                p,
                { x: 0, y: 0 },
                {
                  text: 'Visual',
                  alignment: { h: 'center' },
                  size: mainTextFontSize,
                }
              ),
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: '-  Easy to absorb',
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                }
              ),
            ]),
        },
      },
    },
    {
      in: {
        visualBottom: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '30%', y: '48%' }, [
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: '-  Sparse information',
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                }
              ),
            ]),
        },
      },
    },
    {
      in: {
        writtenTop: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '60%', y: '33%' }, [
              new TextElement(
                p,
                { x: 0, y: 0 },
                {
                  text: 'Written',
                  alignment: { h: 'center' },
                  size: mainTextFontSize,
                }
              ),
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: '-  Detailed',
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                }
              ),
            ]),
        },
      },
    },
    {
      in: {
        writtenBottom: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '60%', y: '48%' }, [
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: ['-  Long', '-  Boring'],
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                  lineHeight: 1.5,
                }
              ),
            ]),
        },
      },
    },
    {
      in: {
        verbalTop: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '80%', y: '33%' }, [
              new TextElement(
                p,
                { x: 0, y: 0 },
                {
                  text: 'Verbal',
                  alignment: { h: 'center' },
                  size: mainTextFontSize,
                }
              ),
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: ['-  Great for', '    collaboration'],
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                }
              ),
            ]),
        },
      },
    },
    {
      in: {
        verbalBottom: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '80%', y: '48%' }, [
              new RectElement(
                p,
                { x: 0, y: mainTextFontSize / 2 },
                { size: { w: 300, h: 4 }, color: [255, 255, 255] }
              ),
              new TextElement(
                p,
                { x: -100, y: mainTextFontSize * 2 },
                {
                  text: '-  Temporary',
                  alignment: { h: 'left' },
                  size: mainTextFontSize,
                }
              ),
            ]),
        },
      },
    },
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
