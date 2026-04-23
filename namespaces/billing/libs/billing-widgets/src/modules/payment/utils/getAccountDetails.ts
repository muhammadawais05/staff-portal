import { camelCase } from 'lodash-es'
import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { PaymentOptionFragment } from '../../__fragments__/paymentPaySubject.graphql.types'

const getAccountDetails = (paymentOptions: PaymentOptionFragment[]) =>
  paymentOptions.map(({ accountInfo, paymentMethod, preferred }) => {
    let text = i18n.t(`paymentMethod:${camelCase(paymentMethod)}`)

    if (preferred) {
      text = i18n.t('payment:modals.pay.appendPreferredLabel', { text })
    }

    return {
      accountInfo,
      text,
      value: paymentMethod as PaymentOptionPaymentMethod
    }
  })

export default getAccountDetails
