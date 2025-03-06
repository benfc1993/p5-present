import {
  fadeInAnim,
  linearMoveAnim,
  RectElement,
  SlideData,
  TextElement,
} from '../../lib'
import { colors } from '../fontsList'
import { key, prop, string, tag, variable } from './templates/textColoring'

export const createElement: SlideData = {
  title: 'Create Element',
  background: colors.bg,
  frames: [
    {
      in: {
        tag: {
          animation: fadeInAnim,
          duration: 250,
          element: (p) =>
            new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                color: colors.white,
                size: 30,
                text: `
<${tag('p')} ${prop('className')}=${string('"my-class"')}>
    ${string('Hello World')}
</${tag('p')}>`,

                alignment: { v: 'center' },
              },
            ),
        },
      },
    },
    {
      in: {
        tag: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: '15%', y: '50%' },
        },
        jsxHeader: {
          element(p) {
            return new TextElement(
              p,
              { x: '25%', y: 100 },
              { alignment: { h: 'center' }, text: 'JSX' },
            )
          },
          animation: fadeInAnim,
          duration: 250,
          simultaneous: true,
        },
        fiberHeader: {
          element(p) {
            return new TextElement(
              p,
              { x: '75%', y: 100 },
              { alignment: { h: 'center' }, text: 'Fiber' },
            )
          },
          animation: fadeInAnim,
          duration: 250,
          simultaneous: true,
        },
        line: {
          element(p) {
            return new RectElement(
              p,
              { x: '50%', y: '50%' },
              { size: { w: 1, h: '80%' }, color: colors.white },
            )
          },
          animation: fadeInAnim,
          duration: 150,
          simultaneous: true,
        },
        json: {
          animation: fadeInAnim,
          duration: 250,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                color: colors.white,
                size: 30,
                alignment: { v: 'center' },
                text: `
{
    ${key('tag')}: "${tag('p')}",
    ${key('_ref')}: ${variable('#document')}.${key('p')},
    ${key('props')}: {
        ${prop('className')}: "my-class"
    },
    ${key('child')}: {
        ${key('tag')}: "${tag('TEXT')}",
        ${key('_ref')}: ${variable('#document')}.${key('text')},
        ${key('props')}: {
            ${key('value')}: "${string('Hello World')}"
        }
    }
}`,
              },
            ),
        },
      },
    },
  ],
}
