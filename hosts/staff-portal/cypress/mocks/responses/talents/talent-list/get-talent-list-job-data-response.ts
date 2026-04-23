export const getTalentListJobDataResponse = (
  jobId?: string,
  clientId?: string
) => ({
  data: {
    node: {
      id: jobId ?? 'VjEtSm9iLTI4MDgyMA',
      webResource: {
        text: 'Senior  Developer (280820)',
        url: 'https://staging.toptal.net/platform/staff/jobs/280820',
        __typename: 'Link'
      },
      skillSets: {
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtMzUwMzA3MA',
            main: false,
            rating: 'COMPETENT',
            skill: {
              id: 'VjEtU2tpbGwtMzc2MTA',
              name: 'Automated Testing',
              __typename: 'Skill'
            },
            __typename: 'SkillSet'
          }
        ],
        __typename: 'SkillSetConnection'
      },
      client: {
        id: clientId ?? 'VjEtQ2xpZW50LTUyNDE1Nw',
        fullName: 'Mayer, Larson and Heathcote',
        __typename: 'Client'
      },
      __typename: 'Job'
    }
  }
})
