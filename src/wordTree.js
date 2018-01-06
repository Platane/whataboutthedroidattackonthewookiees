export type Char = string

export type WordTree = {
  [Char]: WordTree,
  isWord?: true,
}

export const addWord = (subTree: WordTree, word: Char[]) => {
  const c = word.shift()

  if (!c) subTree.isWord = true
  else addWord((subTree[c] = subTree[c] || {}), word)
}

export const create = (words: string[]): WordTree => {
  const tree = {}

  words.forEach(w => addWord(tree, w.toLowerCase().split('')))

  return tree
}
