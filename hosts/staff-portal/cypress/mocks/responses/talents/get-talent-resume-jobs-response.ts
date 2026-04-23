import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentResumeJobsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      resumeJobs: {
        nodes: [],
        __typename: 'TalentResumeJobConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
