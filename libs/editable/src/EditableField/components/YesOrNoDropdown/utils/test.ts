import { getYesOrNoDisplay } from '.'
import { YesNoDropdownValue } from '../../../config'

describe('#getYesOrNoDisplay', () => {
  it.each([
    { value: 1, expected: YesNoDropdownValue.YES },
    { value: 0, expected: YesNoDropdownValue.NO },
    { value: undefined, expected: YesNoDropdownValue.NO }
  ])('returns $expected', ({ value, expected }) => {
    const result = getYesOrNoDisplay(value)

    expect(result).toEqual(expected)
  })
})
