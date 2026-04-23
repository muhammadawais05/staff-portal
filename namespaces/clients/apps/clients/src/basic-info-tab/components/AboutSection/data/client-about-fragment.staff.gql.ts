import { gql } from '@staff-portal/data-layer-service'

export const CLIENT_ABOUT_FRAGMENT = gql`
  fragment ClientAboutFragment on Client {
    id
    about
    buyingSignalsService {
      about
    }
    clientopedia {
      description
    }
  }
`
