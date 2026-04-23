import {
  OfacStatus,
  OperationCallableTypes,
  TalentCumulativeStatus,
  Maybe
} from '@staff-portal/graphql/staff'

import { OfacStatusDataTalentFragment } from './get-ofac-status-data.staff.gql.types'
import { GET_OFAC_STATUS_DATA } from './get-ofac-status-data.staff.gql'

export const createOfacStatusDataMock = ({
  id,
  node = {},
  operationType,
  ofacStatus = OfacStatus.NORMAL
}: {
  id: string
  node?: Partial<
    OfacStatusDataTalentFragment & {
      ofacStatusChanges: { __typename: string }
      talentAssociatedRoles: { __typename: string }
    }
  >
  operationType?: OperationCallableTypes
  ofacStatus?: Maybe<OfacStatus>
}) => {
  const ofacStatusData: Partial<
    OfacStatusDataTalentFragment & {
      talentAssociatedRoles: { __typename: string }
    }
  > = {
    id,
    fullName: 'TEST_NAME',
    ofacStatus,
    ofacStatusChanges: null,
    talentCumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING,
    talentAssociatedRoles: { nodes: [], __typename: 'RoleOrClientConnection' },
    operations: {
      updateRoleOfacStatus: {
        callable: operationType || OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'TalentOperations'
    },
    ...node
  }

  return {
    request: {
      query: GET_OFAC_STATUS_DATA,
      variables: { id }
    },
    result: {
      data: {
        node: {
          ...ofacStatusData,
          __typename: 'Talent'
        }
      }
    }
  }
}
