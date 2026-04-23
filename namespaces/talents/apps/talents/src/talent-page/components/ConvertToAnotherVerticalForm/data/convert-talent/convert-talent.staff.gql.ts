import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TALENT_VERTICAL_FRAGMENT } from '@staff-portal/talents'

import {
  ConvertTalentDocument,
  ConvertTalentMutation
} from './convert-talent.staff.gql.types'

export const CONVERT_TALENT: typeof ConvertTalentDocument = gql`
  mutation ConvertTalent($input: ConvertTalentInput!) {
    convertTalent(input: $input) {
      ...MutationResultFragment
      talent {
        id
        type
        otherVerticals {
          nodes {
            ...TalentVerticalFragment
          }
        }
      }
    }
  }

  ${TALENT_VERTICAL_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useConvertTalent = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted?: (data: ConvertTalentMutation) => void
}) =>
  useMutation(CONVERT_TALENT, {
    onError,
    onCompleted
  })
