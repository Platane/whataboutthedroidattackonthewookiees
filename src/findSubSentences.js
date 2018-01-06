import type { Char, WordTree } from './wordTree'
import { create as createWordTree } from './wordTree'

type Word = { start: number, end: number, word: string }

export const findWords = (
  subTree: WordTree,
  s: Char[],
  words: Word[] = [],
  prefix: string = '',
  i: number = 0,
  start: number
): Word[] => {
  if (subTree.isWord) words.push({ word: prefix, start, end: i })

  const acc = []
  while (s.length) {
    const c = s.shift()
    acc.push(c)

    if (subTree[c])
      findWords(
        subTree[c],
        s,
        words,
        prefix + c,
        i + acc.length,
        !prefix ? i + acc.length : start
      )
  }

  s.push(...acc)

  return words
}

export const trimRedundantWords = (words: Word[]): Word[] => {
  const o = {}
  words.forEach(x => {
    const others = (o[x.word] = o[x.word] || [])

    let push = true

    for (let i = others.length; i--; ) {
      if (
        (others[i].start == x.start && others[i].end < x.end) ||
        (others[i].end == x.end && others[i].start > x.start)
      ) {
        push = false
      }

      if (
        (others[i].start == x.start && others[i].end >= x.end) ||
        (others[i].end == x.end && others[i].start <= x.start)
      ) {
        others.splice(i, 1)
      }
    }

    if (push) others.push(x)
  })

  const trim = []

  Object.keys(o).forEach(w => trim.push(...o[w]))

  return trim
}

export const combineWords = (words: Word[]): Word[] => {
  words.sort((a, b) => (a.start < b.start ? -1 : 1))

  for (let a = 0; a < words.length; a++) {
    let b = words.length - 1

    while (words[a].end < words[b].start)
      words.splice(a + 1, 0, {
        start: words[a].start,
        end: words[b].end,
        word: words[a].word + ' ' + words[b].word,
      })
  }

  return words
}

const extractUniqueWords = words => {
  const o = {}
  words.forEach(({ word }) => (o[word] = true))
  return Object.keys(o)
}

export const findSubSentences = (words: string[]) => {
  // build a tree containing the words
  // this will allows to quick access validity
  // each node hold a letter,
  // the word formed by the letter from the root to the leaf is valid <=> the leaf holds "isWord"
  const wordTree = createWordTree(words)

  return (sentence: string): string[] => {
    // remove spaces and transfom into char array
    const s = sentence
      .toLowerCase()
      .replace(/ /g, '')
      .split('')

    // find all the words which are valid in s
    // annotate with the start and end of the word
    const words = findWords(wordTree, s)

    // remove duplicated words ( which are in the same interval )
    const trimWords = trimRedundantWords(words)

    // generate all the combinaisons
    const combinedWords = combineWords(trimWords)

    return extractUniqueWords(combinedWords)
  }
}
