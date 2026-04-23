import { convertMemorandumCategoriesToOptions } from './convertMemorandumCategoriesToOptions'

describe('#convertMemorandumCategoriesToOptions', () => {
  it('converts memorandums to dropdown options properly', () => {
    expect(convertMemorandumCategoriesToOptions([])).toBeUndefined()
    expect(
      convertMemorandumCategoriesToOptions([
        {
          name: 'name',
          id: 'id'
        }
      ])
    ).toEqual([
      {
        text: 'name',
        value: 'id'
      }
    ])
  })
})
