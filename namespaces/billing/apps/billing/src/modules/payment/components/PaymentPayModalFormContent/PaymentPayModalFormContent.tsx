import React from 'react'
import { Amount, Container, Notification, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Link } from '@topkit/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { omit } from 'lodash-es'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { PAYMENT_ELIGIBILITY_CONTACT } from '@staff-portal/billing/src/_lib/helpers'
import { getAccountDetails } from '@staff-portal/billing-widgets/src/modules/payment/utils'

import AccountDetails from '../AccountDetails'
import BillingNotes from '../../../commercialDocument/components/BillingNotes'
import { GetPayModalPaymentQuery } from '../../modals/Pay/data/getPayModalPayment.graphql.types'

type Payment = Exclude<GetPayModalPaymentQuery['node'], null | undefined>

interface Props {
  amount: Payment['balanceDue']
  subject: Payment['subject']
  paymentMethodRequired?: boolean
  isEligibleToBePaidOut: Payment['eligibleForPay']
}

const displayName = 'PaymentPayModalFormContent'

const PaymentPayModalFormContent = ({
  amount,
  subject,
  paymentMethodRequired,
  isEligibleToBePaidOut = true
}: Props) => {
  const { t: translate } = useTranslation('payment')
  const { modalContainer } = useExternalIntegratorContext()
  const { paymentOptions, billingNotes } = subject
  const nodes = paymentOptions?.nodes || []
  const usesPlaceholderPaymentMethods = nodes.some(option => option.placeholder)
  const accountDetails = getAccountDetails(nodes)
  const paymentMethodOptions = accountDetails.map(option =>
    omit(option, ['accountInfo'])
  )

  return (
    <>
      {!isEligibleToBePaidOut && (
        <Container bottom={2} data-testid={`${displayName}-eligibilityNotice`}>
          <Notification>
            <Trans
              components={[
                <Link
                  data-testid='payment-pay-eligibility'
                  href={`mailto:${PAYMENT_ELIGIBILITY_CONTACT.email}`}
                  key={PAYMENT_ELIGIBILITY_CONTACT.email}
                />
              ]}
              i18nKey='modals.pay.notEligibleToBePaidOut'
              t={translate}
              values={{
                contactEmail: PAYMENT_ELIGIBILITY_CONTACT.email,
                contactName: PAYMENT_ELIGIBILITY_CONTACT.name
              }}
            />
          </Notification>
        </Container>
      )}
      <Container bottom={1.5}>
        <Typography size='medium'>
          {translate('form.pay.profileLink')}
        </Typography>
        <LinkWrapper
          href={subject?.webResource?.url}
          target='_blank'
          data-testid='profileLink'
        >
          {subject?.webResource?.text}
        </LinkWrapper>
      </Container>
      <Form.Select
        hint={
          usesPlaceholderPaymentMethods &&
          translate('form.pay.fields.paymentMethod.placeholdersHint')
        }
        options={paymentMethodOptions}
        popperContainer={modalContainer}
        label={translate('form.pay.fields.paymentMethod.label')}
        name='paymentMethod'
        data-testid={`${displayName}-paymentMethod`}
        placeholder={translate('form.pay.fields.paymentMethod.placeholder')}
        required={paymentMethodRequired}
        native
      />
      <Container top={1.5} bottom={1.5}>
        <Typography size='medium'>
          {translate('form.pay.fields.amount.label')}
        </Typography>
        <Amount amount={amount} />
      </Container>
      <Form.Input
        data-testid={`${displayName}-comment`}
        label={translate('form.pay.fields.comment.label')}
        multiline
        name='comment'
        placeholder={translate('form.pay.fields.comment.placeholder')}
        required
        rowsMin={4}
        rowsMax={20}
        width='full'
      />
      <AccountDetails accountDetails={accountDetails} />
      <BillingNotes billingNotes={billingNotes} />
    </>
  )
}

export default PaymentPayModalFormContent
