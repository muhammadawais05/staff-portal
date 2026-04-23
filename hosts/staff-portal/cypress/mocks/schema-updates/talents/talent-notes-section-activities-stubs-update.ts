import { OperationFragment } from '@staff-portal/operations'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ActivityOrNoteConnection, Maybe } from '@staff-portal/graphql/staff'

import { getTalentOperations } from '~integration/mocks/fragments'
import { talentNotesStubs } from '~integration/mocks/request-stubs/talents/tabs/notes'
import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentNotesSectionActivitiesStubs = ({
  operations,
  activitiesAndNotes,
  lazyOperationNode
}: {
  operations?: Record<string, OperationFragment>
  activitiesAndNotes?: Maybe<ActivityOrNoteConnection>
  lazyOperationNode?: {
    id: string
    operations: Record<string, OperationFragment>
    __typename: string
  }
}) =>
  cy.stubGraphQLRequests({
    ...talentNotesStubs({
      operations: getTalentOperations(operations),
      activitiesAndNotes: activitiesAndNotes
    }),
    GetLazyOperation: {
      data: {
        node: lazyOperationNode ?? {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            createActivity: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    CreateActivity: {
      data: {
        createActivity: successMutationMock()
      }
    },
    UpdateActivity: {
      data: {
        updateActivity: {
          ...successMutationMock()
        }
      }
    },
    RemoveActivity: {
      data: {
        removeActivity: {
          ...successMutationMock()
        }
      }
    }
  })

export default updateTalentNotesSectionActivitiesStubs
