import { gql } from '@staff-portal/data-layer-service'

export const PHOTO_TRANSFORMATIONS_FRAGMENT = gql`
  fragment PhotoTransformationsFragment on Photo {
    transformations {
      cropped {
        cropX: x
        cropY: y
        cropW: width
        cropH: height
      }
    }
  }
`
