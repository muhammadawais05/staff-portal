import { locationReload } from '.'

describe('#Location', () => {
  it('is reloading', () => {
    // location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    })
    locationReload()

    expect(window.location.reload).toHaveBeenCalled()
  })
})
