import type { Word } from './findWords'

const inverseInterval = interval => {
  const out = []

  if (!interval[0]) return [[-Infinity, Infinity]]

  if (interval[0][0] > -Infinity) out.push([-Infinity, interval[0][0]])

  for (let i = 1; i < interval.length; i++)
    out.push([interval[i - 1][1], interval[i][0]])

  if (interval[interval.length - 1][1] < Infinity)
    out.push([interval[interval.length - 1][1], Infinity])

  return out
}

export const getStartIndex = (
  words: Word[],
  start: number,
  a: number = 0
): number => {
  let b = words.length

  if (words[0] && words[0].start >= start) return 0

  while (b - a > 1) {
    const e = Math.floor((a + b) / 2)

    if (words[e].start < start) a = e
    else if (words[e].start >= start) b = e
  }

  return b
}

export const getWordsInRange = (
  words: Word[],
  start: number,
  end: number
): Word[] => {
  const m = []

  for (
    let i = getStartIndex(words, start);
    i < words.length && words[i].start <= end;
    i++
  ) {
    if (words[i].end <= end) m.push(words[i])
  }

  return m
}

export const getWordCombinaisons = (words: Word[]) => {
  const o = {}
  words.forEach(w => (o[w.word] = o[w.word] || []).push(w))

  const combine = (ws, s = 0) => {
    if (ws.length === 0) return [[]]

    return [].concat(
      ...ws.map(words => {
        const wss = ws.filter(x => x !== words)

        return [].concat(
          ...words.map(word => {
            if (word.start < s) return []

            return combine(wss, word.end + 1).map(x => [word, ...x])
          })
        )
      })
    )
  }

  return (sentence: string[]) => combine(sentence.map(word => o[word]))
}

export const getAvailableWords = (words: Word[]) => {
  const getCombinaisons = getWordCombinaisons(words)

  const removeDuplicate = arr => {
    const h = new Map()
    arr.forEach(x => h.set(x, true))
    return Array.from(h.entries()).map(([x]) => x)
  }

  const mergeIntervals = i => {
    for (let u = 0; u < i.length; u++)
      for (let v = u + 1; v < i.length; v++) {
        if (i[u][0] <= i[v][0] && i[u][1] >= i[v][1]) {
          i.splice(v, 1)

          return mergeIntervals(i)
        }

        if (i[v][0] <= i[u][0] && i[v][1] >= i[u][1]) {
          i.splice(u, 1)

          return mergeIntervals(i)
        }
      }

    return i
  }

  return (sentence: string[]) => {
    const combinaisons = getCombinaisons(sentence)

    const intervals = [].concat(
      ...combinaisons.map(arr =>
        inverseInterval(arr.map(x => [x.start - 1, x.end + 1]))
      )
    )

    mergeIntervals(intervals)

    return removeDuplicate(
      [].concat(...intervals.map(([a, b]) => getWordsInRange(words, a, b)))
    )
  }
}
