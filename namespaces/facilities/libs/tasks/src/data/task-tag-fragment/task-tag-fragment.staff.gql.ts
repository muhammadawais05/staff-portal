import { gql } from '@staff-portal/data-layer-service'

export const TASK_TAG_FRAGMENT = gql`
  fragment TaskTagFragment on TaskTag {
    id
    name
  }
`
