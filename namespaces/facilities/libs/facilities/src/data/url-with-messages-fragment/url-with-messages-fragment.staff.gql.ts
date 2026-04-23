import { gql } from '@staff-portal/data-layer-service'

export const URL_WITH_MESSAGES_FRAGMENT = gql`
  fragment UrlWithMessagesFragment on UrlWithMessages {
    enabled
    messages
    url
  }
`
