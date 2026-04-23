import {
  ArrowUpMinor16,
  ArrowDownMinor16,
  Button,
  Container
} from '@toptal/picasso'
import React from 'react'
import { PublicLink } from '@staff-portal/talents'

export interface Props {
  jobApplicationId: string
  talentResumeUrl?: string
  jobSpecificResumeUrl?: string
  isExpanded: boolean
  expandItem: (jobApplicantId: string | null) => void
}

const JobApplicantsActions = ({
  jobApplicationId,
  talentResumeUrl,
  jobSpecificResumeUrl,
  isExpanded,
  expandItem
}: Props) => {
  if (!jobApplicationId) {
    return null
  }

  const toggleExpandRow = () => {
    expandItem(isExpanded ? null : jobApplicationId)
  }

  const isPublicProfileUrl = talentResumeUrl === jobSpecificResumeUrl

  return (
    <Container flex alignItems='center'>
      {isPublicProfileUrl ? (
        <PublicLink url={talentResumeUrl}>Public Profile</PublicLink>
      ) : (
        <PublicLink
          url={jobSpecificResumeUrl}
          data-testid='public-resume-button'
        >
          View Resume
        </PublicLink>
      )}
      <Container as='span' left='xsmall'>
        <Button.Circular
          title='expand task'
          variant='flat'
          data-testid='expand-job-applicant'
          icon={isExpanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
          onClick={toggleExpandRow}
        />
      </Container>
    </Container>
  )
}

export default JobApplicantsActions
