import 'unfetch/polyfill'
import { getDictionary } from './dictionary'
import { findSubSentences } from './findSubSentences'
import image_src from './asset/whataboutthedroidattackonthewookiees.png'
import { updateMask } from './mask'

document.getElementById('image').src = image_src

const text = document.getElementById('text')
const indication = document.getElementById('indication')
const app = document.getElementById('app')

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const run = async () => {
  indication.innerText = 'loading dictionary ...'

  const words = (await getDictionary()).filter(x => x.length > 4)

  indication.innerText = 'searching for combinaisons ...'

  await wait(10)

  const sentences = findSubSentences(words)(
    'what about the droid attack on the wookiees'
  )

  indication.innerText = ''

  updateMask(sentences[0])
  text.innerText = sentences[0]

  app.style.height = sentences.length * 2 + 'px'

  window.addEventListener('scroll', e => {
    const y = window.scrollY

    const k = Math.floor(y / 2)

    updateMask(sentences[k])

    text.innerText = sentences[k]
  })
}

run()
