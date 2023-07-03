import { ElementGroup } from '../../Elements/ElementGroup'
import { TextElement } from '../../Elements/TextElement'
import { mainTextFontSize } from '../utils'
import { mainSlide } from './templates/main'

export const tipsAndSuperpowers = mainSlide(
  'Tips and Superpowers',
  [
    {
      in: {
        tips: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '15%', y: '35%' }, [
              new TextElement(
                p,
                { x: 0, y: 0 },
                { text: 'Tips', size: mainTextFontSize }
              ),
              new TextElement(
                p,
                { x: 0, y: mainTextFontSize * 2 },
                {
                  text: [
                    '-   Have a stimming toy',
                    '-   Background music',
                    '-   Keep things visible',
                    '-   Spell checkers',
                  ],
                  size: mainTextFontSize,
                  lineHeight: 1.5,
                }
              ),
            ]),
        },
        superPowers: {
          element: (p: p5) =>
            new ElementGroup(p, { x: '55%', y: '35%' }, [
              new TextElement(
                p,
                { x: 0, y: 0 },
                { text: 'Superpowers', size: mainTextFontSize }
              ),
              new TextElement(
                p,
                { x: 0, y: mainTextFontSize * 2 },
                {
                  text: [
                    '-   Heightened EQ',
                    '-   Pattern recognition',
                    '-   Creative problem solving',
                  ],
                  size: mainTextFontSize,
                  lineHeight: 1.5,
                }
              ),
            ]),
        },
      },
    },
  ],
  `<h4>Tips</h4>
  <p>Background music helps occupy subconscious</p>
  <h4>Super powers</h4>
  <p>Empathy</p>
  <p>Vibe check</p>
  <p>Ability to see solutions others might miss</p>`,
  true
)
