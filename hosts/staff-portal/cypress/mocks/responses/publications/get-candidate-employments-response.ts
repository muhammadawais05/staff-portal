export const getCandidateEmploymentsResponse = () => ({
  data: {
    node: {
      id: 'VjEtVGFsZW50LTYyMDg3Nw',
      type: 'Designer',
      profile: {
        employments: {
          nodes: [
            {
              id: 'VjEtVGFsZW50RW1wbG95bWVudC0xMzUwNTg',
              company: 'Freelance',
              startYear: 2016,
              endYear: null,
              position: 'Lead User Experience Architect and Designer',
              experienceItems: [],
              skills: {
                nodes: [
                  {
                    name: 'CSS',
                    __typename: 'Skill'
                  }
                ],
                __typename: 'SkillConnection'
              },
              __typename: 'TalentEmployment'
            }
          ],
          __typename: 'TalentProfileEmploymentConnection'
        },
        portfolioItems: {
          nodes: [
            {
              id: 'VjEtVGFsZW50UG9ydGZvbGlvSXRlbS0xNzAyMjU',
              title: 'Designing a SaaS Cataract Surgery Platform for Alcon',
              link: '',
              position: 0,
              description: 'Description',
              skills: {
                nodes: [
                  {
                    name: 'Ruby',
                    __typename: 'Skill'
                  }
                ],
                __typename: 'SkillConnection'
              },
              __typename: 'TalentPortfolioItem'
            }
          ],
          __typename: 'TalentPortfolioItemConnection'
        },
        __typename: 'TalentProfile'
      },
      __typename: 'Talent'
    }
  }
})
