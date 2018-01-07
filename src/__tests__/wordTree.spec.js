import { create } from '../wordTree'

it('should create the word tree', () => {
  expect(create(['abc', 'ab', 'g', 'abb'])).toEqual({
    a: { b: { c: { isWord: true }, b: { isWord: true }, isWord: true } },
    g: { isWord: true },
  })
})
