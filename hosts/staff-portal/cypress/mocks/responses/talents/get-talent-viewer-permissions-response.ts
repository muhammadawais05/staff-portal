export const getTalentViewerPermissionsResponse = () => ({
  data: {
    viewer: {
      permits: {
        canViewJob: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
