import { mainTextFontSize } from '..'
import {
  bulletPoints,
  ElementGroup,
  fadeInAnim,
  fadeOutAnim,
  ImageElement,
  RectElement,
  TextElement,
} from '../../lib'
import { SlideData } from '../../lib/Slide'
import { mainSlide } from './templates/main'

export const AdhdBrain: SlideData = mainSlide(
  'Brains',
  [
    {
      in: {
        table: {
          element: (p) =>
            new ElementGroup(p, { x: '50%', y: '35%' }, [
              new RectElement(
                p,
                { x: 0, y: 0 },
                {
                  color: [255, 255, 255],
                  size: {
                    w: '90%',
                    h: 4,
                  },
                },
              ),
              new RectElement(
                p,
                { x: 0, y: '20%' },
                {
                  color: [255, 255, 255],
                  size: {
                    w: 4,
                    h: '60%',
                  },
                },
              ),
              new RectElement(
                p,
                { x: 0, y: 0 },
                {
                  color: [55, 71, 79],
                  size: {
                    w: 40,
                    h: 40,
                  },
                },
              ),
              new RectElement(
                p,
                { x: 0, y: 0 },
                {
                  color: [255, 255, 255],
                  size: {
                    w: 10,
                    h: 10,
                  },
                },
              ),
              new TextElement(
                p,
                { x: '-25%', y: -20 },
                {
                  text: 'Neurotypical',
                  size: mainTextFontSize,
                  alignment: {
                    h: 'center',
                  },
                },
              ),
              new TextElement(
                p,
                { x: '25%', y: -20 },
                {
                  text: 'ADHD',
                  size: mainTextFontSize,
                  alignment: {
                    h: 'center',
                  },
                },
              ),
            ]),
          animation: fadeInAnim,
          duration: 200,
        },
      },
    },
    ...bulletPoints(
      'neuro',
      [
        'Able to ignore external stimuli',
        'Motivation to take a task to completion',
        'Well-regulated dopamine production',
        'Good working memory',
      ],
      { x: '6.5%', y: '45%' },
      { size: 40 },
      {
        animation: fadeInAnim,
        duration: 200,
      },
    ),
    ...bulletPoints(
      'adhdT',
      [
        'Always receiving external stimuli',
        "Tendency to reach '80%' completion",
      ],
      { x: '53%', y: '45%' },
      { size: 40 },
      {
        animation: fadeInAnim,
        duration: 200,
      },
    ),
    {
      in: {
        kitchenImage: {
          element: (p) =>
            new ImageElement(
              p,
              { x: '50%', y: '50%' },
              { image: 'kitchen', size: { w: '80%' } },
            ),
          animation: fadeInAnim,
          duration: 200,
        },
      },
    },
    {
      out: {
        kitchenImage: {
          animation: fadeOutAnim,
          duration: 200,
        },
      },
    },
    ...bulletPoints(
      'adhdB',
      ['Deficient dopamine production', 'Poor working memory'],
      { x: '53%', y: '45% + 120' },
      { size: 40 },
      {
        animation: fadeInAnim,
        duration: 200,
      },
    ),
  ],
  true,
)
