import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'

import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import { enterpriseAccountStatusField } from './enterprise-account-status-field'

type Props = [Partial<CompanyOverviewFragment>, boolean | Function][]

const { ACTIVE, DISABLED } = ClientEnterpriseAccountStatusEnum

describe('enterpriseAccountStatusField', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ parent: null, enterpriseAccountStatus: null }, false],
      [{ parent: true, enterpriseAccountStatus: null }, false],
      [{ parent: null, enterpriseAccountStatus: { status: DISABLED } }, false],
      [{ parent: true, enterpriseAccountStatus: { status: ACTIVE } }, false],
      [
        { parent: null, enterpriseAccountStatus: { status: ACTIVE } },
        expect.any(Function)
      ]
    ] as Props)('%s', (input, expected) => {
      const result = enterpriseAccountStatusField(
        input as CompanyOverviewFragment
      )

      expect(result).toStrictEqual(expected)
    })
  })
})
