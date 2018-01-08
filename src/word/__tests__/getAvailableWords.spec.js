import { getAvailableWords } from '../partialWord'

it('should get the available words', () => {
  // 0123456789
  // a ab

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

it('should get the available words 2', () => {
  // 0123456789
  // aaa bbb
  //   yxz

  const words = getAvailableWords([
    { word: 'aaa', start: 0, end: 2 },
    { word: 'y', start: 2, end: 2 },
    { word: 'x', start: 3, end: 3 },
    { word: 'cc', start: 3, end: 5 },
    { word: 'uu', start: 2, end: 4 },
    { word: 'z', start: 4, end: 4 },
    { word: 'bbb', start: 4, end: 6 },
  ])(['aaa', 'bbb'])

  expect(
    words.sort((a, b) => (a.word + a.start < b.word + b.start ? -1 : 1))
  ).toEqual([{ word: 'x', start: 3, end: 3 }])
})
