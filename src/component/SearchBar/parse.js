import { getWordCombinaisons, getAvailableWords } from '../../word/partialWord'

const removeDuplicate = arr => {
  const o = {}
  arr.forEach(x => (o[x] = true))
  return Object.keys(o)
}

// export const formatOption = words => removeDuplicate(words.map(w => w.word))

export const formatOption = words => {
  const g = getAvailableWords(words)

  return (value: string[]) => removeDuplicate(g(value).map(w => w.word))
}

export const formatValue = words => {
  const g = getWordCombinaisons(words)

  return (value: string[]) =>
    g(value)[0]
      .sort((a, b) => (a.start < b.start ? -1 : 1))
      .map(w => w.word)
}

const memoize = fn => {
  let memory = { value: null, arg: null }

  return arg => {
    if (memory.arg === arg) return memory.value

    memory.arg = arg
    return (memory.value = fn(arg))
  }
}

export const formatCount = (x: number) => {
  const s = []
  const c = x
    .toString()
    .split('')
    .reverse()
  while (c.length)
    s.unshift(
      c
        .splice(0, 3)
        .filter(Boolean)
        .reverse()
        .join('')
    )
  return s.join(' ')
}
