import { gql } from '@staff-portal/data-layer-service'

import { PHOTO_TRANSFORMATIONS_FRAGMENT } from '../../../../data/photo-transformations-fragment/photo-transformations-fragment.staff.gql'

export default gql`
  query PhotoAndCrop($roleId: ID!) {
    staffNode(id: $roleId) {
      ... on Role {
        id
        photo {
          original
          ...PhotoTransformationsFragment
        }
      }
    }
  }

  ${PHOTO_TRANSFORMATIONS_FRAGMENT}
`
