const s = 'what about the droid attack on the wookiees'
const flat = s.replace(/ /g, '').split('')

const mask = document.getElementById('mask')
mask.width = 400
mask.height = 25
const ctx = mask.getContext('2d')

const toMask = sentence => {
  const mask = []
  let i = 0

  sentence
    .replace(/ /g, '')
    .split('')
    .forEach(c => {
      const a = flat.indexOf(c, i)

      if (a > i) mask.push([i, a])

      i = a + 1
    })

  if (i < flat.length) mask.push([i, flat.length])

  return mask
}

const maskCharPosition = [
  17,
  37,
  46,
  55,
  64,
  75,
  85,
  95,
  105,
  116,
  123,
  133,
  145,
  155.5,
  164,
  173,
  179,
  190,
  201,
  207.5,
  214,
  223.5,
  230,
  242,
  254,
  268,
  276,
  285,
  298,
  316,
  327,
  337,
  345,
  351,
  359,
  369,
  375,
  390,
]

export const updateMask = sentence => {
  ctx.clearRect(0, 0, 999, 999)
  ctx.fillStyle = 'rgba(0,0,0,0.97)'
  ;[...toMask(sentence), [36, 37]].map(([a, b]) => {
    const y1 = Math.random() * 0.2 * 25
    const y2 = (1 - Math.random() * 0.2) * 25

    ctx.beginPath()
    ctx.rect(
      maskCharPosition[a],
      y1,
      maskCharPosition[b] - maskCharPosition[a],
      y2 - y1
    )
    ctx.fill()
  })
}
