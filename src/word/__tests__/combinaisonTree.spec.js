import { getAllcombinedWords } from '../combineWords'
import { create, getCombinaisonAt } from '../combinaisonTree'
;[
  [{ word: 'a', start: 0, end: 0 }],
  [{ word: 'a', start: 1, end: 1 }],
  [{ word: 'a', start: 1, end: 1 }, { word: 'a', start: 2, end: 2 }],
  [
    { word: 'a', start: 0, end: 0 },
    { word: 'lll', start: 0, end: 2 },
    { word: 'nnnn', start: 0, end: 3 },
    { word: 'b', start: 1, end: 1 },
    { word: 'ggg', start: 1, end: 3 },
    { word: 'cc', start: 2, end: 3 },
    { word: 'uu', start: 3, end: 4 },
    { word: 'xx', start: 3, end: 4 },
    { word: 'k', start: 3, end: 3 },
  ],
].forEach((words, i) =>
  it('should found all the combinaison ' + i, () => {
    const ct = create(words)

    const combinaisons = Array.from({ length: ct.sum })
      .map((_, i) => getCombinaisonAt(ct, i).trim())
      .sort()

    const trustedCombinaisons = getAllcombinedWords(words)
      .map(w => w.word)
      .sort()

    expect(combinaisons).toEqual(trustedCombinaisons)
  })
)
