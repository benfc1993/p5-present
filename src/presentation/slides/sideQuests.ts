import { fadeInAnim } from '../../Animations/fadeInAnim'
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
      { x: '30%', y: '45%' },
      { size: mainTextFontSize, alignment: { h: 'left' } },
      { animation: fadeInAnim, duration: 250 }
    ),
  ],
  `<a href="https://pokematchup-service.onrender.com">Pokemon App</a>`
)
