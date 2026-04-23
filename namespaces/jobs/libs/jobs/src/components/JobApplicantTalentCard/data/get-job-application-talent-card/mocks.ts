import { JobApplicationTalentCardFragment } from './get-job-application-talent-card.staff.gql.types'
import { GET_JOB_APPLICATION_TALENT_CARD } from './get-job-application-talent-card.staff.gql'

export const createGetJobApplicationTalentCardMock = ({
  jobApplicationId,
  talentName,
  talentPicth
}: {
  jobApplicationId?: string
  talentName?: string
  talentPicth?: JobApplicationTalentCardFragment['talentPitch'] | null
}) => ({
  request: {
    query: GET_JOB_APPLICATION_TALENT_CARD,
    variables: { jobApplicationId }
  },
  result: {
    data: {
      node: {
        id: jobApplicationId || 'job-application-id',
        applicationComment: 'This part was obfuscated, some content was here.',
        createdAt: '2021-08-21T13:15:17+10:00',
        talent: {
          id: 'VjEtVGFsZW50LTIwNjQwNDY',
          photo: null,
          fullName: talentName || 'Robert Abshire',
          locationV2: {
            country: {
              id: 'VjEtQ291bnRyeS00OA',
              name: 'Colombia',
              __typename: 'Country'
            },
            stateName: 'Bogota',
            cityName: 'Bogotá',
            __typename: 'Location'
          },
          topSkillTitle: 'Designer',
          webResource: {
            url: 'https://talent-url',
            __typename: 'Link'
          },
          __typename: 'Talent'
        },
        talentPitch:
          talentPicth === null
            ? null
            : {
                skillItems: {
                  nodes: [
                    {
                      title: 'UI Design',
                      skillSet: {
                        id: 'VjEtU2tpbGxTZXQtNDAzNDAy',
                        experience: 6,
                        __typename: 'SkillSet'
                      },
                      __typename: 'TalentPitchSkillItem'
                    },
                    {
                      title: 'UX Design',
                      skillSet: {
                        id: 'VjEtU2tpbGxTZXQtMzUwMTYw',
                        experience: 5,
                        __typename: 'SkillSet'
                      },
                      __typename: 'TalentPitchSkillItem'
                    }
                  ],
                  __typename: 'TalentPitchSkillItemConnection'
                },
                __typename: 'TalentPitch',
                industryItems: {
                  nodes: [
                    {
                      title: 'Restaurants',
                      __typename: 'TalentPitchIndustryItem'
                    },
                    {
                      title: 'eCommerce',
                      __typename: 'TalentPitchIndustryItem'
                    }
                  ],
                  __typename: 'TalentPitchIndustryItemConnection'
                },
                highlights: {
                  nodes: [
                    {
                      title:
                        'User Experience and Interface Designer at Freelance',
                      years: ['2015', 'PRESENT'],
                      additionalText: [
                        'Led the design efforts including user experience, interface design, and product strategy for startups and established companies.'
                      ],
                      companyName: 'Exploros',
                      roleName: 'VP of Engineering',
                      __typename: 'TalentPitchDefaultHighlightItem'
                    },
                    {
                      title:
                        'User Experience and Interface Designer at Kitchen United',
                      years: ['2020', '2021'],
                      additionalText: [
                        "Performed UX audit, identifying usability issues that inhibit clarity and one's ability to perform fundamental tasks."
                      ],
                      companyName: 'Kraken',
                      roleName: 'Managing Director',
                      __typename: 'TalentPitchDefaultHighlightItem'
                    }
                  ],
                  __typename: 'TalentPitchHighlightItemConnection'
                },
                designPortfolioItems: {
                  nodes: [
                    {
                      directUrl: 'https://portfolio-url-1',
                      coverThumbImageUrlWithFallback:
                        'https://thumb-image-url-1',
                      title:
                        'JobPros - A Community Platform for Beauty Professionals',
                      __typename: 'TalentPitchDesignPortfolioItem'
                    },
                    {
                      directUrl: 'https://portfolio-url-2',
                      coverThumbImageUrlWithFallback:
                        'https://thumb-image-url-2',
                      title: 'Celia - Personal finances iOS App',
                      __typename: 'TalentPitchDesignPortfolioItem'
                    }
                  ],
                  __typename: 'TalentPitchDesignPortfolioItemConnection'
                }
              },
        __typename: 'JobApplication'
      } as JobApplicationTalentCardFragment
    }
  }
})
