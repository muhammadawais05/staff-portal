import { localStorageService } from '@staff-portal/local-storage-service'

import { checkForFeatureFlag } from './checkForFeatureFlag'

const testFeatureKey = 'someFeature'

const setUrlParams = (params: string) => {
  // Has to be overridden because of JSDOM https://github.com/facebook/jest/issues/5124
  // @ts-expect-error We are not supposed to to that, but it's unit testing!
  delete window.location
  // @ts-expect-error Not all the properties are required for us to test
  window.location = Object.assign(new URL('https://toptal.com'), {
    search: params
  })
}

describe('#checkForFeatureFlag', () => {
  describe('when no url params are passed', () => {
    it('checks for token in storage and returns false', () => {
      expect(checkForFeatureFlag(testFeatureKey)).toBe(false)
    })

    describe('when the key is saved in storage', () => {
      beforeAll(() => {
        localStorageService.setItem(testFeatureKey, 'true')
      })

      it('checks for token in storage and returns true', () => {
        expect(checkForFeatureFlag(testFeatureKey)).toBe(true)
      })
    })
  })

  describe('when url param is set to true', () => {
    beforeAll(() => {
      setUrlParams(`?${testFeatureKey}=true`)
    })

    it('returns true', () => {
      expect(checkForFeatureFlag(testFeatureKey)).toBe(true)
    })

    it('sets token to true', () => {
      expect(localStorageService.getItem(testFeatureKey)).toBe('true')
    })
  })

  describe('when url param is set to false', () => {
    beforeAll(() => {
      setUrlParams(`?${testFeatureKey}=false`)
    })

    it('returns false', () => {
      expect(checkForFeatureFlag(testFeatureKey)).toBe(false)
    })

    it('unsets token', () => {
      expect(localStorageService.getItem(testFeatureKey)).toBeNull()
    })
  })
})
