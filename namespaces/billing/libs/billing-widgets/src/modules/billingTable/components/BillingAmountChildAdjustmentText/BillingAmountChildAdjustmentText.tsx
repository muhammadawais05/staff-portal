import { Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { ComponentProps } from 'react'

import { hasAdjustmentText } from '../../utils'
import BillingAmountAdjustments from '../BillingAmountAdjustments'

const displayName = 'BillingAmountChildAdjustmentText'

interface Props {
  document: ComponentProps<typeof BillingAmountAdjustments>['document']
  hasChildAdjustments?: boolean
}

export const BillingAmountChildAdjustmentText = ({
  document,
  hasChildAdjustments
}: Props) => {
  const { t: translate } = useTranslation('common')
  const hasAdjustments = hasAdjustmentText(document)

  if (!hasAdjustments && !hasChildAdjustments) {
    return null
  }

  return (
    <>
      {hasAdjustments && <BillingAmountAdjustments document={document} />}
      {hasChildAdjustments && (
        <Typography invert key='c3'>
          <br />
          {translate('documents.hasChildAdjustments')}
        </Typography>
      )}
    </>
  )
}

BillingAmountChildAdjustmentText.displayName = displayName

export default BillingAmountChildAdjustmentText
