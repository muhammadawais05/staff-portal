import { getLocationHash } from './get-location-hash'

const { location } = window
const hash = '#hash'

describe('#getLocationHash', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      hash
    }
  })

  it('returns current hash', () => {
    expect(getLocationHash()).toBe(hash)
  })

  afterAll(() => {
    window.location = location
  })
})
