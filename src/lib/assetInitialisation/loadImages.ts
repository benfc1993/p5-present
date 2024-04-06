import p5 from 'p5'

export const loadImages = (p: p5, filesList: readonly string[]) => {
  const images: Record<string, p5.Image> = {}
  filesList.forEach((file: string) => {
    images[file.split('.')[0]] = p.loadImage(`./assets/images/${file}`)
  })
  return images
}
