import 'unfetch/polyfill'
import { getDictionary } from './dictionary'
import { findWordInText } from './word/findWords'
import { combineWords } from './word/combineWords'
import { getAvailableWords, getWordCombinaisons } from './word/partialWord'
import image_src from './asset/whataboutthedroidattackonthewookiees.jpg'
import './asset/withText.jpg'
import { prepareMask } from './mask'
import { h, render } from 'preact'
import { SearchBar } from './component/SearchBar'

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
  )

  indication.innerText = ''

  app.style.height = '10000px'

  {
    let value = ''
    let getRandomSentence = combineWords(words)

    const getAvailableWords_ = getAvailableWords(words)
    const getWordCombinaisons_ = getWordCombinaisons(words)
    const seed = Math.random()

    updateMask(getRandomSentence(seed))

    const updateScroll = window.addEventListener('scroll', () => {
      const words = (
        value +
        ' ' +
        (window.scrollY ? getRandomSentence(window.scrollY + seed) : '')
      )
        .split(' ')
        .filter(Boolean)

      updateMask(
        getWordCombinaisons_(words)[0]
          .map(x => x.word)
          .join(' ')
      )
    })

    const onChange = values => {
      value = values.join(' ')
      getRandomSentence = combineWords(getAvailableWords_(values))
      updateDom()
      updateMask(value || getRandomSentence(seed))
    }

    const container = document.getElementById('searchbar')

    const updateDom = () =>
      render(
        <SearchBar
          words={words}
          value={value.split(' ').filter(Boolean)}
          onChange={onChange}
        />,
        container,
        container.children[0]
      )

    updateDom()
  }
}

run()
