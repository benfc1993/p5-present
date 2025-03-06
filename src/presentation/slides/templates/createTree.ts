import { Sketch } from 'p5-typescript'
import { LineElement } from '../../../lib/Elements/LineElement'
import { colors } from '../../fontsList'
import { RectElement, TextElement } from '../../../lib'

type Node = {
  x: number
  label?: string
  color?: number[]
}

export function createTree(
  p: Sketch,
  tree: (Node | null)[][][],
  levelSpacing: number = 200,
  nodeRadius: number = 60,
) {
  const nodes: (RectElement | TextElement)[] = []
  const lines: LineElement[] = []

  let prevLevel: (null | Node)[][] | null = null
  tree.forEach((level, levelIdx) => {
    level.forEach((branch, branchIdx) => {
      branch.forEach((node, nodeIdx) => {
        if (node !== null) {
          createNode(levelIdx, node)
          if (prevLevel != null) {
            let prevNode = null
            let bidx = prevLevel[branchIdx] ? branchIdx : branchIdx - 1
            let nidx = nodeIdx
            while (prevNode === null && nidx >= 0) {
              const test = prevLevel[bidx][nidx]
              if (test !== undefined && test !== null) {
                prevNode = prevLevel[bidx][nidx]
              }
              nidx--
            }
            if (prevNode !== null)
              lines.push(line(levelIdx - 1, levelIdx, prevNode.x, node.x))
          }
        }
      })
    })
    prevLevel = level
  })

  function createNode(level: number, node: Node) {
    const pos = { x: node.x * nodeRadius, y: level * levelSpacing }
    nodes.push(
      new RectElement(p, pos, {
        size: { w: nodeRadius, h: nodeRadius },
        radius: 1000,
        stroke: node.color ?? colors.red,
        strokeWeight: 3,
        color: colors.bg,
      }),
    )
    if (node.label)
      nodes.push(
        new TextElement(p, pos, {
          text: node.label,
          alignment: { h: 'center', v: 'center' },
          size: 18,
        }),
      )
  }

  function line(
    fromLevel: number,
    toLevel: number,
    fromX: number,
    toX: number,
  ) {
    console.log(fromLevel, toLevel, fromX, toX)
    return new LineElement(p, {
      start: { x: fromX * nodeRadius, y: fromLevel * levelSpacing },
      end: {
        x: toX * nodeRadius,
        y: toLevel * levelSpacing,
      },
      color: colors.white,
    })
  }
  console.log([...lines, ...nodes])
  return [...lines, ...nodes]
}
