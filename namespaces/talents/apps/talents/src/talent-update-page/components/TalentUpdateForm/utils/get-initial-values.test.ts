import { TalentUpdateFragment } from '../../../pages/TalentUpdatePage/data'
import { getInitialValues } from './get-initial-values'

describe('#getInitialValues', () => {
  it('takes the fullName from the talent', () => {
    const fullName = 'fullName'

    expect(
      getInitialValues({ fullName } as TalentUpdateFragment).fullName
    ).toBe(fullName)
  })
})
