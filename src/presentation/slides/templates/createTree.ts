import { Sketch } from 'p5-typescript'
import { LineElement } from '../../../lib/Elements/LineElement'
import { colors } from '../../fontsList'

type Tree = {
  children: Tree[]
}

export function createTree(
  p: Sketch,
  levelSpacing: number,
  nodeRadius: number,
) {
  //      | - 00
  //   |      | -200
  //   |     | | - 400
  //  | | -600
  //  | -800
  const rows = [1, 2, 3, 2, 1]

  function line(row: number, columnCount: number, column: number) {
    const rowWidth = nodeRadius * (columnCount + columnCount - 1)
    return new LineElement(p, {
      start: { x: 0, y: row * levelSpacing },
      end: {
        x: -rowWidth / 2 + nodeRadius * column,
        y: (row + 1) * levelSpacing,
      },
      color: colors.white,
    })
  }
  return [
    ...rows.flatMap((row, idx) => {
      return Array.from({ length: row }).map((_, col) => line(idx, row, col))
    }),
  ]
}
