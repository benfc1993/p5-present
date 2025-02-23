import { colors } from '../../fontsList'

export function tag(text: string) {
  return highlight(text, colors.red)
}

export function string(text: string) {
  return highlight(text, colors.yellow)
}

export function func(text: string) {
  return highlight(text, colors.green)
}

export function hook(text: string) {
  return highlight(text, colors.blue)
}

export function prop(text: string) {
  return highlight(text, colors.blue)
}

export function highlight(
  text: string,
  color: string | [number, number, number],
) {
  return `[*(${color})*]${text}[*0r*]`
}
