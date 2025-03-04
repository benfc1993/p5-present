import {
  ElementGroup,
  fadeInAnim,
  fadeOutAnim,
  linearMoveAnim,
  RectElement,
  SlideData,
  TextElement,
} from '../../lib'
import { LineElement } from '../../lib/Elements/LineElement'
import { colors } from '../fontsList'
import { func, key, keyword, string, tag } from './templates/textColoring'

export const createComponent: SlideData = {
  title: 'Create Element Children',
  background: colors.bg,
  frames: [
    {
      // JSX only
      in: {
        componentJsx: {
          element(p) {
            return new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                alignment: { v: 'center' },
                color: colors.white,
                size: 48,
                text: `<${tag('MyComponent')} />`,
              },
            )
          },
        },
      },
    },
    {
      out: {
        componentJsx: {
          animation: fadeOutAnim,
          duration: 250,
          simultaneous: true,
        },
      },
      in: {
        componentFunction: {
          animation: fadeInAnim,
          duration: 250,
          element(p) {
            return new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                alignment: { v: 'center' },
                color: colors.white,
                size: 30,
                text: `
${keyword('function')} ${func('MyComponent')} ( ) {
    ${keyword('return')} (
        <${tag('div')}>
            <${tag('p')}>${string('Current count: 0')}</${tag('p')}>
            <${tag('button')}>${string('Increment')}</${tag('button')}>
        </${tag('div')}>
    )
}
                                           `,
              },
            )
          },
        },
      },
    },
    // JSX -> Fiber
    {
      in: {
        componentFunction: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: 100, y: '50%' },
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
        component_json: {
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
    ${key('tag')}: ${func('MyComponent')},
    ${key('isComponent')}: ${func('true')},
    ${key('_ref')}: #document.div,
    ${key('child')}: {
        ${key('tag')}: "${tag('div')}",
        ${key('_ref')}: #document.div,
        ...
    } 
}`,
              },
            ),
        },
      },
    },
    // Fiber => tree
    {
      out: {
        componentFunction: {
          animation: linearMoveAnim,
          endPos: { x: -1000, y: '50%' },
          duration: 300,
          simultaneous: true,
        },
        jsxHeader: {
          animation: linearMoveAnim,
          endPos: { x: '-25%', y: 100 },
          duration: 300,
          simultaneous: true,
        },
      },
      in: {
        component_json: {
          animation: linearMoveAnim,
          endPos: { x: 100, y: '50%' },
          duration: 300,
          simultaneous: true,
        },
        fiberHeader: {
          animation: linearMoveAnim,
          endPos: { x: '25%', y: 100 },
          duration: 300,
          simultaneous: true,
        },
        treeHeader: {
          animation: linearMoveAnim,
          endPos: { x: '75%', y: 100 },
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '125%', y: 100 },
              { text: 'Tree', alignment: { h: 'center' } },
            ),
        },
        tree: {
          animation: linearMoveAnim,
          endPos: { x: '75%', y: '25%' },
          duration: 300,
          element: (p) =>
            new ElementGroup(p, { x: '125%', y: '25%' }, [
              new LineElement(p, {
                start: { x: 0, y: 0 },
                end: { x: 0, y: 200 },
                color: colors.white,
                thickness: 3,
              }),
              new LineElement(p, {
                start: { x: 0, y: 200 },
                end: { x: -90, y: 400 },
                color: colors.white,
                thickness: 3,
              }),
              new LineElement(p, {
                start: { x: 0, y: 200 },
                end: { x: 90, y: 400 },
                color: colors.white,
                thickness: 3,
              }),
              new RectElement(
                p,
                { x: 0, y: 0 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.green,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              ),
              new RectElement(
                p,
                { x: 0, y: 200 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.red,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              ),
              new TextElement(
                p,
                { x: 0, y: 200 },
                {
                  text: 'div',
                  alignment: { h: 'center', v: 'center' },
                  size: 22,
                },
              ),
              new RectElement(
                p,
                { x: -90, y: 400 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.red,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              ),
              new TextElement(
                p,
                { x: -90, y: 400 },
                {
                  text: 'p',
                  alignment: { h: 'center', v: 'center' },
                  size: 22,
                },
              ),
              new RectElement(
                p,
                { x: 90, y: 400 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.red,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              ),
              new TextElement(
                p,
                { x: 90, y: 400 },
                {
                  text: 'btn',
                  alignment: { h: 'center', v: 'center' },
                  size: 22,
                },
              ),
            ]),
        },
      },
    },
  ],
}
