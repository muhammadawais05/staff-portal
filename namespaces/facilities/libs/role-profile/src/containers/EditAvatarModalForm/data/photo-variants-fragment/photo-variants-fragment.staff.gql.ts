import { gql } from '@staff-portal/data-layer-service'

export const PHOTO_VARIANTS_FRAGMENT = gql`
  fragment PhotoVariantsFragment on Photo {
    default
    huge
    icon
    large
    skillPageAvatar
    small
    thumb
    original
  }
`
