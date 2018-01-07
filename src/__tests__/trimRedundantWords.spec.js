import { trimRedundantWords } from '../findWords'

it('should remove duplicate', () => {
  const trimed = trimRedundantWords([
    { word: 'abc', start: 4, end: 6 },
    { word: 'abc', start: 4, end: 6 },
    { word: 'g', start: 15, end: 15 },
    { word: 'abc', start: 4, end: 6 },
    { word: 'abc', start: 10, end: 12 },
  ])

  expect(trimed.sort((a, b) => (a.start < b.start ? -1 : 1))).toEqual([
    { word: 'abc', start: 4, end: 6 },
    { word: 'abc', start: 10, end: 12 },
    { word: 'g', start: 15, end: 15 },
  ])
})

it('should remove overlaping ranges', () => {
  const trimed = trimRedundantWords([
    { word: 'abc', start: 4, end: 6 },
    { word: 'abc', start: 4, end: 10 },
    { word: 'abc', start: 4, end: 14 },
    { word: 'abc', start: 10, end: 14 },
  ])

  expect(trimed.sort((a, b) => (a.start < b.start ? -1 : 1))).toEqual([
    { word: 'abc', start: 4, end: 6 },
    { word: 'abc', start: 10, end: 14 },
  ])
})
