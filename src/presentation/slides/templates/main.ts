import { ElementGroup } from '../../../Elements/ElementGroup'
import { RectElement } from '../../../Elements/RectElement'
import { TitleElement } from '../../../Elements/TextElement'
import { Frame, SlideData } from '../../../Slide'
import { titleFontSize } from '../../utils'
import { slideBackground } from './baseSlide'

export const mainSlide = (
  title: string,
  frames: Frame[],
  withHeader: boolean = false
): SlideData => ({
  title,
  background: slideBackground,
  frames: [
    {
      in: {
        header: {
          element: (p) =>
            new ElementGroup(p, { x: 0, y: 0 }, [
              new RectElement(
                p,
                { x: '100% + -100', y: 0, rot: 45 },
                { color: [62, 217, 181], size: { w: 500, h: 200 } }
              ),
              new RectElement(
                p,
                { x: '5% +200', y: '15%' },
                { color: [62, 217, 181], size: { w: 400, h: 4 } }
              ),
              new TitleElement(
                p,
                { x: '6%', y: '15%' },
                { text: title, size: titleFontSize - 15 }
              ),
            ]),
          simultaneous: true,
        },
        ...(withHeader && { ...frames[0].in }),
      },
      ...(withHeader && { out: frames[0].out }),
    },
    ...frames.slice(withHeader ? 1 : 0),
  ],
})
