import React from 'react'
import {
  TypographyOverflow,
  EmptyState,
  Table,
  SkeletonLoader
} from '@toptal/picasso'
import { TableCellProps } from '@toptal/picasso/TableCell'
import { ItemsTable, LinkWrapper } from '@staff-portal/ui'
import { CompanyStatus } from '@staff-portal/clients'

import { LinkedCompanyNodeFragment } from '../LinkedCompaniesSection/data'
import { filterBadLeadCompanies } from './utils'
import LinkedCompanyActions from '../LinkedCompanyActions'
import { CompanyNegotiationStatus } from '../CompanyNegotiationStatus'

const NO_RESULTS_MESSAGE = 'No subsidiary companies.'

const cols: {
  title: string
  align?: TableCellProps['align']
}[] = [
  {
    title: 'Name'
  },
  {
    title: 'Status'
  },
  {
    title: 'Negotiations'
  },
  {
    title: 'Actions',
    align: 'right'
  }
]

const renderHeader = () => (
  <Table.Row>
    {cols.map(item => (
      <Table.Cell key={item.title} align={item.align}>
        {item.title}
      </Table.Cell>
    ))}
  </Table.Row>
)

const getRenderRow = (company: LinkedCompanyNodeFragment) => {
  const { investigations, cumulativeStatus } = company

  return (
    <Table.Row key={company.id} data-testid='LinkedCompaniesSection-table-row'>
      <Table.Cell>
        <LinkWrapper
          wrapWhen={Boolean(company.webResource.url)}
          href={company.webResource.url as string}
        >
          <TypographyOverflow color='inherit'>
            {company.fullName}
          </TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        <CompanyStatus
          cumulativeStatus={cumulativeStatus}
          investigations={investigations}
        />
      </Table.Cell>
      <Table.Cell>
        <CompanyNegotiationStatus
          value={{ status: company.currentNegotiation?.status }}
        />
      </Table.Cell>
      <Table.Cell align='right'>
        <LinkedCompanyActions company={company} />
      </Table.Cell>
    </Table.Row>
  )
}

interface Props {
  data: LinkedCompanyNodeFragment[]
  loading: boolean
  showBadLeads?: boolean
}

const LinkedCompaniesTable = ({
  data,
  loading,
  showBadLeads = false
}: Props) => {
  if (loading) {
    return <SkeletonLoader.Typography />
  }

  const companies = filterBadLeadCompanies(data, showBadLeads)

  if (companies.length === 0) {
    return (
      <EmptyState.Collection data-testid='linked-companies-empty-message'>
        {NO_RESULTS_MESSAGE}
      </EmptyState.Collection>
    )
  }

  return (
    <ItemsTable
      renderHeader={renderHeader}
      renderRow={node => getRenderRow(node)}
      data={companies}
    />
  )
}

export default LinkedCompaniesTable
