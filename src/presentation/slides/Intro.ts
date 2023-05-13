import { fadeInAnim } from '../../../src/Animations/fadeInAnim'
import { ImageElement } from '../../../src/Elements/ImageElement'
import { TextElement } from '../../../src/Elements/TextElement'
import { SlideData } from '../../../src/Slide'

export const introSlide: SlideData = {
  title: 'Introduction',
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
                text: 'Who am I?',
                size: 36,
                alignment: { v: 'center', h: 'center' },
              }
            ),
        },
      },
    },
    {
      in: {
        image: {
          element: (p) =>
            new ImageElement(
              p,
              { x: 300, y: '50%' },
              {
                image: 'profile',
                size: {
                  w: 400,
                  h: 400,
                },
              }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
        name: {
          element: (p) =>
            new TextElement(
              p,
              { x: 530, y: '40%' },
              {
                text: 'Ben Feldberg Collins',
                size: 32,
                alignment: { h: 'left', v: 'center' },
              }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
        githubText: {
          element: (p) =>
            new TextElement(
              p,
              { x: 590, y: '50%' },
              {
                text: 'benfc1993',
                size: 32,
                alignment: { h: 'left', v: 'center' },
              }
            ),
          animation: fadeInAnim,
          duration: 250,
          simultaneous: true,
        },
        githubLogo: {
          element: (p) =>
            new ImageElement(
              p,
              { x: 550, y: '50%' },
              { image: 'gh', size: { w: 50, h: 50 } }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
        emailText: {
          element: (p) =>
            new TextElement(
              p,
              { x: 590, y: '60%' },
              {
                text: 'benfeldbergcollins@hotmail.co.uk',
                size: 32,
                alignment: { h: 'left', v: 'center' },
              }
            ),
          animation: fadeInAnim,
          duration: 250,
          simultaneous: true,
        },
        emailLogo: {
          element: (p) =>
            new ImageElement(
              p,
              { x: 550, y: '60%' },
              { image: 'gh', size: { w: 50, h: 50 } }
            ),
          animation: fadeInAnim,
          duration: 250,
        },
      },
    },
  ],
}
