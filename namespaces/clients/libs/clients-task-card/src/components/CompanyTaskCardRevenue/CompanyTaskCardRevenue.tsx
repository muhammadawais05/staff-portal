import React from 'react'
import {
  Container,
  Exclamation16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { getBillingInvoicesPath } from '@staff-portal/routes'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import * as S from './styles'

export interface Props {
  company: Pick<
    TaskCardCompanyFragment,
    'companyLegacyId' | 'invoices' | 'overdueInvoices'
  >
}

const CompanyTaskCardRevenue = ({
  company: { companyLegacyId, invoices, overdueInvoices }
}: Props) => {
  if (!invoices) {
    return null
  }

  return (
    <TaskCardLayout.SummaryItem
      label='Revenue'
      value={
        <Container as='span' flex alignItems='center'>
          <Link
            href={getBillingInvoicesPath({
              'badges[company_ids]': [companyLegacyId]
            })}
            variant='action'
            css={S.linkWrapper}
          >
            <TypographyOverflow
              as='span'
              color='inherit'
              weight='semibold'
              size='inherit'
            >
              {formatAmount({ amount: invoices.totalAmount })}
            </TypographyOverflow>
          </Link>
          {Boolean(overdueInvoices?.totalCount) && (
            <Tooltip content='Company has overdue invoices' interactive>
              <Container
                as='span'
                left='xsmall'
                flex
                alignItems='center'
                data-testid='overdue-invoices-icon'
              >
                <Exclamation16 color='yellow' />
              </Container>
            </Tooltip>
          )}
        </Container>
      }
    />
  )
}

export default CompanyTaskCardRevenue
