import { fadeInAnim } from '../../../Animations/fadeInAnim'
import { fadeOutAnim } from '../../../Animations/fadeOutAnim'
import { TextElement } from '../../../Elements/TextElement'
import { SlideData } from '../../../Slide'

const exampleSlide: SlideData = {
  title: 'Example Slide',
  background: [55, 71, 79],
  frames: [
    {
      in: {
        elementOne: {
          element: (p: p5) =>
            new TextElement(
              p,
              { x: '50%', y: '50%' },
              { text: 'Example Slide Title' }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
      },
    },
    {
      out: {
        elementOne: {
          animation: fadeOutAnim,
          duration: 250,
        },
      },
    },
  ],
  notes: `<h3>These notes will appear in presenter view</h3>`,
}
