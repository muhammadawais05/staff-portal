import { Maybe } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetResumeTalentApplicationDetailsDocument,
  TalentSpecializationFragment
} from './get-resume-talent-application-details.staff.gql.types'

const isTalentSpecialization = (item: {
  id: string
  specialization?: Maybe<TalentSpecializationFragment>
}): item is {
  id: string
  specialization: TalentSpecializationFragment
} => !!item.specialization

export const GET_RESUME_TALENT_APPLICATION_DETAILS: typeof GetResumeTalentApplicationDetailsDocument = gql`
  fragment TalentSpecializationFragment on Specialization {
    id
    title
  }

  query GetResumeTalentApplicationDetails($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        eligibleForAutomaticRestore
        vertical {
          id
          specializations(order: { field: TITLE, direction: ASC }) {
            nodes {
              ...TalentSpecializationFragment
            }
          }
        }
        applicationManualRestorationAvailable
        specializationApplications {
          nodes {
            id
            specialization {
              ...TalentSpecializationFragment
            }
          }
        }
      }
    }
  }
`

export const useGetResumeTalentApplicationDetails = (talentId: string) => {
  const { data, loading } = useQuery(GET_RESUME_TALENT_APPLICATION_DETAILS, {
    variables: { talentId }
  })

  const verticalSpecializations = data?.node?.vertical?.specializations.nodes

  const specializationApplications =
    data?.node?.specializationApplications?.nodes
      ?.filter(isTalentSpecialization)
      .map(({ specialization }) => specialization)

  return {
    loading,
    eligibleForAutomaticRestore: data?.node?.eligibleForAutomaticRestore,
    specializations: verticalSpecializations,
    specializationApplications,
    applicationManualRestorationAvailable:
      data?.node?.applicationManualRestorationAvailable
  }
}
