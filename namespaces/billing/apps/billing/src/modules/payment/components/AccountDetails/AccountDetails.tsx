import React, { memo } from 'react'
import { Section, Container } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import {
  getAccountDetails,
  getPaymentMethodsDetails
} from '@staff-portal/billing-widgets/src/modules/payment/utils'

interface Props {
  accountDetails?: ReturnType<typeof getAccountDetails>
}

const displayName = 'AccountDetails'

const AccountDetails = ({ accountDetails = [] }: Props) => {
  if (!accountDetails?.length) {
    return null
  }

  return (
    <Container data-testid={displayName}>
      {accountDetails.map(({ accountInfo, text: title }) => (
        <Section key={title} title={title}>
          {!!accountInfo?.length && (
            // eslint-disable-next-line @toptal/davinci/no-deprecated-props
            <DetailedList
              striped
              columns={1}
              labelColumnWidth={14}
              items={getPaymentMethodsDetails(accountInfo)}
            />
          )}
        </Section>
      ))}
    </Container>
  )
}

AccountDetails.displayName = displayName

export default memo(AccountDetails)
