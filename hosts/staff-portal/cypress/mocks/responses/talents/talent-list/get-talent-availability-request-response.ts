export const getTalentAvailabilityRequestResponse = (
  jobId?: string,
  talentId?: string
) => ({
  data: {
    node: {
      id: talentId ?? 'VjEtVGFsZW50LTIxOTU0ODA',
      type: 'ProjectManager',
      jobAvailabilityRequests: {
        edges: [
          {
            job: {
              id: jobId ?? 'VjEtSm9iLTI4MDgxNA',
              title: 'Senior Digital Imaging Project Manager (280814)',
              __typename: 'Job'
            },
            restrictionWarning: null,
            availabilityRequest: null,
            __typename: 'JobAvailabilityRequestEdge'
          }
        ],
        __typename: 'JobAvailabilityRequestConnection'
      },
      __typename: 'Talent'
    }
  }
})
