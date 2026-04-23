import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { PHOTO_VARIANTS_FRAGMENT } from '../photo-variants-fragment/photo-variants-fragment.staff.gql'
import { PHOTO_TRANSFORMATIONS_FRAGMENT } from '../../../../data/photo-transformations-fragment/photo-transformations-fragment.staff.gql'

export default gql`
  mutation UpdateRolePhoto($input: UpdateRolePhotoInput!) {
    updateRolePhoto(input: $input) {
      role {
        id
        photo {
          ...PhotoVariantsFragment
          ...PhotoTransformationsFragment
        }
      }
      ...MutationResultFragment
    }
  }

  ${PHOTO_VARIANTS_FRAGMENT}
  ${PHOTO_TRANSFORMATIONS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
