import { Amount, Table, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import { TotalsFragment } from '../../../__fragments__/totalsFragment.graphql.types'

const displayName = 'TableFooterRow'

interface Props {
  type: 'paid' | 'debit' | 'credit'
  data: TotalsFragment
}

export const TableFooterRow: FC<Props> = memo(({ type, data }) => {
  const name = `${displayName}-${type}`
  const commission = `${type}Commissions`
  const talent = `${type}Talent`
  const company = `${type}Company`
  const companyAmount = Number(data[company as keyof TotalsFragment])
  const talentAmount = Number(data[talent as keyof TotalsFragment])
  const commissionAmount = Number(data[commission as keyof TotalsFragment])

  const { t: translate } = useTranslation('extraExpenses')

  return (
    <Table.Row data-testid={name}>
      <Table.Cell>
        <Typography as='span' weight='semibold'>
          {translate(`Table.footer.${type}` as const)}
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <Amount
          amount={companyAmount}
          weight='semibold'
          data-testid={company}
        />
      </Table.Cell>
      <Table.Cell>
        <Amount amount={talentAmount} weight='semibold' data-testid={talent} />
      </Table.Cell>
      <Table.Cell>
        <Amount
          amount={commissionAmount}
          weight='semibold'
          data-testid={commission}
        />
      </Table.Cell>
    </Table.Row>
  )
})

TableFooterRow.displayName = displayName

export default TableFooterRow
