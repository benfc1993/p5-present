import filesList from '../fontsList.json'

export const fonts: Record<string, p5.Font> = {}

export const loadFonts = (p: p5) => {
  filesList.forEach((file: string) => {
    fonts[file.split('.')[0].toLowerCase()] = p.loadFont(`assets/fonts/${file}`)
  })
}
