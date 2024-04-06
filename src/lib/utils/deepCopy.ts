export const deepCopy = <T extends object>(obj: T): T => {
  let entries = Object.entries(obj)
  const copy: T = {} as T
  entries.forEach(([key, value]) => {
    if (value instanceof Array) {
      copy[key as keyof T] = [
        ...value.map((item) =>
          typeof item === 'object' ? deepCopy(item) : item
        ),
      ] as any
    } else if (value instanceof Object) {
      const partial = deepCopy(value)
      copy[key as keyof T] = { ...partial }
    } else {
      copy[key as keyof T] = value
    }
  })
  return copy
}
