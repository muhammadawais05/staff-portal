import { JobType as Vertical } from '@staff-portal/jobs'

import { GetTalentWorkExperiencePortfolioItemsDocument } from './get-talent-work-experience-portfolio-items.staff.gql.types'

export const createGetTalentWorkExperiencePortfolioItemsMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GetTalentWorkExperiencePortfolioItemsDocument,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        type: Vertical.DEVELOPER,
        profile: {
          id: 'profile-id',
          portfolioItems: {
            nodes: [
              {
                id: '223423423',
                coverPhoto: {
                  coverUrl: 'fake-url-cover-image',
                  __typename: 'PortfolioItemCoverImage'
                },
                title: 'Leveraged Buyout Model',
                kindEnum: 'BASIC',
                link: 'https://url.com',
                description: 'Some description',
                skills: {
                  nodes: [
                    {
                      id: '54434434',
                      name: 'Leveraged Buyout Model',
                      skillPage: null,
                      __typename: 'Skill'
                    }
                  ],
                  __typename: 'SkillConnection'
                },
                __typename: 'PortfolioItem'
              }
            ],
            __typename: 'PortfolioItemConnection'
          },
          __typename: 'Profile'
        },
        __typename: 'Talent'
      }
    }
  }
})
