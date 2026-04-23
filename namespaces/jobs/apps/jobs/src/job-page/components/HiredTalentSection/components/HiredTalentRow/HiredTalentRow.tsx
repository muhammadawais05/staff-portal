import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  Button,
  Container,
  Table
} from '@toptal/picasso'
import React, { Suspense, useState } from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { lazy } from '@staff-portal/utils'
import { TalentLink } from '@staff-portal/talents'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'

import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'
import { HiredTalentMoreDropdown } from '../../../HiredTalentMoreDropdown'
import HiredTalentRowContentSkeletonLoader from '../HiredTalentRowContentSkeletonLoader'
import HiredTalentStatus from '../HiredTalentStatus'
import HiredTalentTableCells from '../HiredTalentTableCells'

const HiredTalentRowContent = lazy(() => import('../HiredTalentRowContent'))

export interface Props {
  jobId: string
  engagement: HiredTalentEngagementFragment
  isExpanded: boolean
  stripeEven?: boolean
}

const HiredTalentRow = ({
  jobId,
  isExpanded,
  stripeEven,
  engagement
}: Props) => {
  const [expanded, setExpanded] = useState(isExpanded)

  return (
    <Table.ExpandableRow
      stripeEven={stripeEven}
      expanded={expanded}
      content={
        <WidgetErrorBoundary>
          <Suspense fallback={<HiredTalentRowContentSkeletonLoader />}>
            <HiredTalentRowContent jobId={jobId} engagement={engagement} />
          </Suspense>
        </WidgetErrorBoundary>
      }
      data-testid='HiredTalentRow'
    >
      <HiredTalentTableCells
        talent={
          <TalentLink
            fullName={engagement.talent?.fullName}
            url={engagement.talent?.webResource.url}
            target={getTalentProfileLinkTarget(
              engagement.talent?.webResource.url
            )}
            data-testid='HiredTalentRow-talent-link'
          />
        }
        status={<HiredTalentStatus engagement={engagement} />}
        actions={
          <Container
            flex
            alignItems='center'
            data-testid='HiredTalentRow-actions'
          >
            <HiredTalentMoreDropdown engagement={engagement} />
            <Button.Circular
              variant='flat'
              icon={expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
              onClick={() => setExpanded(prevIsExpanded => !prevIsExpanded)}
            />
          </Container>
        }
      />
    </Table.ExpandableRow>
  )
}

export default HiredTalentRow
