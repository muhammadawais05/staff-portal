import React from 'react'
import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { ArrowDownMinor16, ArrowUpMinor16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { useQuery } from '@staff-portal/data-layer-service'
import { GetEngagementDocument } from '@staff-portal/engagements-interviews'
import { PublicLink } from '@staff-portal/talents'

import { MoreButton } from './components'

interface Props {
  canViewEngagements: boolean
  candidateEngagementUrl?: string | null
  expanded: boolean
  toggleExpanded: () => void
  engagementId?: string
}

const CandidatesTableItemActions = ({
  canViewEngagements,
  candidateEngagementUrl,
  expanded,
  toggleExpanded,
  engagementId
}: Props) => {
  const { data: engagementData } = useQuery(GetEngagementDocument, {
    variables: { engagementId }
  })

  const engagement = engagementData?.node
  const isNewResumeUrl =
    engagement?.resumeUrl &&
    engagement?.resumeUrl !== engagement?.talent?.resumeUrl

  return (
    <Container flex left='medium'>
      {canViewEngagements && (
        <Container flex right='xsmall'>
          {isNewResumeUrl && (
            <PublicLink
              url={engagement?.resumeUrl}
              noUnderline
              data-testid='engagement-resume-url'
            >
              View Resume
            </PublicLink>
          )}
          <Button
            size='small'
            variant='secondary'
            as={Link as typeof PicassoLink}
            href={candidateEngagementUrl}
            noUnderline
            data-testid='engagement-details-button'
          >
            Details
          </Button>

          {engagement && <MoreButton engagement={engagement} />}
        </Container>
      )}

      <Button.Circular
        variant='flat'
        icon={expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
        onClick={toggleExpanded}
        data-testid='CandidatesTableItemActions-expand-button'
      />
    </Container>
  )
}

export default CandidatesTableItemActions
