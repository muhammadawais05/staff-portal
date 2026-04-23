import { createUrl } from './create-url'

describe('#createUrl', () => {
  describe('creation fails with an error', () => {
    it('when url is empty string', () => {
      expect(() => createUrl('')).toThrow(
        "Failed to construct an 'URL' with url ="
      )
    })

    it('when url is not a valid url', () => {
      expect(() => createUrl('invalid-url')).toThrow(
        "Failed to construct an 'URL' with url = invalid-url"
      )
    })

    it('when base is not valid', () => {
      expect(() => createUrl('/my-page', 'invalid-base')).toThrow(
        "Failed to construct an 'URL' with url = /my-page  and base = invalid-base"
      )
    })
  })

  describe('creation succeed', () => {
    describe('when base is not provided', () => {
      describe('without sub-page', () => {
        it('with slash at the end', () => {
          expect(createUrl('https://www.google.com/')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/',
            origin: 'https://www.google.com',
            pathname: '/'
          })
        })

        it('without slash', () => {
          expect(createUrl('https://www.google.com')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/',
            origin: 'https://www.google.com',
            pathname: '/'
          })
        })
      })

      describe('with sub-page', () => {
        it('one level nesting', () => {
          expect(createUrl('https://www.google.com/a')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a',
            origin: 'https://www.google.com',
            pathname: '/a'
          })
        })

        it('five level nesting', () => {
          expect(createUrl('https://www.google.com/a/b/c/d/e')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a/b/c/d/e',
            origin: 'https://www.google.com',
            pathname: '/a/b/c/d/e'
          })
        })
      })
    })

    describe('when base is provided', () => {
      describe('with slash for sub-page', () => {
        it('with slash at the end for base', () => {
          expect(createUrl('/a', 'https://www.google.com/')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a',
            origin: 'https://www.google.com',
            pathname: '/a'
          })
        })

        it('without slash at the end for base', () => {
          expect(createUrl('/a', 'https://www.google.com')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a',
            origin: 'https://www.google.com',
            pathname: '/a'
          })
        })
      })

      describe('without slash for sub-page', () => {
        it('with slash at the end for base', () => {
          expect(createUrl('a', 'https://www.google.com/')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a',
            origin: 'https://www.google.com',
            pathname: '/a'
          })
        })

        it('without slash at the end for base', () => {
          expect(createUrl('a', 'https://www.google.com')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a',
            origin: 'https://www.google.com',
            pathname: '/a'
          })
        })
      })

      describe('replacing sub-pages', () => {
        it('with same nesting level', () => {
          expect(createUrl('/c/d', 'https://www.google.com/a/b')).toMatchObject(
            {
              hash: '',
              host: 'www.google.com',
              hostname: 'www.google.com',
              href: 'https://www.google.com/c/d',
              origin: 'https://www.google.com',
              pathname: '/c/d'
            }
          )
        })

        it('when sub-page has less nesting level', () => {
          expect(createUrl('/c', 'https://www.google.com/a/b')).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/c',
            origin: 'https://www.google.com',
            pathname: '/c'
          })
        })

        it('when sub-page has bigger nesting level', () => {
          expect(
            createUrl('/c/d/e', 'https://www.google.com/a/b')
          ).toMatchObject({
            hash: '',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/c/d/e',
            origin: 'https://www.google.com',
            pathname: '/c/d/e'
          })
        })
      })

      describe('applying hash', () => {
        it('when there is no hash in base', () => {
          expect(
            createUrl('#hello', 'https://www.google.com/a/b')
          ).toMatchObject({
            hash: '#hello',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a/b#hello',
            origin: 'https://www.google.com',
            pathname: '/a/b'
          })
        })

        it('when there is a hash in base', () => {
          expect(
            createUrl('#start', 'https://www.google.com/a/b#end')
          ).toMatchObject({
            hash: '#start',
            host: 'www.google.com',
            hostname: 'www.google.com',
            href: 'https://www.google.com/a/b#start',
            origin: 'https://www.google.com',
            pathname: '/a/b'
          })
        })
      })
    })
  })
})
