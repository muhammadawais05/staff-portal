import getNumberOfItemsARow from './getNumberOfItemsARow'

describe('#getNumberOfItemsARow', () => {
  it('returns correct number of rows for large and small screens', () => {
    expect(getNumberOfItemsARow({ has9Items: true })).toEqual({
      smallScreen: 3,
      largeScreen: 5
    })

    expect(getNumberOfItemsARow({ has9Items: false })).toEqual({
      smallScreen: 4,
      largeScreen: 4
    })
  })
})
