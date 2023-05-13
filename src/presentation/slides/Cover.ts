import { linearMoveAnim } from '../../../src/Animations/linearMoveAnim'
import { TextElement } from '../../../src/Elements/TextElement'
import { SlideData } from '../../../src/Slide'
import { AnimationElement } from '../../Elements/AnimationElement'
import { positionPercentageToPixels } from '../../utils/positionPercentageToPixel'
import { TaskAnimationElement } from '../animationElements/taskAnimationElement'

export const coverSlide: SlideData = {
  title: 'First slide',
  background: 'intro-bg',
  frames: [
    {
      in: {
        title: {
          element: (p: p5) =>
            new TextElement(
              p,
              { x: '50%', y: '45%' },
              {
                text: 'MancJs',
                alignment: { h: 'center', v: 'center' },
                size: 46,
              }
            ),
          simultaneous: true,
        },
        text: {
          element: (p: p5) =>
            new TextElement(
              p,
              { x: '50%', y: '55%' },
              {
                text: 'Alarms, diagrams, side-quests and other lessons from having ADHD in tech',
                alignment: { h: 'center', v: 'center' },
                size: 34,
              }
            ),
        },
      },
    },

    {
      out: {
        title: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: '50%', y: -20 },
          simultaneous: true,
        },
        text: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: '50%', y: '110%' },
        },
      },
    },
  ],
}
