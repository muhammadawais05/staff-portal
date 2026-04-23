import { getOrigin } from './get-origin'

const { location } = window
const origin = 'https://developer.mozilla.org'

describe('#getOrigin', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      origin
    }
  })

  it('returns current origin', () => {
    expect(getOrigin()).toBe(origin)
  })

  afterAll(() => {
    window.location = location
  })
})
