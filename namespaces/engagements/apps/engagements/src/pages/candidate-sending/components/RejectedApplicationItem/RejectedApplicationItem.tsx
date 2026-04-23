import React, { useState, Suspense } from 'react'
import { Table, Button, Typography } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { LinkWrapper } from '@staff-portal/ui'

import { RejectedApplicationConnectionFragment } from '../../data/submit-new-engagement-wizard'
import RejectedApplicationItemExpandedRow from '../../containers/RejectedApplicationItemExpandedRow/RejectedApplicationItemExpandedRow'
import RejectedApplicationFeedbackCell from '../RejectedApplicationFeedbackCell/RejectedApplicationFeedbackCell'
import * as S from './styles'
import { getFeedbackApplicationTalent } from '../../utils/get-feedback-application-talent/get-feedback-application-talent'
import RejectedApplicationItemExpandedRowSkeletonLoader from '../RejectedApplicationItemExpandedRowSkeletonLoader/RejectedApplicationItemExpandedRowSkeletonLoader'
import { useCandidateSendingContext } from '../../hooks'

export type Props = RejectedApplicationConnectionFragment

const RejectedApplicationItem = (props: Props) => {
  const { id: applicantId } = props
  const [expanded, setExpanded] = useState(false)
  const talent = getFeedbackApplicationTalent(props)
  const talentProfileUrl = talent?.profileLink?.url
  const talentProfileText = talent?.profileLink?.text
  const { jobId } = useCandidateSendingContext()

  return (
    <Table.ExpandableRow
      expanded={expanded}
      content={
        <WidgetErrorBoundary>
          <Suspense
            fallback={<RejectedApplicationItemExpandedRowSkeletonLoader />}
          >
            {talent && jobId && (
              <RejectedApplicationItemExpandedRow
                applicantId={applicantId}
                talentId={talent.id}
                jobId={jobId}
              />
            )}
          </Suspense>
        </WidgetErrorBoundary>
      }
    >
      <Table.Cell css={S.alignCellToTop}>
        <Typography weight='semibold' color='inherit' as='span'>
          <LinkWrapper
            wrapWhen={Boolean(talentProfileUrl)}
            href={talentProfileUrl as string}
          >
            {talentProfileText}
          </LinkWrapper>
        </Typography>
      </Table.Cell>

      <RejectedApplicationFeedbackCell id={applicantId} />

      <Table.Cell css={S.alignCellToTop}>
        <Button
          size='small'
          variant='secondary'
          active={expanded}
          onClick={() => setExpanded(prevExpanded => !prevExpanded)}
        >
          {expanded ? 'Hide info' : 'Show info'}
        </Button>
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default RejectedApplicationItem
