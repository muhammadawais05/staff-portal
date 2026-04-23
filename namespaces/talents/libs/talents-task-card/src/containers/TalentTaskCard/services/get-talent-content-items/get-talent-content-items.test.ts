import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { TaskTalentFragment } from '../../../../data/talent-fragment'
import { getTalentContentItems } from './get-talent-content-items'
import { getTalentContentMapping } from '../get-talent-content-mapping/get-talent-content-mapping'
import { TalentContentField } from '../../../../types'

jest.mock('../get-talent-content-mapping/get-talent-content-mapping', () => ({
  getTalentContentMapping: jest.fn()
}))

describe('getTalentContentItems', () => {
  beforeEach(() => {
    ;(getTalentContentMapping as jest.Mock).mockReturnValue({
      [TalentContentField.INVOICES]: {},
      [TalentContentField.RESUME]: {}
    })
  })

  describe('when cumulativeStatus is `APPLIED`', () => {
    it('returns items in APPLIED_CONFIGURATION', () => {
      const TALENT = {
        cumulativeStatus: TalentCumulativeStatus.APPLIED
      } as unknown as TaskTalentFragment
      const result = getTalentContentItems(TALENT)

      expect(getTalentContentMapping).toHaveBeenCalled()
      expect(result).toEqual([
        expect.objectContaining({ key: TalentContentField.RESUME })
      ])
    })
  })

  describe('when cumulativeStatus is `ACTIVE`', () => {
    it('returns items in APPLIED_CONFIGURATION', () => {
      const TALENT = {
        cumulativeStatus: TalentCumulativeStatus.ACTIVE
      } as unknown as TaskTalentFragment
      const result = getTalentContentItems(TALENT)

      expect(getTalentContentMapping).toHaveBeenCalled()
      expect(result).toEqual([
        expect.objectContaining({ key: TalentContentField.INVOICES })
      ])
    })
  })
})
