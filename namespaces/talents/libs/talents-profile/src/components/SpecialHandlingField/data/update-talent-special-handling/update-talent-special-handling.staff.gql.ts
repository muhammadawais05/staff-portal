import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateTalentSpecialHandlingDocument,
  UpdateTalentSpecialHandlingMutation,
  UpdatedTalentSpecialHandlingFragment
} from './update-talent-special-handling.staff.gql.types'

export const UPDATE_TALENT_SPECIAL_HANDLING: typeof UpdateTalentSpecialHandlingDocument = gql`
  mutation updateTalentSpecialHandling(
    $input: UpdateTalentSpecialHandlingInput!
  ) {
    updateTalentSpecialHandling(input: $input) {
      talent {
        id
        specialHandling
      }

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentSpecialHandling = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateTalentSpecialHandlingMutation) => void
  onError: (error: Error) => void
}) =>
  useMutation(UPDATE_TALENT_SPECIAL_HANDLING, {
    onCompleted,
    onError,
    update(cache, { data }) {
      if (!data?.updateTalentSpecialHandling?.success) {
        return
      }

      const typeName = 'Talent'

      cache.writeFragment<UpdatedTalentSpecialHandlingFragment>({
        id: `${typeName}:${data.updateTalentSpecialHandling?.talent?.id}`,
        fragment: gql`
          fragment UpdatedTalentSpecialHandlingFragment on Talent {
            specialHandling
            __typename
          }
        `,
        data: {
          specialHandling:
            data.updateTalentSpecialHandling.talent?.specialHandling,
          __typename: typeName
        }
      })
    }
  })
