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
import { createTree } from './templates/createTree'
import {
  func,
  highlight,
  hook,
  key,
  keyword,
  prop,
  string,
  tag,
  variable,
} from './templates/textColoring'

let componentNode: RectElement
let divNode: RectElement
let pNode: RectElement
let textNode: RectElement
let btnNode: RectElement

export const rerenderComponent: SlideData = {
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
${keyword('function')} ${func('MyComponent')} () {
    ${keyword('const')} [${variable('count')}, ${func('setCount')}] = ${func('useState')}(0)
    ${highlight('return', colors.purple)} (
        <${tag('div')}>
            <${tag('p')}>${string('Current count: ')}{${tag('count')}}</${tag('p')}>
            <${tag('button')} ${prop('onClick')}={${func('setCount')}}>${string('Increment')}</${tag('button')}>
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
                size: 16,
                lineHeight: 1,
                alignment: { v: 'center' },
                text: `
{
    ${key('tag')}: ${func('MyComponent')},
    ${key('isComponent')}: ${func('true')},
    ${key('_ref')}: #document.div,
    ${key('key')}: "1234-5678-9012",
    ${key('hooks')}: [
        ${hook('{')}
            ${key('value')}: ${tag('0')},
        ${hook('}')},
    ],
    ${key('child')}: {
        ${key('tag')}: "${tag('div')}",
        ${key('_ref')}: #document.div,
        ${key('child')}: {
            ${key('tag')}: "${tag('p')}",
            ${key('ref')}: #document.p,
            ${key('child')}: {
                ${key('tag')}: "TEXT",
                ${key('_ref')}: #document.text,
                ${key('props')}: {
                    ${key('value')}: "${string('Current count: 0')}"
                }
            },
            ${key('sibling')}: {
                ${key('tag')}: "${tag('button')}",
                ${key('_ref')}: #document.button,
                ${key('props')}: {
                    ${prop('onClick')}: setCount
                },
                ${key('child')}: {
                    ${key('tag')}: "TEXT",
                    ${key('_ref')}: #document.text,
                    ${key('props')}: {
                        ${key('value')}: "${string('Increment')}"
`,
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
              new LineElement(p, {
                start: { x: -90, y: 400 },
                end: { x: -90, y: 600 },
                color: colors.white,
                thickness: 3,
              }),
              (componentNode = new RectElement(
                p,
                { x: 0, y: 0 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.green,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              )),
              (divNode = new RectElement(
                p,
                { x: 0, y: 200 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.white,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              )),
              new TextElement(
                p,
                { x: 0, y: 200 },
                {
                  text: 'div',
                  alignment: { h: 'center', v: 'center' },
                  size: 22,
                },
              ),
              (pNode = new RectElement(
                p,
                { x: -90, y: 400 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.white,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              )),
              new TextElement(
                p,
                { x: -90, y: 400 },
                {
                  text: 'p',
                  alignment: { h: 'center', v: 'center' },
                  size: 22,
                },
              ),
              (textNode = new RectElement(
                p,
                { x: -90, y: 600 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.white,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              )),
              new TextElement(
                p,
                { x: -90, y: 600 },
                {
                  text: 'TEXT',
                  alignment: { h: 'center', v: 'center' },
                  size: 20,
                },
              ),
              (btnNode = new RectElement(
                p,
                { x: 90, y: 400 },
                {
                  size: { h: 60, w: 60 },
                  radius: 1000,
                  stroke: colors.white,
                  strokeWeight: 3,
                  color: colors.bg,
                },
              )),
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
    {
      out: {
        component_json: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
        fiberHeader: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
        treeHeader: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
        line: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
      },
    },
    {
      in: {
        tree: {
          animation: linearMoveAnim,
          endPos: { x: '50%', y: '25%' },
          duration: 300,
          simultaneous: true,
        },
        beforeHeader: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '25%', y: '10%' },
              { alignment: { h: 'center' }, text: 'Before' },
            ),
        },
        reconcileL: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '15%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('MyComponent')},
    ${key('props')}:{},
    ${key('key')}: ${func('"1234-5678-9012"')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
        afterHeader: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '75%', y: '10%' },
              { alignment: { h: 'center' }, text: 'After' },
            ),
        },
        reconcileR: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('MyComponent')},
    ${key('props')}:{},
    ${key('key')}: ${func('"1234-5678-9012"')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
      },
      onEnter() {
        componentNode.stroke = colors.yellow
      },
    },
    {
      out: {
        reconcileL: {
          animation: linearMoveAnim,
          endPos: { x: '15%', y: -600 },
          duration: 300,
          simultaneous: true,
        },
        reconcileR: {
          animation: linearMoveAnim,
          endPos: { x: '65%', y: -600 },
          duration: 300,
        },
      },
      in: {
        reconcileL2: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '15%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('div')},
    ${key('props')}:{},
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
        reconcileR2: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('div')},
    ${key('props')}:{},
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
      },
      onEnter() {
        componentNode.stroke = colors.green
        divNode.stroke = colors.yellow
      },
    },
    {
      out: {
        reconcileL2: {
          animation: linearMoveAnim,
          endPos: { x: '15%', y: -600 },
          duration: 300,
          simultaneous: true,
        },
        reconcileR2: {
          animation: linearMoveAnim,
          endPos: { x: '65%', y: -600 },
          duration: 300,
        },
      },
      in: {
        reconcileL3: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '15%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('p')},
    ${key('props')}:{},
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
        reconcileR3: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('p')},
    ${key('props')}:{},
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
      },
      onEnter() {
        divNode.stroke = colors.white
        pNode.stroke = colors.yellow
      },
    },
    {
      out: {
        reconcileL3: {
          animation: linearMoveAnim,
          endPos: { x: '15%', y: -600 },
          duration: 300,
          simultaneous: true,
        },
        reconcileR3: {
          animation: linearMoveAnim,
          endPos: { x: '65%', y: -600 },
          duration: 300,
        },
      },
      in: {
        reconcileL4: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '15%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('TEXT')},
    ${key('props')}:{
        ${key('value')}: "${tag('Current count: 0')}"
    },
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
        reconcileR4: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('TEXT')},
    ${key('props')}:{
        ${key('value')}: "${tag('Current count: 1')}"
    },
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: ${highlight('true', colors.purple)}
}`,
              },
            ),
        },
      },
      onEnter() {
        pNode.stroke = colors.white
        textNode.stroke = colors.yellow
      },
      onExit() {
        textNode.stroke = colors.purple
      },
    },
    {
      out: {
        reconcileL4: {
          animation: linearMoveAnim,
          endPos: { x: '15%', y: -600 },
          duration: 300,
          simultaneous: true,
        },
        reconcileR4: {
          animation: linearMoveAnim,
          endPos: { x: '65%', y: -600 },
          duration: 300,
        },
      },
      in: {
        reconcileL5: {
          animation: fadeInAnim,
          duration: 300,
          simultaneous: true,
          element: (p) =>
            new TextElement(
              p,
              { x: '15%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('button')},
    ${key('props')}:{
        ${key('onClick')}: ${func('setCount')}
    },
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
        reconcileR5: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 34,
                text: `{
    ${key('tag')}: ${func('button')},
    ${key('props')}:{
        ${key('onClick')}: ${func('setCount')}
    },
    ${key('key')}: ${func('""')},
    ${key('isDirty')}: false
}`,
              },
            ),
        },
      },
      onEnter() {
        btnNode.stroke = colors.yellow
      },
    },
    {
      onEnter() {
        btnNode.stroke = colors.white
      },
      out: {
        beforeHeader: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
        afterHeader: {
          animation: fadeOutAnim,
          duration: 300,
          simultaneous: true,
        },
        reconcileL5: {
          animation: linearMoveAnim,
          endPos: { x: '15%', y: -600 },
          duration: 300,
          simultaneous: true,
        },
        reconcileR5: {
          animation: linearMoveAnim,
          endPos: { x: '65%', y: -600 },
          duration: 300,
        },
      },
      in: {
        tree: {
          animation: linearMoveAnim,
          endPos: { x: '25%', y: '25%' },
          duration: 300,
        },
        oldTree: {
          animation: fadeInAnim,
          duration: 300,
          element: (p) =>
            new ElementGroup(p, { x: '75%', y: '25%' }, createTree(p, 200, 90)),
        },
      },
    },
  ],
}
