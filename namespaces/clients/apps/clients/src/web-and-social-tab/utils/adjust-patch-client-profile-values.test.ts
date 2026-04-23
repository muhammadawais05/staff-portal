import { adjustPatchClientProfileValues } from './adjust-patch-client-profile-values'

describe('adjustPatchClientProfileValues', () => {
  it('returns proper values', () => {
    expect(adjustPatchClientProfileValues('acquiredBy', ['123'])).toEqual({
      acquiredBy: ['123']
    })

    expect(adjustPatchClientProfileValues('acquiredBy', ['123'], 123)).toEqual({
      currentEmployeeCount: 123,
      acquiredBy: ['123']
    })

    expect(adjustPatchClientProfileValues('currentEmployeeCount', '')).toEqual({
      resetCurrentEmployeeCount: true
    })

    expect(
      adjustPatchClientProfileValues('currentEmployeeCount', undefined)
    ).toEqual({
      currentEmployeeCount: undefined
    })

    expect(
      adjustPatchClientProfileValues('currentEmployeeCount', null)
    ).toEqual({
      currentEmployeeCount: null
    })

    expect(
      adjustPatchClientProfileValues('currentEmployeeCount', '123')
    ).toEqual({
      currentEmployeeCount: 123
    })

    expect(adjustPatchClientProfileValues('currentEmployeeCount', 123)).toEqual(
      {
        currentEmployeeCount: 123
      }
    )
  })
})
