import { Table } from '@toptal/picasso'
import React, { memo, useState, useEffect } from 'react'
import { Job } from '@staff-portal/graphql/staff'
import { NoSearchResultsMessage, TableSkeleton } from '@staff-portal/ui'

import * as S from './styles'
import JobListItem from '../JobListItem/JobListItem'

export interface Props {
  data: Job[]
  loading?: boolean
  refreshJobList?: () => void
}

const NO_RESULTS_MESSAGE = 'There are no jobs for this search criteria'

const tableColumns = [
  {
    title: 'Job Title'
  },
  {
    title: 'Company'
  },
  {
    title: 'Post Date'
  },
  {
    title: 'Matcher'
  },
  {
    title: 'Status'
  },
  {
    title: 'Contact'
  },
  {
    key: 'actions',
    title: ''
  }
]

const JobsTable = ({ data: jobs, loading = false }: Props) => {
  const [expandedJobIds, setExpandedJobIds] = useState<{
    [id: string]: boolean
  }>({})

  useEffect(() => {
    setExpandedJobIds({})
  }, [jobs])

  const expandCollapseJob = (jobId: string) => {
    const expanded = expandedJobIds[jobId]

    setExpandedJobIds({
      ...expandedJobIds,
      [jobId]: !expanded
    })
  }

  if (!loading && !jobs.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  if (loading) {
    return <TableSkeleton cols={tableColumns} rows={30} />
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row css={S.tableRow}>
          {tableColumns.map(columnItem => (
            <Table.Cell key={columnItem.key || columnItem.title}>
              {columnItem.title}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body css={S.tableRow}>
        {jobs.map((job: Job, index: number) => (
          <JobListItem
            key={job.id}
            job={job}
            index={index}
            isExpanded={expandedJobIds[job.id]}
            expandCollapseJob={expandCollapseJob}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default memo(JobsTable)
