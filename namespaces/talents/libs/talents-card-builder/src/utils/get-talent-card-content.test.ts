import { getTalentCardContent } from './get-talent-card-content'

describe('getTalentCardContent', () => {
  it('returns talent card content', () => {
    expect(
      getTalentCardContent({
        id: '1',
        fullName: 'Talent Name',
        type: 'Developer',
        profileV2: {
          id: '1',
          certifications: {
            nodes: [
              {
                id: '1',
                certificate: 'Certification',
                institution: 'Institution'
              }
            ]
          },
          educations: {
            nodes: [
              {
                id: '1',
                title: 'Education',
                degree: 'Degree',
                fieldOfStudy: 'Study',
                location: 'Sibiu',
                yearFrom: 2012,
                yearTo: 2016
              }
            ]
          },
          employments: {
            nodes: [
              {
                id: '1',
                position: 'Developer',
                company: 'Company',
                experienceItems: [],
                startDate: 2016,
                endDate: 2018
              }
            ]
          },
          industries: {
            nodes: [
              {
                id: '1',
                industry: { id: '1', name: 'Industry' },
                connections: { nodes: [] }
              }
            ]
          },
          portfolioItems: {
            nodes: [
              { id: '1', title: 'Portfolio 1', kind: 'basic' },
              { id: '2', title: 'Portfolio 2', kind: 'classic' }
            ]
          },
          skillSets: {
            nodes: [
              {
                id: '1',
                skill: { id: '1', name: 'Skill Name' },
                connections: { nodes: [] }
              }
            ]
          }
        },
        isMentor: true,
        resumePublications: {
          nodes: [
            {
              id: '1',
              title: 'Publication Title',
              url: 'publication-url',
              excerpt: ''
            }
          ]
        }
      })
    ).toStrictEqual({
      certifications: [
        {
          certificate: 'Certification',
          id: '1',
          institution: 'Institution'
        }
      ],
      educations: [
        {
          degree: 'Degree',
          fieldOfStudy: 'Study',
          id: '1',
          location: 'Sibiu',
          title: 'Education',
          yearFrom: 2012,
          yearTo: 2016
        }
      ],
      employments: [
        {
          company: 'Company',
          endDate: 2018,
          experienceItems: [],
          id: '1',
          position: 'Developer',
          startDate: 2016
        }
      ],
      experience: [
        {
          id: '1',
          kind: 'basic',
          title: 'Portfolio 1'
        }
      ],
      id: '1',
      industries: [
        {
          connections: {
            nodes: []
          },
          id: '1',
          industry: {
            id: '1',
            name: 'Industry'
          }
        }
      ],
      mentorship: true,
      portfolio: [
        {
          id: '2',
          kind: 'classic',
          title: 'Portfolio 2'
        }
      ],
      portfolioItems: {
        nodes: [
          {
            id: '1',
            kind: 'basic',
            title: 'Portfolio 1'
          },
          {
            id: '2',
            kind: 'classic',
            title: 'Portfolio 2'
          }
        ]
      },
      publications: [
        {
          id: '1',
          title: 'Publication Title',
          url: 'publication-url',
          excerpt: ''
        }
      ],
      skillSets: {
        nodes: [
          {
            connections: {
              nodes: []
            },
            id: '1',
            skill: {
              id: '1',
              name: 'Skill Name'
            }
          }
        ]
      },
      skills: [
        {
          connections: {
            nodes: []
          },
          id: '1',
          skill: {
            id: '1',
            name: 'Skill Name'
          }
        }
      ]
    })
  })
})
