export function hex(hexStr: string): [number, number, number] {
  const hexString = hexStr.replace('#', '')

  const str = Array.from({ length: 6 / hexString.length })
    .fill(hexString)
    .join('')

  if (str.length !== 6) {
    console.error('invalid hex value passed: ', hexString)
  }

  return [
    parseInt(str.slice(0, 2), 16),
    parseInt(str.slice(2, 4), 16),
    parseInt(str.slice(4, 6), 16),
  ]
}
