import React, { FC, memo, useMemo } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { useTranslation } from 'react-i18next'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { BillingOptionFragment_CreditCardBillingOption_ } from '../../../__fragments__/billingOptionFragment.graphql.types'
import getPaymentMethodsDetails from '../../../payment/utils/getPaymentMethodsDetails'
import VerificationStatus from '../VerificationStatus'
import { ClientBillingDetailsBillingOptionsFragment } from '../../data/getClientBillingDetails.graphql.types'
interface Props {
  billingOption: ClientBillingDetailsBillingOptionsFragment
  canManageBillingOptions: boolean
}

const displayName = 'BillingOptionDetails'

const BillingOptionDetails: FC<Props> = memo<Props>(
  ({ billingOption, canManageBillingOptions }) => {
    const { accountInfo, status, billingMethod, comment } = billingOption
    const { t: translate } = useTranslation('billingDetails')

    const items = useMemo(
      () => [
        ...((canManageBillingOptions &&
          getPaymentMethodsDetails(accountInfo)) ||
          []),
        {
          label: translate('billingOption.fields.verification'),
          value: status ? (
            <VerificationStatus
              status={status}
              billingMethod={billingMethod}
              comment={comment}
              verificationStatuses={
                (
                  billingOption as BillingOptionFragment_CreditCardBillingOption_
                )?.verificationStatuses
              }
            />
          ) : (
            EMPTY_DATA
          )
        }
      ],
      [
        accountInfo,
        billingMethod,
        status,
        comment,
        billingOption,
        translate,
        canManageBillingOptions
      ]
    )

    return (
      // eslint-disable-next-line @toptal/davinci/no-deprecated-props
      <DetailedList striped columns={1} labelColumnWidth={12} items={items} />
    )
  }
)

BillingOptionDetails.displayName = displayName

export default BillingOptionDetails
