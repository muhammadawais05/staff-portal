import React from 'react'
import { Container } from '@toptal/picasso'
import { OperationFragment } from '@staff-portal/operations'

import { TalentCoachingEngagementWithActivitiesFragment } from '../../../../data/talent-coaching-engagement-with-activities-fragment'
import AddTaskButton from '../AddTaskButton'
import AddNoteButton from '../AddNoteButton'
import AddCoachingEngagementNoteButton from '../AddCoachingEngagementNoteButton'

interface Props {
  talentCoachingEngagement: TalentCoachingEngagementWithActivitiesFragment
  createTaskOperation?: OperationFragment
  refetch: () => void
}

const TalentCoachingListItemActions = ({
  talentCoachingEngagement,
  createTaskOperation,
  refetch
}: Props) => (
  <Container flex>
    <AddNoteButton
      createNoteOperation={talentCoachingEngagement?.operations.addGeneralNote}
    />
    <AddCoachingEngagementNoteButton
      createCoachingNoteOperation={
        talentCoachingEngagement.operations.addCoachActionsNote
      }
    />
    <AddTaskButton
      talentCoachingEngagement={talentCoachingEngagement}
      createTaskOperation={createTaskOperation}
      onTaskCreated={refetch}
    />
  </Container>
)

export default TalentCoachingListItemActions
