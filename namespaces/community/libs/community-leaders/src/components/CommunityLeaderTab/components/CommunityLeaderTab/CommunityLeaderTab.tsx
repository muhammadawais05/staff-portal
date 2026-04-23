import React, { memo } from 'react'
import { DetailedList as DL } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import {
  Section,
  TypographyOverflow,
  Container,
  Link,
  EmptyState,
  Typography
} from '@toptal/picasso'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import { CommunityLeaderStatus } from '@staff-portal/graphql/staff'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import {
  GetCommunityLeader,
  useGetCommunityLeader,
  CommunityLeaderNotesTab,
  CommunityLeaderApplicationsHistory,
  REFRESH_COMMUNITY_LEADER_PROFILE,
  CommunityLeaderEvents,
  MakeCommunityLeaderButton
} from '../../../..'
import * as S from './styles'
import CommunityLeaderTabLoader from '../CommunityLeaderTabLoader'
import CommunityLeaderActionButtons from '../CommunityLeaderActionButtons'
import { getCommunityLeaderRole } from '../../../../services/get-community-leader-role'
import CommunityLeaderUpdateField from '../../../CommunityLeaderUpdateField'
import { getCommunityLeaderStatus } from '../../../../services/get-community-leader-status'
interface Props {
  talentId: string
}

const ErrorLoadingCommunityLeader = () => (
  <Section variant='withHeaderBar' title='Community Leader'>
    <TypographyOverflow weight='inherit'>
      Something went wrong while loading community leader data.
    </TypographyOverflow>
  </Section>
)

// eslint-disable-next-line complexity
export const CommunityLeaderTab = ({ talentId }: Props) => {
  const {
    data: { communityLeader, basicLeaderInfo },
    loading,
    refetch
  } = useGetCommunityLeader({
    id: talentId
  })
  const userDateFormatter = useUserDateFormatter()
  const refetchQueries = [
    {
      query: GetCommunityLeader,
      variables: {
        id: talentId
      }
    }
  ]

  useMessageListener(REFRESH_COMMUNITY_LEADER_PROFILE, () =>
    refetch({ id: talentId })
  )

  if (loading) {
    return <CommunityLeaderTabLoader />
  }

  if (!communityLeader && !basicLeaderInfo) {
    return <ErrorLoadingCommunityLeader />
  }

  if (!communityLeader) {
    return basicLeaderInfo ? (
      <Section
        variant='withHeaderBar'
        title='Community Leader'
        actions={
          <MakeCommunityLeaderButton
            communityLeaderBasicInfo={basicLeaderInfo}
            operation={basicLeaderInfo.operations.appointCommunityLeader}
            refetchQueries={refetchQueries}
            variant='secondary'
            size='small'
          >
            Set As Community Leader
          </MakeCommunityLeaderButton>
        }
      >
        <EmptyState.Collection>
          There are no community leader data for this user.
        </EmptyState.Collection>
      </Section>
    ) : (
      <ErrorLoadingCommunityLeader />
    )
  }

  const { status, node, application } = communityLeader

  const role = getCommunityLeaderRole(communityLeader)
  const currentStatus = getCommunityLeaderStatus(
    status as CommunityLeaderStatus
  )

  const isMakeCommunityLeaderAvailable =
    !status || status === CommunityLeaderStatus.REJECTED

  return (
    <Container css={S.container}>
      <Section
        variant='withHeaderBar'
        data-testid='talent-community-leader-section'
        title={
          <TypographyOverflow weight='inherit'>
            {status ? (
              <Link href={getCommunityLeadersProfilePath(talentId)}>
                {role?.fullName}
              </Link>
            ) : (
              role?.fullName
            )}
          </TypographyOverflow>
        }
        actions={
          <CommunityLeaderActionButtons
            talentId={talentId}
            talentName={role?.fullName as string}
            refetchQueries={refetchQueries}
            communityLeaderData={communityLeader}
            communityLeaderBasicInfo={basicLeaderInfo}
          />
        }
      >
        <DL defaultValue={NO_VALUE} labelColumnWidth={11}>
          <DL.Row>
            <DL.Item
              label='Community Leader Status'
              value={
                <Typography size='medium' css={currentStatus.css}>
                  {currentStatus.label}
                </Typography>
              }
            />
          </DL.Row>
          {node && (
            <DL.Row>
              <DL.Item
                label='Type'
                value={
                  <CommunityLeaderUpdateField
                    communityLeaderData={communityLeader}
                  />
                }
              />
            </DL.Row>
          )}
          {node && (
            <DL.Row>
              <DL.Item
                label='Requested At'
                value={userDateFormatter(
                  application?.createdAt ?? node.requestedAt,
                  DEFAULT_FULL_DATE_FORMAT
                )}
              />
            </DL.Row>
          )}
          {application?.performerComment && (
            <DL.Row>
              <DL.Item
                label='Comments About Application'
                value={application.performerComment}
              />
            </DL.Row>
          )}
          {node && (
            <DL.Row>
              <DL.Item label='About me' value={node?.about} />
            </DL.Row>
          )}
          {node && (
            <DL.Row>
              <DL.Item
                label='Initial Ideas'
                value={application?.initialIdeas}
              />
            </DL.Row>
          )}
        </DL>
      </Section>

      {!isMakeCommunityLeaderAvailable && (
        <CommunityLeaderNotesTab
          communityLeaderId={talentId}
          communityLeader={communityLeader}
          actionOnSection
          sectionTitle='Notes'
        />
      )}

      <Section variant='withHeaderBar' title='Events'>
        <CommunityLeaderEvents communityLeaderId={talentId} />
      </Section>

      <Section
        variant='withHeaderBar'
        title={
          <TypographyOverflow weight='inherit'>
            Applications History
          </TypographyOverflow>
        }
      >
        <CommunityLeaderApplicationsHistory communityLeaderId={talentId} />
      </Section>
    </Container>
  )
}

export default memo(CommunityLeaderTab)
