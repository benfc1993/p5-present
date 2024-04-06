import p5 from 'p5'

export const loadFonts = (p: p5, filesList: readonly string[]) => {
  const fonts: Record<string, p5.Font> = {}
  filesList.forEach((file: string) => {
    fonts[file.split('.')[0].toLowerCase()] = p.loadFont(`assets/fonts/${file}`)
  })
  return fonts
}
