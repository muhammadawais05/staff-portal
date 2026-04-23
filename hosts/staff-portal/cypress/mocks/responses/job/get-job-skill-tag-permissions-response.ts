export const getJobSkillTagPermissionsResponse = () => ({
  data: {
    viewer: {
      permits: {
        canViewTalent: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
