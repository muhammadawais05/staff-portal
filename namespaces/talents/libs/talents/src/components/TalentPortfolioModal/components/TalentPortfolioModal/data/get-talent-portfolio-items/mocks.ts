import {
  PortfolioItemFileImage,
  PortfolioItem
} from '@staff-portal/graphql/staff'
import { JobType as Vertical } from '@staff-portal/jobs'

import { GET_TALENT_PORTFOLIO_ITEMS } from './get-talent-portfolio-items.staff.gql'

export const createGetTalentPortfolioItemsMock = ({
  talentId,
  portfolioItems
}: {
  talentId: string
  portfolioItems?: PortfolioItem[]
}) => ({
  request: {
    query: GET_TALENT_PORTFOLIO_ITEMS,
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
            nodes: !portfolioItems
              ? []
              : portfolioItems.map(project => ({
                  id: '223423423',
                  description: 'some descripition',
                  kindEnum: 'CLASSIC',
                  link: 'https://some-link',
                  position: 0,
                  title: 'Leveraged Buyout Model',
                  ...(project as object),
                  coverPhoto: {
                    coverUrl: 'fake-url-cover-image',
                    originalUrl: 'fake-url-original-image',
                    thumbUrl: 'fake-url-thumb-image',
                    ...project.coverPhoto,
                    __typename: 'PortfolioItemCoverImage'
                  },
                  files: {
                    nodes: !project.files
                      ? []
                      : project.files.nodes.map(file => {
                          const currFile = file as PortfolioItemFileImage

                          return {
                            contentType: 'image/jpeg',
                            description: 'file description',
                            title: 'Welcome to Cloud Crew',
                            __typename: 'PortfolioItemFileImage',
                            id: 'file-id',
                            ...(currFile as object),
                            image: {
                              coverUrl: 'https://file-cover-url',
                              optimizedUrl: null,
                              originalUrl: 'https://file-original-url',
                              thumbUrl: 'https://file-thumb-url',
                              ...(currFile?.image as object),
                              __typename: 'PortfolioItemFileImageContent'
                            }
                          }
                        }),
                    __typename: 'PortfolioItemFileConnection'
                  },
                  skills: {
                    totalCount: 1,
                    ...(project.skills as object),
                    nodes: !project.skills
                      ? []
                      : project.skills.nodes.map(skill => ({
                          id: '54434434',
                          name: 'Leveraged Buyout Model',
                          skillPage: null,
                          ...(skill as object),
                          __typename: 'Skill'
                        })),
                    __typename: 'SkillConnection'
                  },
                  __typename: 'PortfolioItem'
                })),
            __typename: 'PortfolioItemConnection'
          },
          __typename: 'Profile'
        },
        __typename: 'Talent'
      }
    }
  }
})
