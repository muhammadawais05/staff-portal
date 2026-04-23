import { Form, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import MultilineComment from '@staff-portal/billing/src/components/MultilineComment'

import { GetPayModalPaymentQuery } from '../../../payment/modals/Pay/data/getPayModalPayment.graphql.types'

interface Props {
  billingNotes?: Exclude<
    GetPayModalPaymentQuery['node'],
    null | undefined
  >['subject']['billingNotes']
}

const displayName = 'CommercialDocumentBillingNotes'

const BillingNotes: FC<Props> = memo<Props>(({ billingNotes }) => {
  const { t: translate } = useTranslation('commercialDocument')

  if (!billingNotes) {
    return null
  }

  return (
    <Form.Field>
      <Form.Label>{translate('billingNotes')}</Form.Label>
      <Typography data-testid={displayName}>
        <MultilineComment>{billingNotes}</MultilineComment>
      </Typography>
    </Form.Field>
  )
})

BillingNotes.displayName = displayName

export default BillingNotes
