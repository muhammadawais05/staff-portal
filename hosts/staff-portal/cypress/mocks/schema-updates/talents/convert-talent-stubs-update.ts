import { Talent, VerticalConnection } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const vertical = {
  id: 'VjEtVmVydGljYWwtMTAxMA',
  talentType: 'designer',
  specializations: {
    nodes: [
      {
        id: 'VjEtU3BlY2lhbGl6YXRpb24tMzEwMjg',
        title: 'Core',
        __typename: 'Specialization'
      }
    ],
    __typename: 'VerticalSpecializationConnection'
  },
  __typename: 'Vertical'
}

const updateConvertTalentStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      otherVerticals: {
        nodes: [vertical],
        __typename: 'VerticalConnection'
      } as unknown as VerticalConnection,
      operations: getTalentOperations({
        convertTalent: enabledOperationMock(),
        convertOnboardingTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            convertTalent: enabledOperationMock(),
            convertOnboardingTalent: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    ConvertTalent: {
      data: {
        convertTalent: {
          ...successOperationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            type: 'Designer',
            otherVerticals: {
              nodes: [vertical],
              __typename: 'VerticalConnection'
            },
            __typename: 'Talent'
          },
          __typename: 'ConvertOnboardingTalentPayload'
        }
      }
    },
    ConvertOnboardingTalent: {
      data: {
        convertOnboardingTalent: {
          ...successOperationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            type: 'Designer',
            otherVerticals: {
              nodes: [vertical],
              __typename: 'VerticalConnection'
            },
            __typename: 'Talent'
          },
          __typename: 'ConvertOnboardingTalentPayload'
        }
      }
    }
  })

export default updateConvertTalentStubs
