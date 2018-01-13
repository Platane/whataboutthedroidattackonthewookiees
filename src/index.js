import 'unfetch/polyfill'
import { getDictionary } from './dictionary'
import { findWordInText } from './word/findWords'
import {
  create as createCombinaisonTree,
  getCombinaisonAt,
} from './word/combinaisonTree'
import { getAvailableWords, getWordCombinaisons } from './word/partialWord'
import { prepareMask } from './mask'
import { h, render } from 'preact'
import { SearchBar } from './component/SearchBar'

import image_src from './asset/whataboutthedroidattackonthewookiees.jpg'
import './asset/withText.jpg'

document.getElementById('image').src = image_src

const text = document.getElementById('text')
const indication = document.getElementById('indication')
const app = document.getElementById('app')

const _updateMask = prepareMask(document.getElementById('mask'))

const updateMask = sentence => _updateMask((text.innerText = sentence))

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const run = async () => {
  indication.innerText = 'loading dictionary ...'

  const dictionary = await getDictionary()

  indication.innerText = 'searching words ...'

  await wait(10)

  const words = findWordInText(dictionary)(
    'what about the droid attack on the wookiees'
  ).sort((a, b) => (a.start < b.start ? -1 : 1))

  indication.innerText = ''

  {
    let value = []
    let combinaisonTree = null
    let availableWords = []

    const getAvailableWords_ = getAvailableWords(words)
    const getWordCombinaisons_ = getWordCombinaisons(words)
    const seed = Math.random()

    const updateScroll = window.addEventListener('scroll', () => {
      const k = window.scrollY - 1

      availableWords

      const combinaison =
        k >= 0 && combinaisonTree ? getCombinaisonAt(combinaisonTree, k) : ''

      const words = [...value, ...combinaison.split(' ').filter(Boolean)]

      updateMask(
        getWordCombinaisons_(words)[0]
          .map(x => x.word)
          .join(' ')
      )
    })

    const onChange = v => {
      if (v) value = v
      availableWords = getAvailableWords_(value)
      combinaisonTree = createCombinaisonTree(availableWords)
      updateDom()
      updateMask(value.join(' '))
      app.style.height = `${combinaisonTree.sum + window.innerHeight}px`
      // window.scrollY = 0
    }

    const container = document.getElementById('searchbar')

    const updateDom = () =>
      render(
        <SearchBar
          words={words}
          value={value}
          availableWords={availableWords}
          combinaisonTree={combinaisonTree}
          onChange={onChange}
        />,
        container,
        container.children[0]
      )

    onChange()
  }
}

run()
