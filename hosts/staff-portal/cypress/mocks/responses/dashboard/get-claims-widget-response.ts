export const getClaimsWidgetResponse = () => ({
  data: {
    widgets: {
      claims: {
        allClaimedTalentUrl:
          'https://staging.toptal.net/platform/staff/applicants/talents?claimer_id=100010',
        nodes: [
          {
            talent: {
              id: 'VjEtVGFsZW50LTMxNjAzOTI',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/talents/3160392',
                text: 'TALENT Developer 3160392',
                __typename: 'Link'
              },
              __typename: 'Talent'
            },
            roleStepsTitle: 'Online Test Core',
            roleStepsCount: 1,
            createdAt: '2022-01-21T10:22:58+03:00',
            __typename: 'ClaimsWidgetItem'
          }
        ],
        __typename: 'ClaimsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
