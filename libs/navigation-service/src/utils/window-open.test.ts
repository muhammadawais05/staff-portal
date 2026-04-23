import { windowOpen } from './window-open'

describe('#windowOpen', () => {
  const { open } = window

  beforeAll(() => {
    // @ts-expect-error
    delete window.open
    window.open = jest.fn()
  })

  afterAll(() => {
    window.open = open
  })

  it('mocks "window.open" method', () => {
    expect(jest.isMockFunction(window.open)).toBe(true)
  })

  it('calls window.open with the passed params', () => {
    windowOpen('https://toptal.com', '_blank', 'features')

    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open).toHaveBeenCalledWith(
      'https://toptal.com',
      '_blank',
      'features'
    )
  })
})
