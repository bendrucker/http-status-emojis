'use strict'

const test = require('tape')
const duplicates = require('array-duplicates')
const httpStatusEmojis = require('./')

test('all properties are strings', function (t) {
  t.ok(Object.values(httpStatusEmojis).every(validCodePoint), 'all code points are valid (> 5000)')
  for (let [key, value] of Object.entries(httpStatusEmojis)) {
    if (!validCodePoint(value)) {
      t.fail(`expected emoji, found "${value}" at "${key}"`)
    }
  }
  t.end()
})

test('all values are unique', function (t) {
  const d = duplicates(Object.values(httpStatusEmojis))
  const has = d.length

  t.notOk(has, 'should not have duplicates')
  d.forEach(value => t.fail(`duplicate: ${value}`))

  t.end()
})

function validCodePoint (value) {
  // arbitrary, helps catch obvious mistakes
  return value.codePointAt(0) > 5000
}