import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const SOURCING_REQUESTS_LIST_ITEM_FRAGMENT = gql`
  fragment SourcingRequestsListItemSkillSetFragment on SkillSet {
    id
    rating
    main
    niceToHave
    skill {
      id
      name
    }
  }

  fragment SourcingRequestsListItemFragment on SourcingRequest {
    id

    createdAt
    claimedAt

    clientPartner {
      id
      ...WebResourceFragment
    }

    job {
      id
      jobType
      workType
      commitment

      client {
        id
        enterprise
        businessType: businessTypeV2

        ...WebResourceFragment
      }

      claimer {
        id
        ...WebResourceFragment
      }

      claimerHandoff {
        replacement {
          id
          ...WebResourceFragment
        }
      }

      specialization {
        id
        title
      }
    }

    positions
    status

    sourcingRequestTalents: sourcingRequestTalents(
      filter: { scope: NOT_DELETED }
    ) {
      totalCount
    }

    talentSpecialist {
      id
      ...WebResourceFragment
    }

    skillSets {
      totalCount
      nodes {
        ...SourcingRequestsListItemSkillSetFragment
      }
    }

    ...WebResourceFragment
  }

  ${WEB_RESOURCE_FRAGMENT}
`
