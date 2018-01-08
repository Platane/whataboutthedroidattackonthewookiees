export const cutPattern = (word: string, pattern: string) => {
  if (!pattern) return [{ text: word, type: 'normal' }]

  let s = 0
  let i

  const e = []

  const p = pattern.toLowerCase()
  const w = word.toLowerCase()

  while ((i = w.indexOf(p, s)) >= 0) {
    const pre = word.slice(s, i)

    s = i + p.length

    const pa = word.slice(i, s)

    e.push({ text: pre, type: 'normal' }, { text: pa, type: 'match' })
  }

  e.push({ text: word.slice(s), type: 'normal' })

  return e
}
