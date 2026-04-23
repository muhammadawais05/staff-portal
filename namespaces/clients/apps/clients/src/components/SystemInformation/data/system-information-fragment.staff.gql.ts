import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const SYSTEM_INFORMATION_FRAGMENT = gql`
  fragment SystemInformationFragment on Client {
    id
    reviewStatus
    reviewLink
    lastAnsweredPromotion {
      score
      updatedAt
    }
    interestedIn
    updatedAt
    representatives(
      order: { field: CURRENT_SIGN_IN_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        id
        currentSignInAt
        currentSignInIp
        ipLocationV2 {
          cityName
          countryName
        }
      }
    }
    mobileAppEnabled
    howDidYouHear
    howDidYouHearDetails
    tosAcceptedAt
    applicationInfo {
      id
      ...WebResourceFragment
    }
    referrer {
      ... on Role {
        id
        fullName
      }
      ... on Client {
        id
        fullName
        webResource {
          text
          url
        }
      }
      ... on Talent {
        id
        webResource {
          text
          url
        }
      }
      ... on CompanyRepresentative {
        id
        webResource {
          text
          url
        }
      }
      ... on Leader {
        id
        webResource {
          text
          url
        }
      }
      ... on ReferralPartner {
        id
        webResource {
          text
          url
        }
      }
      ... on Staff {
        id
        webResource {
          text
          url
        }
      }
      ... on TalentPartner {
        id
        webResource {
          text
          url
        }
      }
    }
    createdAt
    claimedAt
    approvedAt
    billingVerifiedAt
    hiresCount
    claimableSince
    promotions {
      webResource {
        text
        url
      }
    }
    operations {
      patchClientProfile {
        ...OperationFragment
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
