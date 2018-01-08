import { getWordsInRange } from '../partialWord'

it('should return the words include in the specified range', () => {
  const words = getWordsInRange(
    [
      { word: 'abc', start: 4, end: 6 },
      { word: 'def', start: 11, end: 17 },
      { word: 'ghi', start: 5, end: 6 },
      { word: 'jkl', start: 7, end: 13 },
      { word: 'mno', start: 6, end: 13 },
    ],
    5,
    14
  )

  expect(words.map(x => x.word).sort()).toEqual(['ghi', 'jkl', 'mno'])
})

it('should return the words include in the specified range 2', () => {
  const words = getWordsInRange(
    [
      { word: 'abc', start: 0, end: 6 },
      { word: 'def', start: 11, end: 17 },
      { word: 'ghi', start: 0, end: 6 },
      { word: 'jkl', start: 0, end: 13 },
      { word: 'mno', start: 1, end: 13 },
    ],
    0,
    14
  )

  expect(words.map(x => x.word).sort()).toEqual(['abc', 'ghi', 'jkl', 'mno'])
})
