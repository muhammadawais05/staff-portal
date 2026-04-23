import openLinkInNewTab from './open-link-in-new-tab'

describe('open-link-in-new-tab', () => {
  const { open } = window

  beforeAll(() => {
    // @ts-expect-error
    delete window.open
    window.open = jest.fn()
  })

  afterAll(() => {
    window.open = open
  })

  describe('when url is null', () => {
    it('returns', () => {
      openLinkInNewTab(null)

      expect(window.open).not.toHaveBeenCalled()
    })
  })

  describe('when url exists', () => {
    it('invokes window object open', () => {
      const url = 'http://toptal.com'

      openLinkInNewTab(url)

      expect(window.open).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledWith(url, '_blank', undefined)
    })
  })
})
