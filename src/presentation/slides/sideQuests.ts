import { fadeInAnim } from '../../Animations/fadeInAnim'
import { ElementGroup } from '../../Elements/ElementGroup'
import { ImageElement } from '../../Elements/ImageElement'
import { TextElement } from '../../Elements/TextElement'
import { bulletPoints } from '../bulletPoints'
import { mainTextFontSize } from '../utils'
import { mainSlide } from './templates/main'

export const sideQuests = mainSlide(
  'Side Quests',
  [
    ...bulletPoints(
      'list',
      [
        'Break down tasks',
        'Plan task into small chunks',
        'Allocate time',
        'Set Alarms',
        'Hyperfocus',
        'Take a break',
        'Check Requirements',
        '...',
      ],
      { x: '30%', y: '42%' },
      { size: mainTextFontSize, alignment: { h: 'left' } },
      { animation: fadeInAnim, duration: 250 }
    ),
    ...bulletPoints(
      'listFaded',
      ['Allocate time', 'Set Alarms'],
      { x: '30%', y: '93%' },
      {
        size: mainTextFontSize,
        alignment: { h: 'left' },
        color: [255, 255, 255, 127],
      },
      { animation: fadeInAnim, duration: 250 }
    ),
    {
      in: {
        qrCode: {
          element: (p: p5) =>
            new ImageElement(
              p,
              { x: '68% + 200', y: '95% + -250' },
              { image: 'qr-code', size: { h: 400 } }
            ),
          simultaneous: true,
        },
        gitHub: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '68%', y: '95%' }, [
              new ImageElement(p, { x: 0, y: 0 }, { image: 'gh' }),
              new TextElement(
                p,
                { x: '2.5%', y: 0 },
                {
                  text: 'benfc1993/p5-present',
                  size: mainTextFontSize,
                  alignment: { h: 'left', v: 'center' },
                }
              ),
            ]),
          animation: fadeInAnim,
          duration: 200,
        },
      },
    },
  ],
  `<a href="https://pokematchup-service.onrender.com">Pokemon App</a>`
)
