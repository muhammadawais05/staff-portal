import React from 'react'
import {
  Amount,
  Table,
  SkeletonLoader,
  TypographyOverflow,
  EmptyState
} from '@toptal/picasso'
import { ItemsTable, LinkWrapper } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { OpportunityFragment } from '@staff-portal/opportunities'
import { OpportunityStatus } from '@staff-portal/clients'

import { getJobsCount, getOpportunityType, getPendingTasksCount } from './utils'
import * as TableStyles from './styles'

const NO_RESULTS_MESSAGE = 'No related opportunities.'

const renderHeaderForEnterprise = () => (
  <Table.Row>
    <Table.Cell>Name</Table.Cell>
    <Table.Cell>Stage</Table.Cell>
    <Table.Cell>Last action</Table.Cell>
    <Table.Cell>Weighted value</Table.Cell>
  </Table.Row>
)

const getRenderRowForEnterprise = (opportunity: OpportunityFragment) => {
  return (
    <Table.Row
      key={opportunity.id}
      data-testid='company-opportunities-section-table-row'
    >
      <Table.Cell css={TableStyles.nameCol}>
        <LinkWrapper
          wrapWhen={Boolean(opportunity.webResource.url)}
          href={opportunity.webResource.url as string}
        >
          <TypographyOverflow color='inherit'>
            {opportunity.name}
          </TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        <OpportunityStatus status={opportunity.status} />
      </Table.Cell>
      <Table.Cell>{parseAndFormatDate(opportunity.updatedAt)}</Table.Cell>
      <Table.Cell>
        <Amount amount={opportunity.weightedValue as string} />
      </Table.Cell>
    </Table.Row>
  )
}

const renderHeaderForNonEnterprise = () => (
  <Table.Row>
    <Table.Cell>Name</Table.Cell>
    <Table.Cell>Type</Table.Cell>
    <Table.Cell>Stage</Table.Cell>
    <Table.Cell>Last action</Table.Cell>
    <Table.Cell>Weighted value</Table.Cell>
    <Table.Cell>Pending tasks</Table.Cell>
    <Table.Cell>Linked jobs</Table.Cell>
  </Table.Row>
)

const getRenderRowForNonEnterprise = (opportunity: OpportunityFragment) => {
  return (
    <Table.Row
      key={opportunity.id}
      data-testid='company-opportunities-section-table-row'
    >
      <Table.Cell css={TableStyles.nameCol}>
        <LinkWrapper
          wrapWhen={Boolean(opportunity.webResource.url)}
          href={opportunity.webResource.url as string}
        >
          <TypographyOverflow color='inherit'>
            {opportunity.name}
          </TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>{getOpportunityType(opportunity.type)}</Table.Cell>
      <Table.Cell>
        <OpportunityStatus status={opportunity.status} />
      </Table.Cell>
      <Table.Cell>{parseAndFormatDate(opportunity.updatedAt)}</Table.Cell>
      <Table.Cell>
        <Amount amount={opportunity.weightedValue as string} />
      </Table.Cell>
      <Table.Cell>{getPendingTasksCount(opportunity)}</Table.Cell>
      <Table.Cell>{getJobsCount(opportunity)}</Table.Cell>
    </Table.Row>
  )
}

interface Props {
  data: OpportunityFragment[]
  enterprise: boolean
  loading: boolean
}

const renderHeader = (enterprise: boolean) => {
  return enterprise ? renderHeaderForEnterprise : renderHeaderForNonEnterprise
}

const renderRows = (enterprise: boolean) => {
  return enterprise ? getRenderRowForEnterprise : getRenderRowForNonEnterprise
}

const CompanyOpportunitiesTable = ({ data, enterprise, loading }: Props) => {
  if (loading) {
    return <SkeletonLoader.Typography />
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState.Collection data-testid='company-opportunities-empty-message'>
        {NO_RESULTS_MESSAGE}
      </EmptyState.Collection>
    )
  }

  return (
    <ItemsTable
      renderHeader={renderHeader(enterprise)}
      renderRow={renderRows(enterprise)}
      data={data}
    />
  )
}

export default CompanyOpportunitiesTable
