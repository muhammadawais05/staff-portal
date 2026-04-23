import React, { FC, memo } from 'react'
import { camelCase } from 'lodash-es'
import { Container, QuestionMark16, Tooltip, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'
import { MemorandumItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'

import { mapBalanceToColor } from '../../../commercialDocument/components/Memorandums/TableRow/TableRow'

// @see https://github.com/toptal/platform/blob/master/app/decorators/accrual_accounting/memorandum_decorator.rb#L62-L72

interface Props {
  memorandum: MemorandumItemFragment
}

const displayName = 'MemorandumStatus'

const MemorandumStatus: FC<Props> = memo(({ memorandum }) => {
  const { t: translate } = useTranslation('memorandumList')

  const { depositCorrection, balance } = memorandum

  const statusContent = (
    <Typography
      color={mapBalanceToColor(balance)}
      weight='semibold'
      data-testid={`${displayName}-content`}
    >
      {translate(
        `table.item.balance.status.${
          camelCase(balance) as EnumKeysToCamelCase<typeof MemorandumBalance>
        }` as const
      )}
    </Typography>
  )

  if (!depositCorrection) {
    return statusContent
  }

  return (
    <Tooltip content={translate('table.item.balance.adjustment')} interactive>
      <Container
        flex
        alignItems='center'
        inline
        data-testid={`${displayName}-tooltip`}
      >
        {statusContent}
        <Container as='span' left='xsmall' flex alignItems='center'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Container>
    </Tooltip>
  )
})

MemorandumStatus.displayName = displayName

export default MemorandumStatus
