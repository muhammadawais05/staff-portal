import { Amount, Typography } from '@toptal/picasso'
import { Trans, useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { MemorandumItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'

interface Props {
  memorandum: MemorandumItemFragment
}

const MemorandumAmount: FC<Props> = memo<Props>(({ memorandum }) => {
  const { t: translate } = useTranslation('memorandum')

  const { allocated, amount, amountDue, portions } = memorandum

  const shouldShowAmountLeft = portions?.length > 0 && !allocated

  return (
    <>
      <Amount amount={amount} data-testid='amount' inline={false} as='p' />
      {shouldShowAmountLeft && (
        <Typography data-testid='amount-left' size='xsmall'>
          <Trans
            components={[<Amount key='amountDue' amount={amountDue} />]}
            i18nKey='associated.table.row.left'
            t={translate}
          />
        </Typography>
      )}
    </>
  )
})

export default MemorandumAmount
