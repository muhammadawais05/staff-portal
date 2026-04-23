import { gql } from '@staff-portal/data-layer-service'
import { NOTE_OPERATION_FRAGMENT, NOTE_FRAGMENT } from '@staff-portal/notes'
import { TASK_LIST_ITEM_FRAGMENT } from '@staff-portal/tasks-list-item'

import { TALENT_COACHING_ENGAGEMENT_FRAGMENT } from '../talent-coaching-engagement-fragment'

export const TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT = gql`
  fragment TalentCoachingEngagementWithActivitiesFragment on TalentCoachingEngagement {
    ...TalentCoachingEngagementFragment

    notes {
      nodes {
        ...NoteFragment
      }
      totalCount
    }
    tasks {
      nodes {
        ...TaskListItemFragment
      }
      totalCount
    }
  }

  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
  ${TALENT_COACHING_ENGAGEMENT_FRAGMENT}
  ${TASK_LIST_ITEM_FRAGMENT}
`
