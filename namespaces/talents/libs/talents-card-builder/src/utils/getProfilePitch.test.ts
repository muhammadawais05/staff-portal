import { Scalars } from '@staff-portal/graphql/staff'

import { getProfilePitch } from './getProfilePitch'
import getProfileSkillMock from '../mocks/get-profile-skill-mock/get-profile-skill-mock'
import getProfilePortfolioItemMock from '../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'
import getProfileCertificationMock from '../mocks/get-profile-certification-mock/get-profile-certification-mock'
import getProfilePublicationMock from '../mocks/get-profile-publication-mock/get-profile-publication-mock'

describe('getProfilePitch', () => {
  const profile = {
    id: '123',
    fullName: '',
    type: '',
    profileV2: {
      id: '123',
      certifications: {
        nodes: []
      },
      educations: {
        nodes: []
      },
      employments: {
        nodes: []
      },
      industries: {
        nodes: []
      },
      portfolioItems: {
        nodes: []
      },
      publications: {
        nodes: []
      },
      skillSets: {
        nodes: []
      }
    }
  }
  const talentPitch = {
    id: '123',
    createdAt: '2022-01-01T00:00:00Z' as Scalars['Time'],
    designPortfolioItems: {
      nodes: []
    },
    industryItems: {
      nodes: []
    },
    highlights: {
      nodes: []
    },
    skillItems: {
      nodes: []
    }
  }

  it('processes skills', () => {
    const result = getProfilePitch(
      {
        ...profile,
        profileV2: {
          ...profile.profileV2,
          skillSets: {
            nodes: [
              {
                ...getProfileSkillMock({
                  id: 'skill-2',
                  skill: {
                    name: 'Revenue & Expense Projections'
                  }
                }),
                connections: {
                  nodes: []
                }
              },
              {
                ...getProfileSkillMock({
                  id: 'skill-3',
                  skill: {
                    name: 'Financial Modeling'
                  }
                }),
                connections: {
                  nodes: []
                }
              },
              {
                ...getProfileSkillMock({
                  id: 'skill-1',
                  skill: {
                    name: 'Fundraising'
                  }
                }),
                connections: {
                  nodes: []
                }
              },
              {
                ...getProfileSkillMock({
                  id: 'skill-4',
                  skill: {
                    name: 'Missing skill'
                  }
                }),
                connections: {
                  nodes: []
                }
              }
            ]
          }
        }
      },
      {
        ...talentPitch,
        skillItems: {
          nodes: [
            { skillSet: getProfileSkillMock({ id: 'skill-1' }) },
            { skillSet: getProfileSkillMock({ id: 'skill-2' }) },
            { skillSet: getProfileSkillMock({ id: 'skill-3' }) }
          ]
        }
      }
    )

    expect(result?.skills).toEqual(['skill-1', 'skill-2', 'skill-3'])
  })

  describe('when talent profile skill sets are empty', () => {
    it('processes skills', () => {
      const result = getProfilePitch(
        {
          ...profile,
          profileV2: {
            ...profile.profileV2,
            skillSets: {
              nodes: []
            }
          }
        },
        {
          ...talentPitch,
          skillItems: {
            nodes: [
              { skillSet: getProfileSkillMock({ id: 'skill-1' }) },
              { skillSet: getProfileSkillMock({ id: 'skill-2' }) },
              { skillSet: getProfileSkillMock({ id: 'skill-3' }) }
            ]
          }
        }
      )

      expect(result?.skills).toEqual([])
    })
  })

  it('processes industries', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      industryItems: {
        nodes: [
          {
            industry: {
              id: 'industry-1',
              name: 'Plastic, Packaging & Containers'
            }
          },
          { industry: { id: 'industry-2', name: 'Healthcare Services' } },
          {
            industry: {
              id: 'industry-3',
              name: 'Oil & Gas Exploration & Services'
            }
          }
        ]
      }
    })

    expect(result?.industries).toEqual([
      'industry-1',
      'industry-2',
      'industry-3'
    ])
  })

  it('processes portfolio', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      designPortfolioItems: {
        nodes: [
          {
            portfolioItem: getProfilePortfolioItemMock({ id: 'item-1' })
          },
          {
            portfolioItem: getProfilePortfolioItemMock({ id: 'item-2' })
          }
        ]
      }
    })

    expect(result?.portfolio).toEqual(['item-1', 'item-2'])
  })

  it('processes certifications', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      highlights: {
        nodes: [
          {
            additionalText: [],
            certification: getProfileCertificationMock({ id: 'item-1' })
          },
          {
            additionalText: [],
            certification: getProfileCertificationMock({ id: 'item-2' })
          }
        ]
      }
    })

    expect(result?.items).toEqual([
      { type: 'certification', id: 'item-1' },
      { type: 'certification', id: 'item-2' }
    ])
  })

  it('processes publications', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      highlights: {
        nodes: [
          {
            additionalText: [],
            publication: getProfilePublicationMock({ id: 'item-1' })
          },
          {
            additionalText: [],
            publication: getProfilePublicationMock({ id: 'item-2' })
          }
        ]
      }
    })

    expect(result?.items).toEqual([
      {
        id: 'item-1',
        type: 'publication'
      },
      {
        id: 'item-2',
        type: 'publication'
      }
    ])
  })

  it('processes portfolio items', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      highlights: {
        nodes: [
          {
            additionalText: [],
            portfolioItem: getProfilePublicationMock({ id: 'item-1' })
          },
          {
            additionalText: [],
            portfolioItem: getProfilePublicationMock({ id: 'item-2' })
          }
        ]
      }
    })

    expect(result?.items).toEqual([
      {
        id: 'item-1',
        type: 'portfolio'
      },
      {
        id: 'item-2',
        type: 'portfolio'
      }
    ])
  })

  it('processes mentorship', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      highlights: {
        nodes: [
          {
            additionalText: [],
            mentorApplication: { id: 'item-1' }
          },
          {
            additionalText: [],
            mentorApplication: { id: 'item-2' }
          }
        ]
      }
    })

    expect(result?.items).toEqual([
      {
        id: 'item-1',
        type: 'mentorship'
      },
      {
        id: 'item-2',
        type: 'mentorship'
      }
    ])
  })

  it('processes employments', () => {
    const result = getProfilePitch(profile, {
      ...talentPitch,
      highlights: {
        nodes: [
          {
            additionalText: [],
            employment: { id: 'item-1' }
          },
          {
            additionalText: [
              'Employment description line 1',
              'Employment description line 2'
            ],
            employment: { id: 'item-2' }
          }
        ]
      }
    })

    expect(result?.items).toEqual([
      {
        id: 'item-2',
        type: 'employment',
        description_items: [
          'Employment description line 1',
          'Employment description line 2'
        ]
      }
    ])
  })
})
