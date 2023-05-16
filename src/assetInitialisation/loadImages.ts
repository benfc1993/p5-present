import filesList from '../imagesList.json'

export const images: Record<string, p5.Image> = {}

export const loadImages = (p: p5) => {
  filesList.forEach((file: string) => {
    images[file.split('.')[0]] = p.loadImage(`assets/images/${file}`)
  })
}
