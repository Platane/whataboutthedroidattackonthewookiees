// from http://www.imsdb.com/scripts/Star-Wars-Revenge-of-the-Sith.html
import script_src from './asset/script.txt'

export const getEnglishFullDictionary = (): Promise<String[]> =>
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

const blacklist = []
const toDictionary = (text: string) => {
  const words = text
    .toLowerCase()
    .replace(/'\w+/g, ' ')
    .replace(/[^a-z\n ]/g, ' ')
    .split(/[ \n]+/)

  const o = {}
  words.forEach(w => (o[w] = true))

  return [
    'i',
    'a',
    ...Object.keys(o).filter(x => x.length > 1 && !blacklist.includes(x)),
  ]
}

export const getScriptDictionary = (): Promise<String[]> =>
  fetch(script_src)
    .then(res => res.text())
    .then(toDictionary)

export const getBadWords = (): Promise<String[]> =>
  fetch(
    'https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en'
  )
    .then(res => res.text())
    .then(text =>
      text
        .split(/[\n ]+/)
        .map(x => x.toLowerCase())
        .filter(x => !x.match(/a-z/))
        .filter(Boolean)
    )

export const getDictionary = (): Promise<String[]> =>
  Promise.all([getScriptDictionary(), getBadWords()]).then(res =>
    [].concat(...res)
  )
