import React from 'react'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'
import { EngagementStatus } from '@staff-portal/engagements-interviews'

import EngagementActionButton from '../EngagementActionsButton/EngagementActionButton'
import { ClientJobEngagementFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  engagement: ClientJobEngagementFragment
}

const EngagementListItem = ({ engagement }: Props) => {
  const talent = engagement?.talent
  const url = talent?.webResource.url ?? undefined

  return (
    <DetailedList.Row>
      <DetailedList.Item hideLabel isFullWidthLabel>
        <Container flex justifyContent='space-between'>
          <Container>
            <LinkWrapper
              wrapWhen={Boolean(talent?.webResource)}
              href={url}
              target={getTalentProfileLinkTarget(url)}
            >
              {talent?.fullName}
            </LinkWrapper>
            {' - '}
            <EngagementStatus.Detailed
              engagement={engagement}
              tooltipOptions={{ type: 'extended', ...engagement }}
            />
          </Container>
          <EngagementActionButton engagement={engagement} />
        </Container>
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default EngagementListItem
