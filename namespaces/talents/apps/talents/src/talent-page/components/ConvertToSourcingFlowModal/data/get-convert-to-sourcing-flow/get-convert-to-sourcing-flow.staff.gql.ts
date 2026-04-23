import { gql, useQuery } from '@staff-portal/data-layer-service'
import { COUNTRY_FRAGMENT } from '@staff-portal/facilities'
import {
  TALENT_APPLICANT_SKILL_FRAGMENT,
  TALENT_LOCATION_V2_FRAGMENT
} from '@staff-portal/talents'

import { GetConvertToSourcingFlowInfoDocument } from './get-convert-to-sourcing-flow.staff.gql.types'

export const GET_COVERT_TO_SOURCING_FLOW_INFO: typeof GetConvertToSourcingFlowInfoDocument = gql`
  query GetConvertToSourcingFlowInfo($id: ID!) {
    countries {
      nodes {
        ...CountryFragment
      }
    }
    node(id: $id) {
      ... on Talent {
        ...TalentConvertToSourcingFlowDataFragment
      }
    }
  }

  fragment TalentConvertToSourcingFlowDataFragment on Talent {
    id
    email
    fullName
    citizenship {
      ...CountryFragment
    }
    locationV2 {
      ...TalentLocationV2Fragment
    }
    applicantSkills {
      nodes {
        ...TalentApplicantSkillFragment
      }
    }
    defaultApplicationAnswers {
      nodes {
        ...DefaultApplicationAnswersFragment
      }
    }
  }

  fragment DefaultApplicationAnswersFragment on ApplicationAnswer {
    id
    answers
    question {
      id
      label
      kind
      options {
        nodes {
          id
          content
        }
        totalCount
      }
    }
  }

  ${TALENT_APPLICANT_SKILL_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${TALENT_LOCATION_V2_FRAGMENT}
`

export const useGetConvertToSourcingFlowInfo = (id: string) => {
  const { data, loading, error } = useQuery(GET_COVERT_TO_SOURCING_FLOW_INFO, {
    variables: { id }
  })

  if (error) {
    throw error
  }

  return { data, loading }
}
