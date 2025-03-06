import {
  fadeInAnim,
  fadeOutAnim,
  linearMoveAnim,
  RectElement,
  SlideData,
  TextElement,
} from '../../lib'
import { colors } from '../fontsList'
import {
  func,
  hook,
  key,
  keyword,
  prop,
  string,
  tag,
  variable,
} from './templates/textColoring'

export const hooks: SlideData = {
  title: 'Create Element Children',
  background: colors.bg,
  frames: [
    {
      in: {
        componentFunction: {
          animation: fadeInAnim,
          duration: 250,
          element(p) {
            return new TextElement(
              p,
              { x: '40%', y: '25%' },
              {
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
    {
      out: {
        componentFunction: {
          animation: fadeOutAnim,
          duration: 250,
          simultaneous: true,
        },
      },
      in: {
        componentFunctionWithHooks: {
          animation: fadeInAnim,
          duration: 250,
          element(p) {
            return new TextElement(
              p,
              { x: '40%', y: '25%' },
              {
                color: colors.white,
                size: 30,
                text: `
${keyword('function')} ${func('MyComponent')} ( ) {
    ${keyword('const')} [${variable('count')}, ${func('setCount')}] = ${hook('useState')}(0)
    ${keyword('return')} (
        <${tag('div')}>
            <${tag('p')}>${string('Current count:')} {${variable('count')}}</${tag('p')}>
            <${tag('button')} ${prop('onClick')}={${func('setCount')}}>
                ${string('Increment')}
            </${tag('button')}>
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
    {
      in: {
        componentFunctionWithHooks: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: 100, y: '25%' },
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
    ${key('isComponent')}: ${variable('true')},
    ${key('_ref')}: ${variable('#document')}.${key('div')},
    ${key('hooks')}: [
        ${hook('{')}
            ${key('value')}: ${tag('0')},
        ${hook('}')},
    ]
    ...
}`,
              },
            ),
        },
      },
    },
  ],
}
