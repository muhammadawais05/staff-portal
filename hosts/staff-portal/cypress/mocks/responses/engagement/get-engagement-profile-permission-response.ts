export const getEngagementProfilePermissionResponse = () => ({
  data: {
    viewer: {
      permits: {
        canViewEngagements: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
