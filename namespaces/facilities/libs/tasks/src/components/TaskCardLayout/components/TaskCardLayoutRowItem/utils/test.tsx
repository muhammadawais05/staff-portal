import React from 'react'

import { hasContent } from './index'

describe('hasContent', () => {
  it('returns true for a number', () => {
    expect(hasContent(-1)).toBeTruthy()
    expect(hasContent(0)).toBeTruthy()
    expect(hasContent(1)).toBeTruthy()
  })

  it('returns true for a not empty string', () => {
    expect(hasContent('a')).toBeTruthy()
    expect(hasContent('hello world')).toBeTruthy()
  })

  it('returns false for an empty string', () => {
    expect(hasContent('     ')).toBeFalsy()
    expect(hasContent('')).toBeFalsy()
  })

  it('returns a boolean as is', () => {
    expect(hasContent(true)).toBeTruthy()
    expect(hasContent(false)).toBeFalsy()
  })

  it('returns true for a react component', () => {
    expect(hasContent(<div>Hello</div>)).toBeTruthy()
  })
})
