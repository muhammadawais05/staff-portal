import { gql } from '@staff-portal/data-layer-service'

export const WEB_RESOURCE_FRAGMENT = gql`
  fragment WebResourceFragment on WebResource {
    webResource {
      text
      url
    }
  }
`
