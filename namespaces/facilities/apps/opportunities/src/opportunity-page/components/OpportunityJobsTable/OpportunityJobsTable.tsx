import React from 'react'
import {
  Table,
  SkeletonLoader,
  TypographyOverflow,
  EmptyState
} from '@toptal/picasso'
import { ItemsTable, LinkWrapper } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { OpportunityJobFragment } from '../OpportunityJobsSection/data'
import JobStatus from './components/JobStatus'
import JobOpportunityStagesNames from './components/JobOpportunityStagesNames'
import * as TableStyles from './styles'

const NO_RESULTS_MESSAGE = 'No linked jobs.'

const renderHeaderForProject = () => (
  <Table.Row>
    <Table.Cell>Name</Table.Cell>
    <Table.Cell>Status</Table.Cell>
    <Table.Cell>Stage</Table.Cell>
    <Table.Cell>Committed Rev.</Table.Cell>
    <Table.Cell>Last action</Table.Cell>
    <Table.Cell>Actions</Table.Cell>
  </Table.Row>
)

const getRenderRowForProject = (job: OpportunityJobFragment) => {
  return (
    <Table.Row key={job.id}>
      <Table.Cell css={TableStyles.nameCol}>
        <LinkWrapper
          wrapWhen={Boolean(job?.talentPortalLink?.url)}
          href={job?.talentPortalLink?.url as string}
        >
          <TypographyOverflow color='inherit'>{job.title}</TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell css={TableStyles.statusCol}>
        <JobStatus status={job.status} />
      </Table.Cell>
      <Table.Cell css={TableStyles.stageCol}>
        <JobOpportunityStagesNames
          opportunityStagesNames={job.opportunityStagesNames}
        />
      </Table.Cell>
      <Table.Cell>{job.committedRevenue}</Table.Cell>
      <Table.Cell>{parseAndFormatDate(job.lastAction)}</Table.Cell>
    </Table.Row>
  )
}

const renderHeaderForNonProject = () => (
  <Table.Row>
    <Table.Cell>Name</Table.Cell>
    <Table.Cell>Status</Table.Cell>
    <Table.Cell>Committed Rev.</Table.Cell>
    <Table.Cell>Last action</Table.Cell>
    <Table.Cell>Actions</Table.Cell>
  </Table.Row>
)

const getRenderRowForNonProject = (job: OpportunityJobFragment) => {
  return (
    <Table.Row key={job.id}>
      <Table.Cell css={TableStyles.nameCol}>
        <LinkWrapper
          wrapWhen={Boolean(job?.talentPortalLink?.url)}
          href={job?.talentPortalLink?.url as string}
        >
          <TypographyOverflow color='inherit'>{job.title}</TypographyOverflow>
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell css={TableStyles.statusCol}>
        <JobStatus status={job.status} />
      </Table.Cell>
      <Table.Cell>{job.committedRevenue}</Table.Cell>
      <Table.Cell>{parseAndFormatDate(job.lastAction)}</Table.Cell>
    </Table.Row>
  )
}

interface Props {
  data: OpportunityJobFragment[]
  project: boolean
  loading: boolean
}

const renderHeader = (project: boolean) => {
  return project ? renderHeaderForProject : renderHeaderForNonProject
}

const renderRows = (project: boolean) => {
  return project ? getRenderRowForProject : getRenderRowForNonProject
}

const OpportunityJobsTable = ({ data, project, loading }: Props) => {
  if (loading) {
    return <SkeletonLoader.Typography />
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState.Collection data-testid='opportunity-jobs-empty-message'>
        {NO_RESULTS_MESSAGE}
      </EmptyState.Collection>
    )
  }

  return (
    <ItemsTable
      renderHeader={renderHeader(project)}
      renderRow={renderRows(project)}
      data={data}
    />
  )
}

export default OpportunityJobsTable
