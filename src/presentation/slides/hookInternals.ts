import { fadeInAnim, linearMoveAnim, SlideData, TextElement } from '../../lib'
import { LineElement } from '../../lib/Elements/LineElement'
import { colors } from '../fontsList'
import { lineByLine } from './templates/lineByLine'
import {
  func,
  hook,
  key,
  keyword,
  string,
  tag,
  variable,
} from './templates/textColoring'

export const hooksInternals: SlideData = {
  title: 'Hook internals',
  background: colors.bg,
  frames: [
    {
      in: {
        globalState: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 26,
                text: `
${variable('globalState')} = {
    ${hook('hookIndex')}: 0,
    ${tag('componentKey')}: "1234-5678-9012"
}
                `,
              },
            ),
        },
      },
    },
    {
      in: {
        globalState: {
          animation: linearMoveAnim,
          endPos: { x: 100, y: '50%' },
          duration: 300,
          simultaneous: true,
        },
        fiber: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                size: 26,
                alignment: { v: 'center' },
                text: `${string('{')}
    ...
    ${tag('_key')}: "1234-5678-9012",
    ${key('hooks')}: [
        ${hook('{')}
            value: 0,
        ${hook('}')},
    ],
    ...
${string('}')}`,
              },
            ),
        },
      },
    },
    {
      in: {
        fiber: {
          animation: linearMoveAnim,
          endPos: { x: '80%', y: '50%' },
          duration: 300,
        },
        lineL: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new LineElement(p, {
              color: '#666',
              start: { x: '30%', y: '20%' },
              end: { x: '30%', y: '80%' },
            }),
        },
        lineR: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new LineElement(p, {
              color: '#666',
              start: { x: '70%', y: '20%' },
              end: { x: '70%', y: '80%' },
            }),
        },
      },
    },
    ...lineByLine(
      { x: '31%', y: '25%' },
      {
        size: 26,
        text: [
          `function useHook() {
    ${keyword('const')} ${variable('hookIndex')} = ${variable('globalState')}.${key('hookIndex')}
    ${keyword('const')} ${variable('componentKey')} = ${variable('globalState')}.${key('componentKey')}
    ${variable('globalState')}.${key('hookIndex++')}`,
          `
    ${keyword('const')} ${variable('componentFiberNode')} = ${variable('pointers')}.${func('get')}(${variable('componentKey')})
    ${keyword('const')} ${variable('hookState')} = ${variable('componentFiber')}.${key('hooks')}[${hook('hookIndex')}]
    // do work
    
    // update hook state
    ${hook('hookState')}.${key('value')} = newValue
}`,
        ],
      },
      { animation: fadeInAnim, duration: 250 },
    ),
  ],
}
