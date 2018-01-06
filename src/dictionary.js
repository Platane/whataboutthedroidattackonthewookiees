export const getDictionary = (): Promise<String[]> =>
  fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt'
  )
    .then(res => res.text())
    .then(text =>
      text
        .split('\n')
        .map(x => x.trim())
        .filter(Boolean)
    )
