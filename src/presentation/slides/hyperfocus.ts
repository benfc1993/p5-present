import { bulletPoints, fadeInAnim } from '../../lib'
import { SlideData } from '../../lib/Slide'
import { mainSlide } from './templates/main'

export const hyperfocus: SlideData = mainSlide(
  'How To Get the Most out of Hyperfocus',
  [
    ...bulletPoints(
      'bullet',
      [
        'Make sure the work has been planned',
        'Allocate time',
        'Set a timer',
        'Take regular breaks',
        'Check in with requirements',
      ],
      { x: '25%', y: '45%' },
      { size: 46 },
      {
        animation: fadeInAnim,
        duration: 200,
      },
    ),
  ],
)
