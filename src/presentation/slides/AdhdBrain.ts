import { fadeInAnim } from '../../Animations/fadeInAnim'
import { TextElement } from '../../Elements/TextElement'
import { SlideData } from '../../Slide'
import { positionPercentageToPixels } from '../../utils/positionPercentageToPixel'
import { TaskAnimationElement } from '../animationElements/taskAnimationElement'

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
    {
      in: {
        animation: {
          animation: fadeInAnim,
          duration: 500,
          element: (p: p5) =>
            new TaskAnimationElement(
              p,
              positionPercentageToPixels(p, { x: '50%', y: '50%' })
            ),
        },
      },
    },
  ],
}
