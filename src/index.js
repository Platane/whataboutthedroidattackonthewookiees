import 'unfetch/polyfill'
import { getDictionary } from './dictionary'
import { create as createWordTree } from './wordTree'
import { findWordInText } from './findWords'
import { combineWords } from './combineWords'
import image_src from './asset/whataboutthedroidattackonthewookiees.jpg'
import './asset/withText.jpg'
import { prepareMask } from './mask'

document.getElementById('image').src = image_src

const text = document.getElementById('text')
const indication = document.getElementById('indication')
const app = document.getElementById('app')

const updateMask = prepareMask(document.getElementById('mask'))

const update = sentence => updateMask((text.innerText = sentence))

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const run = async () => {
  indication.innerText = 'loading dictionary ...'

  // const dictionary = ['watch']
  const dictionary = await getDictionary()

  indication.innerText = 'searching words ...'

  await wait(10)

  const find = findWordInText(dictionary)

  const words = find('what about the droid attack on the wookiees')

  indication.innerText = ''

  const c = combineWords(words)

  const seed = Math.random()

  update(c(seed))

  app.style.height = '10000px'

  window.addEventListener('scroll', () => update(c(seed + window.scrollY)))
}

run()
