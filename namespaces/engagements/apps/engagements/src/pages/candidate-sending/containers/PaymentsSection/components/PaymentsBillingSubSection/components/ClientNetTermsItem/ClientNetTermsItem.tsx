import { useField } from '@toptal/picasso-forms'
import React from 'react'
import { DetailedList as DL } from '@staff-portal/ui'

import { CandidateSendingDetailsStepAttributes } from '../../../../../../types'

const ClientNetTermsItem = () => {
  const {
    input: { value }
  } =
    useField<CandidateSendingDetailsStepAttributes['companyNetTerms']>(
      'companyNetTerms'
    )
  const companyNetTerms = value ?? 0

  return (
    <DL.Row>
      <DL.Item label='Net terms for company invoices'>
        {companyNetTerms === 0 ? 'Upon Receipt' : `Net ${companyNetTerms}`}
      </DL.Item>
    </DL.Row>
  )
}

export default ClientNetTermsItem
