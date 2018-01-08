import { getAvailableWords } from '../partialWord'

it('should get the available words', () => {
  const words = getAvailableWords([
    { word: 'a', start: 0, end: 0 },
    { word: 'a', start: 2, end: 2 },
    { word: 'c', start: 2, end: 2 },
    { word: 'b', start: 3, end: 3 },
    { word: 'x', start: 3, end: 3 },
    { word: 'd', start: 3, end: 3 },
    { word: 'd', start: 4, end: 4 },
  ])(['a', 'b'])

  expect(
    words.sort((a, b) => (a.word + a.start < b.word + b.start ? -1 : 1))
  ).toEqual([
    { word: 'a', start: 0, end: 0 },
    { word: 'a', start: 2, end: 2 },
    { word: 'c', start: 2, end: 2 },
    { word: 'd', start: 4, end: 4 },
  ])
})
