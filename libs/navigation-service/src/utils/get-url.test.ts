import { getUrl } from './get-url'

const { location } = window
const mockHref = 'http://dummy.com'

describe('#getUrl', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      href: mockHref
    }
  })

  it('returns current whole url', () => {
    expect(getUrl()).toBe(mockHref)
  })

  afterAll(() => {
    window.location = location
  })
})
