import React from 'react'
import { Container, Slack16, Tag, UserBadge, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Engagement } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'
import { TalentAvatar } from '@staff-portal/talents'
import { useAnalytics } from '@staff-portal/monitoring-service'
import {
  getEngagementStatusColor,
  getEngagementDefaultStatus
} from '@staff-portal/engagements-interviews'
import { JobStationSegmentEvents } from '@staff-portal/facilities'

import * as S from './styles'

export interface Props {
  engagement: Engagement
}

const JobCardTalentItemHeader = ({ engagement }: Props) => {
  const { track } = useAnalytics()
  const { status, cumulativeStatus, interview } = engagement
  const { fullName = '', photo, type: talentType } = engagement.talent || {}
  const talentUrl = engagement.talent?.webResource?.url
  const communitySlackUrl =
    engagement.talent?.contacts?.nodes[0]?.webResource?.url

  const talentPartnerName = engagement.talent?.talentPartner?.webResource?.text
  const talentPartnerUrl = engagement.talent?.talentPartner?.webResource?.url

  const verboseStatus =
    talentType &&
    getEngagementDefaultStatus(engagement.cumulativeStatus, talentType)
  const statusColor =
    status && cumulativeStatus
      ? getEngagementStatusColor({ status, cumulativeStatus, interview })
      : 'light-grey'

  return (
    <Container flex justifyContent='space-between'>
      <UserBadge
        center
        name={fullName}
        avatar={
          <TalentAvatar
            fullName={fullName}
            photo={photo?.icon}
            talentPartnerName={talentPartnerName}
            talentPartnerUrl={talentPartnerUrl}
            badgeSize='small'
          />
        }
        renderName={name => (
          <Container flex alignItems='flex-start' direction='column'>
            <Container flex>
              <LinkWrapper
                wrapWhen={Boolean(talentUrl)}
                noUnderline
                href={talentUrl as string}
                onClick={() => track(JobStationSegmentEvents.JOBS_TABLE_LINK)}
              >
                <Typography weight='semibold'>{name}</Typography>
              </LinkWrapper>

              {communitySlackUrl && (
                <Link
                  css={S.slackLink}
                  href={communitySlackUrl}
                  onClick={() =>
                    track(JobStationSegmentEvents.TALENT_SLACK_LINK)
                  }
                >
                  <Slack16 css={S.icon} />
                </Link>
              )}
            </Container>

            {verboseStatus && (
              <Tag.Rectangular indicator={statusColor}>
                {verboseStatus}
              </Tag.Rectangular>
            )}
          </Container>
        )}
      />
    </Container>
  )
}

export default JobCardTalentItemHeader
