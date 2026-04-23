import { GET_TALENT_ABOUT_DATA } from './get-talent-about-data.staff.gql'
import { TalentAboutDataFragment } from './get-talent-about-data.staff.gql.types'

export const createGetTalentAboutDataMock = ({
  talentId,
  profile
}: {
  talentId: string
  profile?: TalentAboutDataFragment['profile']
}) => ({
  request: { query: GET_TALENT_ABOUT_DATA, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        profile: {
          about: 'TEST_TITLE',
          __typename: 'TalentProfile',
          ...profile
        },
        __typename: 'Talent'
      },
      __typename: 'Query'
    }
  }
})

export const createGetTalentAboutDataFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: { query: GET_TALENT_ABOUT_DATA, variables: { talentId } },
  error: new Error('Network error occurred')
})
