import { create } from '../wordTree'
import { findWords } from '../findSubSentences'

it('should find words into text', () => {
  const wt = create(['abc', 'def', 'g'])

  const words = findWords(wt, 'xx abcxx xdxxegxf')
  expect(words.sort((a, b) => (a.word < b.word ? -1 : 1))).toEqual([
    { word: 'abc', start: 4, end: 6 },
    { word: 'def', start: 11, end: 17 },
    { word: 'g', start: 15, end: 15 },
  ])
})
