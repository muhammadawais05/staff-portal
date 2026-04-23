import { getLocationSearch } from './get-location-search'

const { location } = window
const search = '?a=123'

describe('#getLocationSearch', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      search
    }
  })

  it('returns current origin', () => {
    expect(getLocationSearch()).toBe(search)
  })

  afterAll(() => {
    window.location = location
  })
})
