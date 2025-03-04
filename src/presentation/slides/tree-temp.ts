//     // Fiber => tree
//     {
//       out: {
//         componentWithChildrenJsx: {
//           animation: linearMoveAnim,
//           endPos: { x: -1000, y: '50%' },
//           duration: 300,
//           simultaneous: true,
//         },
//         jsxHeader: {
//           animation: linearMoveAnim,
//           endPos: { x: '-25%', y: 100 },
//           duration: 300,
//           simultaneous: true,
//         },
//       },
//       in: {
//         component_with_children_json: {
//           animation: linearMoveAnim,
//           endPos: { x: 100, y: '10%' },
//           duration: 300,
//           simultaneous: true,
//         },
//         fiberHeader: {
//           animation: linearMoveAnim,
//           endPos: { x: '25%', y: 100 },
//           duration: 300,
//           simultaneous: true,
//         },
//         treeHeader: {
//           animation: linearMoveAnim,
//           endPos: { x: '75%', y: 100 },
//           duration: 300,
//           simultaneous: true,
//           element: (p) =>
//             new TextElement(
//               p,
//               { x: '125%', y: 100 },
//               { text: 'Tree', alignment: { h: 'center' } },
//             ),
//         },
//         tree: {
//           animation: linearMoveAnim,
//           endPos: { x: '75%', y: '25%' },
//           duration: 300,
//           element: (p) =>
//             new ElementGroup(p, { x: '125%', y: '25%' }, [
//               new LineElement(p, {
//                 start: { x: 0, y: 0 },
//                 end: { x: -90, y: 200 },
//                 color: colors.white,
//                 thickness: 3,
//               }),
//               new LineElement(p, {
//                 start: { x: 0, y: 0 },
//                 end: { x: 90, y: 200 },
//                 color: colors.white,
//                 thickness: 3,
//               }),
//               new LineElement(p, {
//                 start: { x: -90, y: 200 },
//                 end: { x: 90, y: 200 },
//                 color: colors.red,
//                 thickness: 1,
//               }),
//               new RectElement(
//                 p,
//                 { x: 0, y: 0 },
//                 {
//                   size: { h: 60, w: 60 },
//                   radius: 1000,
//                   stroke: colors.red,
//                   strokeWeight: 3,
//                   color: colors.bg,
//                 },
//               ),
//               new TextElement(
//                 p,
//                 { x: 0, y: 0 },
//                 {
//                   text: 'div',
//                   alignment: { h: 'center', v: 'center' },
//                   size: 22,
//                 },
//               ),
//               new RectElement(
//                 p,
//                 { x: -90, y: 200 },
//                 {
//                   size: { h: 60, w: 60 },
//                   radius: 1000,
//                   stroke: colors.red,
//                   strokeWeight: 3,
//                   color: colors.bg,
//                 },
//               ),
//               new TextElement(
//                 p,
//                 { x: -90, y: 200 },
//                 {
//                   text: 'p',
//                   alignment: { h: 'center', v: 'center' },
//                   size: 22,
//                 },
//               ),
//               new RectElement(
//                 p,
//                 { x: 90, y: 200 },
//                 {
//                   size: { h: 60, w: 60 },
//                   radius: 1000,
//                   stroke: colors.red,
//                   strokeWeight: 3,
//                   color: colors.bg,
//                 },
//               ),
//               new TextElement(
//                 p,
//                 { x: 90, y: 200 },
//                 {
//                   text: 'btn',
//                   alignment: { h: 'center', v: 'center' },
//                   size: 22,
//                 },
//               ),
//             ]),
//         },
//       },
//     },
//     {
//       in: {
//         createElement: {
//           element: (p) =>
//             new TextElement(
//               p,
//               { x: '55%', y: '65%' },
//               {
//                 text: `
// ${string('parent')}.${hook('appendElement')}( ${string('document')}.${hook('createElement')}(${tag('tag')}) )`,
//                 size: 28,
//               },
//             ),
//         },
//       },
//     },
