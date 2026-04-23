import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { OperationFragment } from '@staff-portal/operations'

import { TalentCoachingEngagementWithActivitiesFragment } from '../../data/talent-coaching-engagement-with-activities-fragment'
import {
  TalentCoachingListItemActions,
  TalentCoachingContent,
  TalentCoachingActivities,
  TalentCoachingActivitiesProvider,
  CoachingHeader
} from './components'
import { getTalentCoachingEngagementHook } from '../../data'
import { COACHING_CAMPAIGN_MAPPING } from '../../constants'

interface Props {
  talentCoachingEngagement: TalentCoachingEngagementWithActivitiesFragment
  showHeader?: boolean
  createTaskOperation?: OperationFragment
  expandTasks?: boolean
}

export const TalentCoachingListItem = ({
  talentCoachingEngagement,
  showHeader = false,
  createTaskOperation,
  expandTasks = false
}: Props) => {
  const useGetTalentCoachingEngagement = getTalentCoachingEngagementHook(
    talentCoachingEngagement.id,
    'coach'
  )
  const { request: refetch } = useGetTalentCoachingEngagement()
  const actions = (
    <TalentCoachingListItemActions
      talentCoachingEngagement={talentCoachingEngagement}
      createTaskOperation={createTaskOperation}
      refetch={refetch}
    />
  )

  return (
    <TalentCoachingActivitiesProvider>
      <Container data-testid='talent-coaching-list-item'>
        {showHeader ? (
          <Container bottom='medium'>
            <CoachingHeader
              talent={talentCoachingEngagement.talent}
              actions={actions}
            />
          </Container>
        ) : (
          <Container flex justifyContent='space-between' bottom='small'>
            <Typography variant='heading' size='small'>
              {COACHING_CAMPAIGN_MAPPING[talentCoachingEngagement.campaignSlug]}
            </Typography>
            {actions}
          </Container>
        )}
        <TalentCoachingContent
          talentCoachingEngagement={talentCoachingEngagement}
        />
        <TalentCoachingActivities
          talentCoachingEngagement={talentCoachingEngagement}
          refetch={refetch}
          expandTasks={expandTasks}
        />
      </Container>
    </TalentCoachingActivitiesProvider>
  )
}

export default TalentCoachingListItem
