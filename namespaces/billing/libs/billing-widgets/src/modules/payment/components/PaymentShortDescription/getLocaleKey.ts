import { camelCase } from 'lodash-es'
import { PaymentKind } from '@staff-portal/graphql/staff'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'

export type GetLocalKeyReturnedType =
  | 'talentPayment.extraExpenses'
  | 'talentPayment.default'
  | 'sourcingCommission.talent.new'
  | 'sourcingCommission.talent.default'
  | 'sourcingCommission.partner'
  | 'sourcingCommission.company'
  | EnumKeysToCamelCase<typeof PaymentKind>

export const getLocaleKey = (
  payment: PaymentListItemFragment
): GetLocalKeyReturnedType => {
  const { extraExpenses, createdOn, paymentKind, reason } = payment
  const type = reason?.__typename

  switch (paymentKind) {
    case PaymentKind.TALENT_PAYMENT: {
      return extraExpenses
        ? 'talentPayment.extraExpenses'
        : 'talentPayment.default'
    }

    case PaymentKind.SOURCING_COMMISSION: {
      switch (type) {
        case 'Talent':
          return parse(createdOn).toSeconds() >= parse('2020-02-12').toSeconds()
            ? 'sourcingCommission.talent.new'
            : 'sourcingCommission.talent.default'

        case 'TalentPartner':
          return 'sourcingCommission.partner'

        case 'Client':
        default:
          return 'sourcingCommission.company'
      }
    }
    default:
      return camelCase(paymentKind) as EnumKeysToCamelCase<typeof PaymentKind>
  }
}
