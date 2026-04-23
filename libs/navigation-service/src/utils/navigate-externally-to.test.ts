import { navigateExternallyTo } from './navigate-externally-to'

const { location } = window
const assignMock = jest.fn()
const replaceMock = jest.fn()

describe('#navigateExternallyTo', () => {
  beforeAll(() => {
    delete (window as Partial<Window>).location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = {
      assign: assignMock,
      replace: replaceMock
    }
  })

  it('navigates with page reload', () => {
    navigateExternallyTo('some-path')

    expect(assignMock).toHaveBeenCalledWith('some-path')
    expect(assignMock).toHaveBeenCalledTimes(1)
    expect(replaceMock).not.toHaveBeenCalled()
  })

  it('navigates and replaces history info', () => {
    navigateExternallyTo('some-path', true)

    expect(replaceMock).toHaveBeenCalledWith('some-path')
    expect(replaceMock).toHaveBeenCalledTimes(1)
    expect(assignMock).not.toHaveBeenCalled()
  })

  afterAll(() => {
    window.location = location
  })
})
