import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { TalentCoachingEngagementWithActivitiesFragment } from './talent-coaching-engagement-with-activities-fragment.staff.gql.types'
import { createTalentCoachingEngagementFragmentMock } from '../talent-coaching-engagement-fragment/mocks'

export const createTalentCoachingEngagementWithActivitiesFragmentMock = (
  fields?: Partial<TalentCoachingEngagementWithActivitiesFragment>
) => ({
  ...createTalentCoachingEngagementFragmentMock(),
  tasks: {
    totalCount: 0,
    nodes: [],
    __typename: 'TaskConnection'
  },
  notes: {
    totalCount: 0,
    nodes: [],
    operations: {
      createNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'NoteConnectionOperations'
    },
    __typename: 'NoteConnection'
  },
  __typename: 'TalentCoachingEngagement',
  ...fields
})
