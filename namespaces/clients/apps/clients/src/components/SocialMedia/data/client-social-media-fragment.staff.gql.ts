import { gql } from '@staff-portal/data-layer-service'
import {
  COMPANY_BUYING_SIGNALS_FRAGMENT,
  COMPANY_CLIENTOPEDIA_FRAGMENT
} from '@staff-portal/clients'

export const CLIENT_SOCIAL_MEDIA_FRAGMENT = gql`
  fragment ClientSocialMediaFragment on Client {
    id
    linkedinLink {
      text
      url
    }
    facebookLink {
      text
      url
    }
    crunchbaseLink {
      text
      url
    }
    zoominfoProfileUrl
    twitterLink {
      text
      url
    }
    ...CompanBuyingSignalsFragment
    ...CompanyClientopediaFragment
    operations {
      patchClientProfile {
        callable
        messages
      }
    }
  }

  ${COMPANY_BUYING_SIGNALS_FRAGMENT}
  ${COMPANY_CLIENTOPEDIA_FRAGMENT}
`
