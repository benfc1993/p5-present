import {
  fadeInAnim,
  fadeOutAnim,
  ImageElement,
  RectElement,
  TextElement,
  TitleElement,
} from '../../lib'
import { mainTextFontSize, titleFontSize } from '..'
import { SlideData } from '../../lib/Slide'

export const introSlide: SlideData = {
  title: 'Introduction',
  background: [55, 71, 79],
  frames: [
    {
      in: {
        title: {
          element: (p) =>
            new TitleElement(
              p,
              { x: '50%', y: '15%' },
              {
                text: 'Who am I?',
                size: titleFontSize,
                alignment: { v: 'center', h: 'center' },
              },
            ),
        },
      },
    },
    {
      in: {
        name: {
          element: (p) =>
            new TextElement(
              p,
              { x: '50%', y: '28%' },
              {
                text: 'Ben Feldberg Collins',
                size: mainTextFontSize,
                alignment: { h: 'center', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 200,
        },
        githubText: {
          element: (p) =>
            new TextElement(
              p,
              { x: '48%', y: '95%' },
              {
                text: 'benfc1993',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 200,
          simultaneous: true,
        },
        githubLogo: {
          element: (p) =>
            new ImageElement(p, { x: '45.5%', y: '95%' }, { image: 'gh' }),
          animation: fadeInAnim,
          duration: 200,
        },
      },
    },
    {
      in: {
        childhood: {
          element: (p) =>
            new TextElement(
              p,
              { x: '10%', y: '38%', rot: -16 },
              {
                text: ['Stuntman', 'Mechanic', 'Spy'],
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
                lineHeight: 1.5,
              },
            ),
          animation: fadeInAnim,
          duration: 200,
        },
      },
    },
    {
      in: {
        doctor: {
          element: (p) =>
            new TextElement(
              p,
              { x: '27%', y: '44%', rot: 10 },
              {
                text: 'Doctor',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        engineer: {
          element: (p) =>
            new TextElement(
              p,
              { x: '32.5%', y: '50%', rot: -13 },
              {
                text: 'Engineer',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        dj: {
          element: (p) =>
            new TextElement(
              p,
              { x: '29%', y: '54%', rot: 17 },
              {
                text: 'DJ',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        eventmanager: {
          element: (p) =>
            new TextElement(
              p,
              { x: '33.6%', y: '55%', rot: 7 },
              {
                text: 'EventManager',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        snowboard: {
          element: (p) =>
            new TextElement(
              p,
              { x: '22.6%', y: '61%', rot: 5 },
              {
                text: 'Snowboard Instructor',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      out: {
        snowboard: {
          animation: fadeOutAnim,
          duration: 50,
        },
      },
      in: {
        ski: {
          element: (p) =>
            new TextElement(
              p,
              { x: '22.6%', y: '61%', rot: 5 },
              {
                text: 'Ski and Snowboard Instructor',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        frontEnd: {
          element: (p) =>
            new TextElement(
              p,
              { x: '43.6%', y: '50%', rot: 6.5 },
              {
                text: 'Frontend Developer',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        hod: {
          element: (p) =>
            new TextElement(
              p,
              { x: '52.6%', y: '62%', rot: -4.5 },
              {
                text: 'Head of Department',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        fullStack: {
          element: (p) =>
            new TextElement(
              p,
              { x: '52.6%', y: '42%', rot: 3.5 },
              {
                text: 'Full stack software engineer',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        instructor: {
          element: (p) =>
            new TextElement(
              p,
              { x: '62.6%', y: '67%', rot: 3.5 },
              {
                text: 'Instructor',
                size: mainTextFontSize,
                alignment: { h: 'left', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 50,
        },
      },
    },
    {
      in: {
        rect: {
          element: (p) =>
            new RectElement(
              p,
              { x: '50%', y: '55%' },
              { color: [0, 0, 0, 187], size: { w: '30%', h: '19.5%' } },
            ),
          animation: fadeInAnim,
          duration: 500,
          simultaneous: true,
        },
        adhd: {
          element: (p) =>
            new TextElement(
              p,
              { x: '50%', y: '55%' },
              {
                text: 'ADHD',
                size: 150,
                color: [62, 217, 181],
                alignment: { h: 'center', v: 'center' },
              },
            ),
          animation: fadeInAnim,
          duration: 500,
        },
      },
    },
  ],
}
