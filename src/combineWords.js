import type { Char, WordTree } from './wordTree'
import { create as createWordTree } from './wordTree'
import { hash } from './hash'

import type { Word } from './findWords'

export const getAllcombinedWords = (words: Word[]): Word[] => {
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

const getStartIndex = (words, start, a = 0) => {
  let b = words.length

  while (b - a > 1) {
    const e = Math.floor((a + b) / 2)

    if (words[e].start < start) a = e
    else if (words[e].start >= start) b = e
  }

  return b
}

export const combineWords = (words: Word[]) => {
  words.sort((a, b) => (a.start < b.start ? -1 : 1))

  getStartIndex(words, 333)

  return (x: number) => {
    x = hash(x)

    let sentence = ''

    let windex = 0

    while (windex < words.length) {
      const l = words.length - windex + (sentence ? 1 : 0)

      const k = windex + Math.floor(hash(x) % l)

      if (!words[k]) windex = words.length
      else {
        sentence = sentence + ' ' + words[k].word
        windex = getStartIndex(words, words[k].end + 1, windex)
      }
    }

    return sentence
  }
}
