import { reloadPage } from './reload-page'

const { location } = window
const reloadMock = jest.fn()

describe('#reloadPage', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      reload: reloadMock
    }
  })

  it('reload current url', () => {
    reloadPage()

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    window.location = location
  })
})
