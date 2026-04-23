import React, { useMemo, useState } from 'react'
import {
  Typography,
  Button,
  Container,
  ArrowDownMinor16,
  ArrowUpMinor16
} from '@toptal/picasso'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import pluralize from 'pluralize'

import { SkillPair } from '../../../../types'
import { useGetCandidateJobs } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql'
import ItemSkeletonLoader from '../../../../components/ItemSkeletonLoader/ItemSkeletonLoader'
import JobItem from '../JobItem/JobItem'

const MAX_PREVIEW_ENGAGEMENTS = 3

const {
  ACTIVE,
  CLOSED,
  ON_TRIAL,
  SCHEDULED,
  ON_HOLD,
  PENDING_LEGAL,
  ON_BREAK,
  END_SCHEDULED,
  REJECTED_INTERVIEW
} = EngagementStatus

interface Props {
  talentId: string
  includeRejected: boolean
  talentSkills?: SkillPair[]
}

const JobItems = ({ includeRejected, talentId, talentSkills }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const { data, loading } = useGetCandidateJobs({
    talentId
  })

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const { previewEngagements, additionalEngagements } = useMemo(() => {
    const engagementStatusFilter = [
      ACTIVE,
      CLOSED,
      ON_TRIAL,
      SCHEDULED,
      ON_HOLD,
      PENDING_LEGAL,
      ON_BREAK,
      END_SCHEDULED,
      ...(includeRejected ? [REJECTED_INTERVIEW] : [])
    ]

    const engagements =
      data?.engagements.nodes.filter(
        ({ status }) => status && engagementStatusFilter.includes(status)
      ) || []

    return {
      previewEngagements: engagements.slice(0, MAX_PREVIEW_ENGAGEMENTS),
      additionalEngagements: engagements.slice(MAX_PREVIEW_ENGAGEMENTS)
    }
  }, [data, includeRejected])

  if (loading) {
    return (
      <>
        <ItemSkeletonLoader />
        <ItemSkeletonLoader />
      </>
    )
  }

  if (!data) {
    return null
  }

  if (previewEngagements.length <= 0) {
    return <Typography size='medium'>There are no jobs to display.</Typography>
  }

  return (
    <>
      {previewEngagements.map(engagement => (
        <JobItem
          engagement={engagement}
          key={engagement.id}
          talentSkills={talentSkills}
        />
      ))}
      {showMore &&
        additionalEngagements.map(engagement => (
          <JobItem
            engagement={engagement}
            key={engagement.id}
            talentSkills={talentSkills}
          />
        ))}
      {additionalEngagements.length > 0 && (
        <Container top='small'>
          <Button.Action
            icon={showMore ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
            iconPosition='right'
            onClick={toggleShowMore}
            data-testid='GigCandidatesShowMoreJobsButton'
          >
            {showMore
              ? 'View less'
              : `View ${additionalEngagements.length} more ${pluralize(
                  'job',
                  additionalEngagements.length
                )}`}
          </Button.Action>
        </Container>
      )}
    </>
  )
}

export default JobItems
