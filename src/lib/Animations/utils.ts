export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
