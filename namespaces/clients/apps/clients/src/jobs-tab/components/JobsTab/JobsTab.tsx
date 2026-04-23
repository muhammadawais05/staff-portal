import React, { useState, useCallback } from 'react'
import { EmptyState, Section } from '@toptal/picasso'
import { ContainerLoader, SubSection } from '@staff-portal/ui'
import { Pagination, usePagination } from '@staff-portal/filters'
import { JobListItem, JobListSkeletonLoader } from '@staff-portal/jobs'

import { useGetCompanyJobs } from '../../data/get-company-jobs.staff.gql'
import JobsTabActions from '../JobsTabActions'
import * as S from './styles'

interface Props {
  companyId: string
}

const PAGE_SIZE = 25

const JobsTab = ({ companyId }: Props) => {
  const [showSubsidiaries, setShowSubsidiaries] = useState(false)
  const { limit, page, offset, handlePageChange, normalizePage } =
    usePagination({
      limit: PAGE_SIZE
    })

  const { loading, initialLoading, jobs, totalCount, addJobLink, hasChildren } =
    useGetCompanyJobs({ companyId, showSubsidiaries, offset, limit })

  const toggleShowSubsidiaries = useCallback(() => {
    setShowSubsidiaries(currentShowSubsidiaries => !currentShowSubsidiaries)
    handlePageChange(1)
  }, [setShowSubsidiaries, handlePageChange])

  normalizePage(totalCount)

  return (
    <Section
      title='Jobs'
      variant='withHeaderBar'
      data-testid='jobs-section'
      actions={
        <JobsTabActions
          addJobLink={addJobLink}
          hasChildren={hasChildren}
          showSubsidiaries={showSubsidiaries}
          toggleShowSubsidiaries={toggleShowSubsidiaries}
        />
      }
    >
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<JobListSkeletonLoader withSubSection />}
      >
        {!!jobs?.length && (
          <>
            {jobs.map(({ id: jobId }, index) => (
              <SubSection
                key={jobId}
                last={index === jobs.length - 1 && totalCount <= PAGE_SIZE}
              >
                <JobListItem jobId={jobId} css={S.jobItemSectionReset} />
              </SubSection>
            ))}

            <Pagination
              limit={limit}
              activePage={page}
              onPageChange={handlePageChange}
              itemCount={totalCount}
            />
          </>
        )}

        {!jobs?.length && (
          <EmptyState.Collection>
            There are no jobs to be displayed.
          </EmptyState.Collection>
        )}
      </ContainerLoader>
    </Section>
  )
}

export default JobsTab
