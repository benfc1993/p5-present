import {
  fadeInAnim,
  fadeOutAnim,
  linearMoveAnim,
  RectElement,
  SlideData,
  TextElement,
} from '../../lib'
import { colors } from '../fontsList'
import { func, string, tag } from './templates/textColoring'

export const Component: SlideData = {
  title: 'Create Element',
  background: colors.bg,
  frames: [
    {
      in: {
        componentJsx: {
          animation: fadeInAnim,
          duration: 250,
          element: (p) =>
            new TextElement(
              p,
              { x: 100, y: '50%' },
              {
                color: colors.white,
                size: 30,
                text: `<${tag('MyComponent')} />`,

                alignment: { v: 'center' },
              },
            ),
        },
      },
    },
    {
      in: {
        componentJsx: {
          animation: linearMoveAnim,
          duration: 250,
          endPos: { x: 100, y: '15%' },
        },
        componentFunciton: {
          element(p) {
            return new TextElement(
              p,
              { x: 100, y: '25%' },
              {
                color: colors.white,
                size: 30,
                text: `
function ${func('MyComponent')} () {

    return (
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
      in: {
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
        },
        json_small: {
          animation: fadeInAnim,
          duration: 250,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                color: colors.white,
                size: 25,
                lineHeight: 1,
                alignment: { v: 'center' },
                text: `
{
    tag: "${tag('MyComponent')}",
    isComponent: ${func('true')},
    fn: ${func('MyComponent')},
    ...
}`,
              },
            ),
        },
      },
    },
    {
      out: {
        json_small: {
          animation: linearMoveAnim,
          simultaneous: true,
          duration: 250,
          endPos: { x: '65%', y: '15%' },
        },
      },
      in: {
        json: {
          simultaneous: true,
          animation: fadeInAnim,
          duration: 250,
          element: (p) =>
            new TextElement(
              p,
              { x: '65%', y: '50%' },
              {
                color: colors.white,
                size: 25,
                lineHeight: 1,
                alignment: { v: 'center' },
                text: `
{
    tag: "${tag('MyComponent')}",
    isComponent: ${func('true')},
    fn: ${func('MyComponent')},
    child: {
        tag: "${tag('div')}",
        child:{
            tag: "${tag('p')}",
            child: {
                tag: "TEXT",
                props: {
                    value: "${string('Current count: 0')}"
                }
            }
            sibling: {
                tag: "${tag('button')}",
                child: {
                    tag: "TEXT",
                    props: {
                        value: "${string('Increment')}"
                    }
                }
            }
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
// function MyComponent(){
//
//     return (
//         <div>
//             <p>Current count: 0</p>
//             <button>Increment</button>
//         </div>
//     )
// }
