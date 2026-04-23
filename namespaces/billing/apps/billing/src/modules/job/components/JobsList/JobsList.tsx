import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, EmptyState, Section } from '@toptal/picasso'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'

import * as S from './styles'
import JobsListRow from './components/JobsListRow'
import JobsListHeader from './components/JobsListHeader'
import JobsListSkeleton from './components/JobsListSkeleton'
import { GetJobListItemFragment } from '../data/getJobListItemFragment.graphql.types'

const displayName = 'JobsList'

export type JobEngagementListItem = {
  job: GetJobListItemFragment
  showJob: boolean
  showEngagement: boolean
}

interface Props {
  jobs: JobEngagementListItem[]
  loading?: boolean
  initialLoading?: boolean
}

const JobsList: FC<Props> = memo<Props>(
  ({ jobs, loading = false, initialLoading = false }) => {
    const { t: translate } = useTranslation('jobList')

    return (
      <Section title={translate('title')} data-testid={displayName}>
        <ContentLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={<JobsListSkeleton />}
        >
          {jobs.length > 0 ? (
            <Table css={S.table}>
              <JobsListHeader />
              <Table.Body>
                {jobs.map((item, index: number) => (
                  <JobsListRow
                    key={`${item.job.id}-${item.job.engagements?.nodes[0]?.id}`}
                    index={index}
                    showJob={item.showJob}
                    showEngagement={item.showEngagement}
                    job={item.job}
                  />
                ))}
              </Table.Body>
            </Table>
          ) : (
            <EmptyState.Collection data-testid={`${displayName}-empty`}>
              {translate('table.empty.message')}
            </EmptyState.Collection>
          )}
        </ContentLoader>
      </Section>
    )
  }
)

JobsList.displayName = displayName

export default JobsList
