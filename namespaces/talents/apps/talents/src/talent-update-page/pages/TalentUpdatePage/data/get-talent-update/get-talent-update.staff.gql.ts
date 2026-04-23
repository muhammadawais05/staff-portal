import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentUpdateDocument } from './get-talent-update.staff.gql.types'

export default gql`
  query GetTalentUpdate($talentId: ID!) {
    viewer {
      permits {
        accessTalentInternals
        manageTalentBillingName
        editTalentTopSkill
        hideTalentFromRobots
      }
    }

    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentUpdateFragment
      }
    }
  }

  fragment TalentUpdateFragment on Talent {
    id
    fullName
    type
    email
    toptalEmail
    phoneNumber
    skype
    legalName
    billingName
    useBillingName
    hourlyRate
    talentPartner {
      id
      fullName
    }
    profile {
      id
      topSkill
      website
    }
    talentPartnership {
      id
      employmentStartDate
    }
    hiddenFromRobots
    hiddenFromPublicAccess
    featured
    webResource {
      url
    }
    locationV2 {
      country {
        id
      }
      cityName
      placeId
    }
    timeZone {
      name
      value
    }
    citizenship {
      id
    }
    operations {
      updateTalentProfile {
        ...OperationFragment
      }
      updateTalentHourlyRate {
        ...OperationFragment
      }
    }
    languages {
      nodes {
        id
        name
      }
    }
    linkedinUrl
    admissionPostUrl
    twitter
  }
`

export const useGetTalentUpdate = (talentId: string) => {
  const { data, loading } = useQuery(GetTalentUpdateDocument, {
    variables: { talentId }
  })

  return {
    permits: data?.viewer.permits,
    talent: data?.node,
    loading
  }
}
