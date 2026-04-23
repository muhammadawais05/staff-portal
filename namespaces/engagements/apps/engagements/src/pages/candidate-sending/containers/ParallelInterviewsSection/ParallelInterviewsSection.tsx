import React from 'react'
import { Section } from '@toptal/picasso'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { useCandidateSendingContext } from '../../hooks'
import { ParallelInterview } from './components'
import { ParallelEngagementsFragment } from '../../data/get-availability-step-data'

interface Props {
  parallelEngagements: ParallelEngagementsFragment[]
  parallelEngagementsLoading: boolean
}

const ParallelInterviewsSection = ({
  parallelEngagements,
  parallelEngagementsLoading
}: Props) => {
  const { stepsAttributes } = useCandidateSendingContext()

  if (stepsAttributes && parallelEngagementsLoading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Parallel Interviews'
        columns={1}
        items={5}
        labelColumnWidth={10}
        dataTestId='parallel-interviews-section-skeleton-loader'
      />
    )
  }

  return (
    <Section
      variant='withHeaderBar'
      title={`Parallel Interviews (${parallelEngagements?.length})`}
      data-testid='parallel-interviews-section'
    >
      {parallelEngagements.map(
        (
          {
            id,
            client,
            commitment,
            job,
            cumulativeStatus,
            status,
            currentInterviewLock
          },
          index
        ) => {
          const engagementStatus = {
            cumulativeStatus,
            status
          }

          return (
            <ParallelInterview
              last={index === parallelEngagements.length - 1}
              key={id}
              client={client}
              commitment={commitment}
              engagementStatus={engagementStatus}
              job={job}
              currentInterviewLock={currentInterviewLock}
            />
          )
        }
      )}
    </Section>
  )
}

export default ParallelInterviewsSection
