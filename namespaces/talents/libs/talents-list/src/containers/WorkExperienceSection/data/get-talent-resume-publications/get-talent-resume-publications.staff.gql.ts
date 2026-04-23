import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentResumePublicationsDocument } from './get-talent-resume-publications.staff.gql.types'

export default gql`
  query GetTalentResumePublications($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        resumePublications {
          nodes {
            ...TalentPublishableFragment
          }
        }
      }
    }
  }

  fragment TalentPublishableFragment on Publishable {
    url
    title
    imageUrl
  }
`

export const useGetTalentResumePublications = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, error } = useQuery(
    GetTalentResumePublicationsDocument,
    {
      onError,
      variables: {
        talentId
      }
    }
  )

  return {
    data: data?.node?.resumePublications?.nodes,
    loading: loading && !data,
    error
  }
}
