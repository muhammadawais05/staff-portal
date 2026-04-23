export const getJobCandidatesResponse = (
  jobId?: string,
  candidateId?: string
) => ({
  data: {
    node: {
      id: jobId ?? 'VjEtSm9iLTI4MDgyMA',
      candidates: {
        edges: [
          {
            node: {
              id: candidateId ?? 'VjEtVGFsZW50LTMwNDcxOTI',
              __typename: 'Talent'
            },
            previousInterviewsResult: null,
            interestStatus: null,
            notInterestedReason: null,
            jobIssues: {
              status: 'OK',
              failedMetrics: [],
              __typename: 'TalentJobEdgeJobIssues'
            },
            jobScore: null,
            defaultClientRates: {
              hourlyRate: '97',
              weeklyRatePartTime: '1843.0',
              weeklyRateFullTime: '3492.0',
              __typename: 'DefaultClientRates'
            },
            jobApplicationStatus: null,
            operations: {
              createTalentAvailabilityRequest: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'TalentJobEdgeOperations'
            },
            __typename: 'TalentJobEdge'
          }
        ],
        totalCount: 1,
        __typename: 'JobTalentsEdgedConnection'
      },
      __typename: 'Job'
    }
  }
})
