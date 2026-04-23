export const getTalentJobCommissionsPermissionsResponse = () => ({
  data: {
    viewer: {
      permits: {
        canViewJobCommissions: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
