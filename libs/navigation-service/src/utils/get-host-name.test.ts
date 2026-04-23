import { getHostName } from './get-host-name'

const { location } = window
const hostname = 'dummy.com'

describe('#getHostName', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      hostname
    }
  })

  it('returns current whole url', () => {
    expect(getHostName()).toBe(hostname)
  })

  afterAll(() => {
    window.location = location
  })
})
