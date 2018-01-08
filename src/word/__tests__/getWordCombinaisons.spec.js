import { getWordCombinaisons } from '../partialWord'

it('should generate the word combinaison to match the given sentence', () => {
  const combinaisons = getWordCombinaisons([
    { word: 'a', start: 4, end: 4 },
    { word: 'a', start: 5, end: 5 },
    { word: 'a', start: 6, end: 6 },
    { word: 'b', start: 6, end: 6 },
  ])(['a', 'b'])

  expect(combinaisons).toEqual([
    [{ word: 'a', start: 4, end: 4 }, { word: 'b', start: 6, end: 6 }],
    [{ word: 'a', start: 5, end: 5 }, { word: 'b', start: 6, end: 6 }],
  ])
})

it('should generate the word combinaison to match the given sentence 2', () => {
  const combinaisons = getWordCombinaisons([
    { word: 'aaa', start: 4, end: 6 },
    { word: 'b', start: 5, end: 5 },
    { word: 'b', start: 6, end: 6 },
    { word: 'b', start: 7, end: 7 },
  ])(['aaa', 'b'])

  expect(combinaisons).toEqual([
    [{ word: 'aaa', start: 4, end: 6 }, { word: 'b', start: 7, end: 7 }],
  ])
})
