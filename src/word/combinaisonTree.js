import { getStartIndex } from './partialWord'
import type { Word } from './findWords'

type CombinaisonTree = {
  sum: number,

  full: string[],

  fragmented: {
    sum: number,
    sum_next: number,
    prefixes: string[],
    next: CombinaisonTree[],
  }[],
}

const getWordInExactRange = words_by_start => (start, end) => {
  const c = []

  const s = words_by_start[start]

  if (!s.length) return c

  // dichotomie
  let i = 0
  {
    let a = 0
    let b = s.length - 1

    while (b - a > 1) {
      const e = Math.floor((a + b) / 2)

      if (s[e].end < end) a = e
      else b = e
    }

    i = s[a].end === end ? a : b
  }

  for (; i < s.length && s[i].end == end; i++) c.push(s[i].word)

  return c
}

const memoize = fn => {
  const mem = {}

  return (a: number, b: number): * => {
    const key = a + '' + b
    return mem[key] ? mem[key] : (mem[key] = fn(a, b))
  }
}

const createSortByStart = (words: Word[]) => {
  const words_by_start = []

  // populate the array by start
  words.forEach(w =>
    (words_by_start[w.start] = words_by_start[w.start] || []).push(w)
  )

  // sort each sub array
  for (let i = words_by_start.length; i--; )
    words_by_start[i] = (words_by_start[i] || []).sort(
      (a, b) => (a.end < b.end ? -1 : 1)
    )

  // get the max end
  const maxEnd = words_by_start.reduce(
    (max, arr) => Math.max(max, (arr.length && arr[arr.length - 1].end) || 0),
    0
  )

  // complete to have a value for each value from 0 to end
  for (let i = words_by_start.length; i <= maxEnd; i++) words_by_start.push([])

  return words_by_start
}

export const create = (words: Word[]): CombinaisonTree => {
  const words_by_start = createSortByStart(words)

  const getWordInExactRange_m = memoize(getWordInExactRange(words_by_start))

  const buildCombinaisonStartingAt = memoize(
    (start: number, end: number): CombinaisonTree => {
      const full = getWordInExactRange_m(start, end)

      const fragmented = []

      let full_sum = full.length

      for (let k = start; k < end; k++) {
        const prefixes = getWordInExactRange_m(start, k)

        if (prefixes.length > 0) {
          // no need to compute the next step otherwise
          //
          const next = []
          let sum_next = 0

          for (let h = k + 1; h <= end; h++) {
            const n = buildCombinaisonStartingAt(h, end)
            sum_next += n.sum
            if (n.sum) next.push(n)
          }

          const sum = prefixes.length * (sum_next + 1)

          full_sum += sum

          if (sum)
            fragmented.push({
              prefixes,
              next,
              sum_next,
              sum,
            })
        }
      }

      return {
        full,
        fragmented,
        sum: full_sum,
      }
    }
  )

  const end = words_by_start.length - 1

  let sum = 0

  const fragmented = []

  for (let start = 0; start <= end; start++) {
    const prefixes = ['']
    const next = buildCombinaisonStartingAt(start, end)
    sum += next.sum

    if (next.sum)
      fragmented.push({
        prefixes,
        next: [next],
        sum: next.sum,
        sum_next: next.sum,
      })
  }

  return {
    full: [],
    fragmented,
    sum,
  }
}

export const getCombinaisonAt = (ct: CombinaisonTree, n: number): string => {
  if (ct.full[n]) return ct.full[n]

  n = n - ct.full.length

  let fragment = null
  let prefix = null
  let next = null

  // select the fragment
  {
    let i = 0
    while (i < ct.fragmented.length && n >= ct.fragmented[i].sum) {
      n = n - ct.fragmented[i].sum
      i++
    }

    fragment = ct.fragmented[i]
  }

  if (!fragment) return ''

  // select the prefix
  {
    const s = fragment.sum_next + 1

    const k = Math.floor(n / s)

    prefix = fragment.prefixes[k]

    n = n - k * s
  }

  // select the next
  {
    let i = 0
    while (i < fragment.next.length && n >= fragment.next[i].sum) {
      n = n - fragment.next[i].sum
      i++
    }

    next = fragment.next[i]
  }

  const suffix = next ? getCombinaisonAt(next, n) : ''

  return (prefix || '') + (prefix && suffix ? ' ' : '') + (suffix || '')
}
