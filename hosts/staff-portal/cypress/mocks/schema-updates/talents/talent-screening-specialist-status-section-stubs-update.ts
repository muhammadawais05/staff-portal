import { SpecialistAssignment, Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationFragment } from '@staff-portal/operations'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentScreeningSpecialistStatusStubs = ({
  talent,
  currentSpecialistAssignment,
  specialistAssignment,
  lazyOperationNode
}: {
  talent?: Partial<Talent>
  currentSpecialistAssignment?: Partial<SpecialistAssignment>
  specialistAssignment?: Partial<SpecialistAssignment>
  lazyOperationNode?: {
    id: string
    operations: Record<string, OperationFragment>
    __typename: string
  }
}) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        assignScreeningSpecialistToTalent: enabledOperationMock(),
        archiveSpecialistAssignment: enabledOperationMock()
      }),
      ...talent
    }),
    GetTalentWithScreeningSpecialist: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          currentSpecialistAssignment: currentSpecialistAssignment || null,
          operations: {
            assignScreeningSpecialistToTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: lazyOperationNode ?? {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            assignScreeningSpecialistToTalent: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    GetScreeningSpecialists: {
      data: {
        roles: {
          nodes: [
            {
              id: encodeEntityId('456', 'Staff'),
              fullName:
                specialistAssignment?.assignee?.fullName || 'Joseph Dilon',
              webResource: {
                url: 'url.to',
                __typename: 'Link'
              },
              __typename: 'Staff'
            }
          ]
        }
      }
    },
    AssignScreeningSpecialist: {
      data: {
        assignScreeningSpecialist: {
          ...successMutationMock(),
          __typename: 'AssignScreeningSpecialistPayload',
          specialistAssignment: {
            id: encodeEntityId('123', 'SpecialistAssignment'),
            talent: {
              id: encodeEntityId('123', 'Talent'),
              cumulativeStatus: 'APPLIED',
              currentSpecialistAssignment: {
                id: encodeEntityId('123', 'SpecialistAssignment'),
                status: specialistAssignment?.status || 'ACTIVE',
                archiving: null,
                assignee: {
                  id: encodeEntityId('456', 'Staff'),
                  fullName: specialistAssignment?.assignee?.fullName,
                  webResource: {
                    url: 'url.to',
                    __typename: 'Link'
                  },
                  __typename: 'Staff'
                },
                operations: {
                  archiveSpecialistAssignment: enabledOperationMock(),
                  reactivateSpecialistAssignment: hiddenOperationMock(),
                  __typename: 'SpecialistAssignmentOperations'
                },
                __typename: 'SpecialistAssignment'
              },
              __typename: 'Talent'
            },
            __typename: 'SpecialistAssignment'
          }
        }
      }
    },
    ArchiveSpecialistAssignments: {
      data: {
        archiveSpecialistAssignments: {
          ...successMutationMock(),
          specialistAssignments: {
            id: encodeEntityId('123', 'SpecialistAssignment'),
            talent: {
              id: encodeEntityId('123', 'Talent'),
              cumulativeStatus: 'APPLIED',
              operations: getTalentOperations({
                assignScreeningSpecialistToTalent: hiddenOperationMock()
              }),
              currentSpecialistAssignment: {
                id: encodeEntityId('123', 'SpecialistAssignment'),
                status: specialistAssignment?.status || 'ARCHIVED',
                archiving: null,
                assignee: {
                  id: encodeEntityId('456', 'Staff'),
                  fullName: specialistAssignment?.assignee?.fullName,
                  webResource: {
                    url: 'url.to',
                    __typename: 'Link'
                  },
                  __typename: 'Staff'
                },
                operations: {
                  archiveSpecialistAssignment: hiddenOperationMock(),
                  reactivateSpecialistAssignment: hiddenOperationMock(),
                  __typename: 'SpecialistAssignmentOperations'
                },
                __typename: 'SpecialistAssignment'
              },
              __typename: 'Talent'
            },
            __typename: 'SpecialistAssignment'
          }
        }
      }
    }
  })

export default updateTalentScreeningSpecialistStatusStubs
