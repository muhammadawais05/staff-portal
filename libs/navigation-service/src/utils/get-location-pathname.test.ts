import { getLocationPathname } from './get-location-pathname'

const { location } = window
const pathname = '/pathname'

describe('#getLocationPathname', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      pathname
    }
  })

  it('returns current pathname', () => {
    expect(getLocationPathname()).toBe(pathname)
  })

  afterAll(() => {
    window.location = location
  })
})
