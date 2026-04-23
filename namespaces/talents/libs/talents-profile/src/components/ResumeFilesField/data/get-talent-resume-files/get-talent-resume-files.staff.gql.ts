import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentResumeFilesDocument } from './get-talent-resume-files.staff.gql.types'

export const GET_TALENT_RESUME_FILES: typeof GetTalentResumeFilesDocument = gql`
  query GetTalentResumeFiles($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        profile {
          id
          resumeFiles {
            nodes {
              ...TalentResumeFileFragment
            }
          }
        }
      }
    }
  }

  fragment TalentResumeFileFragment on TalentProfileResumeFile {
    identifier
    uploadedAt
    url
  }
`

export const useGetTalentResumeFiles = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) =>
  useQuery(GET_TALENT_RESUME_FILES, {
    onError,
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })
