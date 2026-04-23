import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { ItemsList } from '@staff-portal/ui'
import { OperationFragment } from '@staff-portal/operations'
import {
  TalentCoachingEngagementWithActivitiesFragment,
  TalentCoachingListItem
} from '@staff-portal/talents-coaching'

import * as S from './styles'

interface Props {
  engagements: TalentCoachingEngagementWithActivitiesFragment[]
  createTaskOperation?: OperationFragment
}

const coachingItemWrapperStyle = (length: number, index: number) =>
  index < length - 1 ? S.coachingItemWrapper : undefined

const CoachingItems = ({ engagements, createTaskOperation }: Props) => (
  <Container css={S.container}>
    <ItemsList<TalentCoachingEngagementWithActivitiesFragment>
      data={engagements}
      renderItem={(item, index) => (
        <Container css={coachingItemWrapperStyle(engagements.length, index)}>
          <TalentCoachingListItem
            talentCoachingEngagement={item}
            createTaskOperation={createTaskOperation}
            expandTasks
          />
        </Container>
      )}
      getItemKey={item => String(item.id)}
      notFoundMessage={
        <Typography size='medium'>
          No coaching engagements were added yet.
        </Typography>
      }
    />
  </Container>
)

export default CoachingItems
