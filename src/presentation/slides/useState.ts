import { SlideData, TextElement } from '../../lib'
import { colors } from '../fontsList'
import { func, key, keyword, variable } from './templates/textColoring'

export const useState: SlideData = {
  title: 'Create Element Children',
  background: colors.bg,
  frames: [
    {
      in: {
        useState: {
          element: (p) =>
            new TextElement(
              p,
              { x: '40%', y: '50%' },
              {
                alignment: { v: 'center' },
                size: 24,
                lineHeight: 1,
                color: colors.white,
                text: `${keyword('function')} ${func('useState')}( ) {
    // initialise hook
    ${keyword('const')} ${variable('component')} = ${variable('componentPointers')}.${func('get')}(${variable('componentKey')})

    ${keyword('const')} ${func('setState')} = ${keyword('async')} (next) => {

        ${variable('scheduler')}.${func('add')}(( ) => {
            ${func('rerender')}(
                ${variable('component')}.${key('tag')},
                {
                    ...${variable('component')}.${key('props')},
                    ${key('key')}: ${variable('componentKey')},
                }
            )
        })
    }

    ${keyword('return')} [${variable('hookState')}.${key('value')}, ${func('setState')}]
}`,
              },
            ),
        },
      },
    },
  ],
}
