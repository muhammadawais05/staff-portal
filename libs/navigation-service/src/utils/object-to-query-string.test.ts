import { DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS } from '../constants'
import { objectToQueryString } from './object-to-query-string'

// For easier understanding of test cases, pass `encode: false` to the `objectToQueryString`

describe('#objectToQueryString', () => {
  describe('stringifies string properly', () => {
    it('converts one param', () => {
      expect(objectToQueryString({ foo: 'bar' })).toBe('foo=bar')
    })

    it('converts multiple params', () => {
      expect(objectToQueryString({ foo: 'bar', zoo: 'test' })).toBe(
        'foo=bar&zoo=test'
      )
    })

    it('converts multiple params with the same name', () => {
      const duplicateKey = 'foo'

      expect(
        objectToQueryString({
          [duplicateKey]: 'bar',
          [duplicateKey]: 'barClone',
          zoo: 'test'
        })
      ).toBe('foo=barClone&zoo=test')
    })
  })

  describe('stringifies numbers properly', () => {
    it('converts positive number', () => {
      expect(objectToQueryString({ foo: 1 })).toBe('foo=1')
    })

    it('converts decimal number', () => {
      expect(objectToQueryString({ foo: 1.6 })).toBe('foo=1.6')
    })

    it('converts negative number', () => {
      expect(objectToQueryString({ foo: -1 })).toBe('foo=-1')
    })

    it('converts 0', () => {
      expect(objectToQueryString({ foo: 0 })).toBe('foo=0')
    })
  })

  describe('stringifies arrays properly', () => {
    it('converts empty array', () => {
      expect(objectToQueryString({ foo: [] })).toBe('')
    })

    it('converts array with numbers', () => {
      expect(objectToQueryString({ foo: [-1, 0, 1] })).toBe(
        'foo%5B%5D=-1&foo%5B%5D=0&foo%5B%5D=1'
      )
    })

    it('converts array with strings', () => {
      expect(objectToQueryString({ foo: ['a', 'b'] })).toBe(
        'foo%5B%5D=a&foo%5B%5D=b'
      )
    })
  })

  describe('stringifies objects properly', () => {
    it('converts one nesting level', () => {
      expect(objectToQueryString({ a: { b: 1 } })).toBe('a%5Bb%5D=1')
    })

    it('converts two nesting level', () => {
      expect(objectToQueryString({ a: { b: { c: 1 } } })).toBe(
        'a%5Bb%5D%5Bc%5D=1'
      )
    })

    it('converts complex object', () => {
      expect(
        objectToQueryString({
          a: {
            b: 1,
            c: '2',
            d: [3, 4],
            e: {
              f: '5'
            }
          }
        })
      ).toBe(
        'a%5Bb%5D=1&a%5Bc%5D=2&a%5Bd%5D%5B%5D=3&a%5Bd%5D%5B%5D=4&a%5Be%5D%5Bf%5D=5'
      )
    })
  })

  describe('stringifies falsy values properly', () => {
    it('converts undefined', () => {
      expect(objectToQueryString({ foo: undefined })).toBe('')
    })

    it('converts false', () => {
      expect(objectToQueryString({ foo: false })).toBe('foo=false')
    })

    it('converts null', () => {
      expect(objectToQueryString({ foo: null })).toBe('')
    })

    it('converts empty string', () => {
      expect(objectToQueryString({ foo: '' })).toBe('')
    })

    it('converts array with empty values', () => {
      expect(objectToQueryString({ foo: ['', null, undefined, false] })).toBe(
        'foo%5B%5D=false'
      )
    })
  })

  describe('stringifies special characters properly', () => {
    it('converts space properly', () => {
      expect(objectToQueryString({ foo: ' ' })).toBe('foo=+')
    })

    it('converts parentheses properly', () => {
      expect(objectToQueryString({ foo: '()' })).toBe('foo=()')
    })

    it('converts special characters properly', () => {
      expect(objectToQueryString({ foo: `/%#^?:@-._~!$&'*+,;=[]` })).toBe(
        'foo=%2F%25%23%5E%3F%3A%40-._~%21%24%26%27%2A%2B%2C%3B%3D%5B%5D'
      )
    })
  })

  describe('adds query prefix', () => {
    it('when `addQueryPrefix` is `true` and param has a value', () => {
      expect(
        objectToQueryString(
          { foo: 'test' },
          {
            ...DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS,
            addQueryPrefix: true
          }
        )
      ).toBe('?foo=test')
    })
  })

  describe('does not add query prefix', () => {
    it('when `addQueryPrefix` is `false`', () => {
      expect(objectToQueryString({ foo: 'test' })).toBe('foo=test')
    })

    it('when `addQueryPrefix` is `true` and param value is empty', () => {
      expect(
        objectToQueryString(
          { foo: '' },
          {
            ...DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS,
            addQueryPrefix: true
          }
        )
      ).toBe('')
    })

    it('when `addQueryPrefix` is `false` and param value is empty', () => {
      expect(objectToQueryString({ foo: '' })).toBe('')
    })
  })
})
