import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { PossibleTalentDuplicateFragment } from './get-possible-duplicates.staff.gql.types'
import { GET_POSSIBLE_DUPLICATES } from './get-possible-duplicates.staff.gql'

export const createGetPossibleDuplicatesMock = ({
  talentId,
  possibleDuplicate,
  markAsResolvedOperationCallable = OperationCallableTypes.ENABLED
}: {
  talentId: string
  possibleDuplicate?: PossibleTalentDuplicateFragment
  markAsResolvedOperationCallable?: OperationCallableTypes
}) => ({
  request: { query: GET_POSSIBLE_DUPLICATES, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        unresolvedPossibleDuplicates: {
          nodes: possibleDuplicate
            ? [
                {
                  ...possibleDuplicate,
                  __typename: 'Talent'
                }
              ]
            : [],
          __typename: 'TalentUnresolvedPossibleDuplicates'
        },
        operations: {
          markTalentPossibleRoleDuplicatesResolved: {
            callable: markAsResolvedOperationCallable,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'TalentOperations'
        },
        __typename: 'Talent'
      }
    }
  }
})
