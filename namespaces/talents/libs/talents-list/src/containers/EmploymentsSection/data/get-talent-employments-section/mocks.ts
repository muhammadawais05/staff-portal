import { GetTalentEmploymentsSectionDocument } from './get-talent-employments-section.staff.gql.types'

export const createGetTalentEmploymentsSectionMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GetTalentEmploymentsSectionDocument,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        vertical: {
          id: 'test_id',
          talentType: 'developer'
        },
        profile: {
          employments: {
            nodes: [
              {
                company: 'Company Name',
                startDate: 2018,
                endDate: 2019,
                experienceItems: ['Experience 1', 'Experience 2'],
                position: 'Senior Position',
                skills: {
                  nodes: [{ name: 'Ruby' }, { name: 'React' }]
                }
              }
            ]
          }
        }
      }
    }
  }
})

export const createGetTalentEmploymentsSectionFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GetTalentEmploymentsSectionDocument,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
