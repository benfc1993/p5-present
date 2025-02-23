import {
  fadeInAnim,
  fadeOutAnim,
  linearMoveAnim,
  RectElement,
  SlideData,
  TextElement,
} from '../../lib'
import { colors } from '../fontsList'
import { func, hook, prop, string, tag } from './templates/textColoring'

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
<${tag('p')} ${prop('className')}="my-class">
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
    tag: "${tag('p')}",
    _ref: #document.p,
    props: {
        ${prop('className')}: "my-class"
    },
    child: {
        tag: "TEXT",
        _ref: #document.text,
        props: {
            value: "${string('Hello World')}"
        }
    }
}`,
              },
            ),
        },
      },
    },
    //     {
    //       out: {
    //         tag: {
    //           animation: fadeOutAnim,
    //           duration: 250,
    //           simultaneous: true,
    //         },
    //         json: {
    //           animation: fadeOutAnim,
    //           duration: 250,
    //         },
    //       },
    //       in: {
    //         componentJsx: {
    //           animation: fadeInAnim,
    //           simultaneous: true,
    //           duration: 250,
    //           element: (p) =>
    //             new TextElement(
    //               p,
    //               { x: 100, y: '50%' },
    //               {
    //                 color: colors.white,
    //                 size: 30,
    //                 text: `<${tag('MyComponent')} />`,
    //
    //                 alignment: { v: 'center' },
    //               },
    //             ),
    //         },
    //       },
    //     },
    //     {
    //       in: {
    //         componentJsx: {
    //           animation: linearMoveAnim,
    //           duration: 250,
    //           endPos: { x: 100, y: '15%' },
    //         },
    //         componentFunction: {
    //           element(p) {
    //             return new TextElement(
    //               p,
    //               { x: 100, y: '25%' },
    //               {
    //                 color: colors.white,
    //                 size: 30,
    //                 text: `
    // function ${func('MyComponent')} () {
    //
    //     return (
    //         <${tag('div')}>
    //             <${tag('p')}>${string('Current count: 0')}</${tag('p')}>
    //             <${tag('button')}>${string('Increment')}</${tag('button')}>
    //         </${tag('div')}>
    //     )
    // }
    //                                            `,
    //               },
    //             )
    //           },
    //         },
    //       },
    //     },
    //     {
    //       in: {
    //         component_json_small: {
    //           animation: fadeInAnim,
    //           duration: 250,
    //           element: (p) =>
    //             new TextElement(
    //               p,
    //               { x: '65%', y: '50%' },
    //               {
    //                 color: colors.white,
    //                 size: 25,
    //                 lineHeight: 1,
    //                 alignment: { v: 'center' },
    //                 text: `
    // {
    //     tag: "${tag('MyComponent')}",
    //     isComponent: ${func('true')},
    //     fn: ${func('MyComponent')},
    //     ...
    // }`,
    //               },
    //             ),
    //         },
    //       },
    //     },
    //     {
    //       out: {
    //         component_json_small: {
    //           animation: linearMoveAnim,
    //           simultaneous: true,
    //           duration: 200,
    //           endPos: { x: '65%', y: '10%' },
    //         },
    //       },
    //       in: {
    //         component_json: {
    //           simultaneous: true,
    //           animation: fadeInAnim,
    //           duration: 250,
    //           element: (p) =>
    //             new TextElement(
    //               p,
    //               { x: '65%', y: '10%' },
    //               {
    //                 color: colors.white,
    //                 size: 25,
    //                 lineHeight: 1,
    //                 text: `
    // {
    //     tag: "${tag('MyComponent')}",
    //     isComponent: ${func('true')},
    //     fn: ${func('MyComponent')},
    //     child: {
    //         tag: "${tag('div')}",
    //         child: {
    //             tag: "${tag('p')}",
    //             child: {
    //                 tag: "TEXT",
    //                 props: {
    //                     value: "${string('Current count: 0')}"
    //                 }
    //             }
    //             sibling: {
    //                 tag: "${tag('button')}",
    //                 child: {
    //                     tag: "TEXT",
    //                     props: {
    //                         value: "${string('Increment')}"
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }`,
    //               },
    //             ),
    //         },
    //       },
    //     },
    //     {
    //       out: {
    //         componentJsx: {
    //           simultaneous: true,
    //           animation: fadeOutAnim,
    //           duration: 300,
    //         },
    //         component_json: {
    //           simultaneous: true,
    //           animation: fadeOutAnim,
    //           duration: 300,
    //         },
    //         line: { animation: fadeOutAnim, duration: 200 },
    //       },
    //       in: {
    //         componentFunction: {
    //           animation: linearMoveAnim,
    //           duration: 250,
    //           endPos: { x: '40%', y: '25%' },
    //         },
    //       },
    //     },
    //     {
    //       out: {
    //         componentFunction: {
    //           animation: fadeOutAnim,
    //           duration: 100,
    //           simultaneous: true,
    //         },
    //       },
    //       in: {
    //         componentHookFunction: {
    //           animation: fadeInAnim,
    //           duration: 200,
    //           simultaneous: true,
    //           element(p) {
    //             return new TextElement(
    //               p,
    //               { x: '40%', y: '25%' },
    //               {
    //                 color: colors.white,
    //                 size: 30,
    //                 text: `
    // function ${func('MyComponent')} () {
    //
    //     const [${tag('count')}, ${func('setCount')}] = ${hook('useState(')}${tag('0')}${hook(')')}
    //
    //     return (
    //         <div>
    //             <p>Current count: {${tag('count')}}</p>
    //             <button onClick={${func('setCount')}}>
    //                 Increment
    //             </button>
    //         </div>
    //     )
    // }
    //                                            `,
    //               },
    //             )
    //           },
    //         },
    //       },
    //     },
    //     {
    //       in: {
    //         componentHookFunction: {
    //           animation: linearMoveAnim,
    //           duration: 300,
    //           endPos: { x: 100, y: '25%' },
    //         },
    //       },
    //     },
    //     {
    //       in: {
    //         line: {
    //           element(p) {
    //             return new RectElement(
    //               p,
    //               { x: '50%', y: '50%' },
    //               { size: { w: 1, h: '80%' }, color: colors.white },
    //             )
    //           },
    //           animation: fadeInAnim,
    //           duration: 150,
    //         },
    //         hook_json_small: {
    //           animation: fadeInAnim,
    //           duration: 250,
    //           element: (p) =>
    //             new TextElement(
    //               p,
    //               { x: '65%', y: '50%' },
    //               {
    //                 color: colors.white,
    //                 size: 30,
    //                 lineHeight: 1,
    //                 alignment: { v: 'center' },
    //                 text: `
    // {
    //     tag: "MyComponent",
    //     isComponent: true,
    //     fn: MyComponent,
    //     ${hook('hooks')}: [
    //         {
    //             value: ${tag('0')},
    //             setState: ${func('()=>{}')}
    //         }
    //     ]
    //     ...
    // }`,
    //               },
    //             ),
    //         },
    //       },
    //     },
  ],
}
