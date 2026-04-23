import { useTranslation } from 'react-i18next'
import React, { ReactElement } from 'react'
import { Section, SectionProps } from '@toptal/picasso'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import TableHead from '../TableHead'
import { tableFooter } from './styles'

const ROWS = 10
const COLUMNS = 9

interface Props {
  header?: ReactElement
  actions?: ReactElement
  variant?: SectionProps['variant']
}

const BillingCyclesSkeleton = ({
  header = <TableHead />,
  actions,
  variant = 'default'
}: Props) => {
  const { t: translate } = useTranslation('billingCycleTable')

  return (
    <Section title={translate('title')} actions={actions} variant={variant}>
      <TableSkeleton row={ROWS} column={COLUMNS}>
        {header}
      </TableSkeleton>
      <TableSkeleton css={tableFooter} row={3} column={4} />
    </Section>
  )
}

export default BillingCyclesSkeleton
