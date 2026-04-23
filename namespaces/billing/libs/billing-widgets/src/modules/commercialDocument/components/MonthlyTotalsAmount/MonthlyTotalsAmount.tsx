import React from 'react'
import { camelCase, snakeCase } from 'lodash-es'
import { Container, Tooltip } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

import AmountWithStatusColor from '../AmountWithStatusColor'

interface Props {
  name: string
  total: number
  last?: boolean
}

const MonthlyTotalsAmount = ({ name: status, total, last }: Props) => {
  const { t: translate } = useTranslation(['common'])
  const tooltip = translate(
    `common:documents.statuses.${
      camelCase(status) as EnumKeysToCamelCase<typeof DocumentStatus>
    }` as const
  )
  const amountStatus = snakeCase(status).toUpperCase() as DocumentStatus
  const testId = `MonthlyTotalsAmount-${status}`

  return (
    <Container key={status} right={last ? undefined : 'small'} as='span'>
      <Tooltip content={tooltip} placement='top' interactive>
        <Container as='span'>
          <AmountWithStatusColor
            amount={total}
            data-testid={testId}
            status={amountStatus}
            weight='semibold'
          />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default MonthlyTotalsAmount
