import { fadeInAnim } from '../../Animations/fadeInAnim'
import { fadeOutAnim } from '../../Animations/fadeOutAnim'
import { ElementGroup } from '../../Elements/ElementGroup'
import { ImageElement } from '../../Elements/ImageElement'
import { RectElement } from '../../Elements/RectElement'
import { SlideData } from '../../Slide'
import { bulletPoints } from '../bulletPoints'
import { mainTextFontSize } from '../utils'
import { mainSlide } from './templates/main'

export const openDocument: SlideData = mainSlide('Open Document', [
  ...bulletPoints(
    'list',
    ['Store thoughts', 'Free up working memory', 'Help to stay on task'],
    { x: '20%', y: '45%' },
    { size: mainTextFontSize },
    {
      animation: fadeInAnim,
      duration: 250,
    }
  ),
  {
    in: {
      notebookImage: {
        element: (p: p5) =>
          new ImageElement(
            p,
            { x: '55%', y: '80%' },
            { image: 'notebook', size: { h: 300 } }
          ),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
  {
    out: {
      notebookImage: {
        animation: fadeOutAnim,
        duration: 200,
        simultaneous: true,
      },
    },
    in: {
      blackBoardImage: {
        element: (p: p5) =>
          new ElementGroup(p, { x: 0, y: 0 }, [
            new RectElement(
              p,
              { x: '100% + -300', y: '10% + 150' },
              { color: [255, 255, 255], size: { w: 510, h: 345 } }
            ),
            new ImageElement(
              p,
              { x: '100% + -300', y: '10% + 150' },
              { image: 'blackboard', size: { w: 510, h: 345 } }
            ),
            new ImageElement(
              p,
              { x: '100% + -208', y: '10% + 500' },
              { image: 'trello', size: { w: 350 } }
            ),
          ]),
        animation: fadeInAnim,
        duration: 250,
      },
    },
  },
])
