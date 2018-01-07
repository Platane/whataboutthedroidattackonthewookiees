export const hash = x =>
  Math.abs(
    x
      .toString()
      .toLowerCase()
      .replace(/([^a-z\d])/g, '')
      .split('')
      .reduce((hash, x) => {
        const char = parseInt(x, 36)

        hash = (hash << 5) - hash + char

        return hash & hash
      }, 0)
  )
