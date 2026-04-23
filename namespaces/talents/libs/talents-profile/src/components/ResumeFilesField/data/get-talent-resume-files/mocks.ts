import { TalentProfileResumeFile } from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { GET_TALENT_RESUME_FILES } from './get-talent-resume-files.staff.gql'

export const createGetTalentResumeFilesMock = ({
  talentId,
  resumeFiles
}: {
  talentId: string
  resumeFiles?: TalentProfileResumeFile[]
}) => ({
  request: {
    query: GET_TALENT_RESUME_FILES,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        profile: {
          id: 'test-id',
          resumeFiles: {
            nodes: resumeFiles
              ? mapToTypename(resumeFiles, 'TalentProfileResumeFile')
              : [],
            __typename: 'TalentProfileResumeFileConnection'
          },
          __typename: 'TalentProfile'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentResumeFilesFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_TALENT_RESUME_FILES,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
