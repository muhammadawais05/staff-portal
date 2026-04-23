import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'
import getEngagementIdsFromJobs from './get-engagement-ids-from-jobs'

const jobs = [
  {
    engagements: {
      nodes: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }]
    }
  },
  {
    engagements: {
      nodes: [{ id: 'id4' }, { id: 'id5' }]
    }
  },
  {}
] as ClientJobFragment[]

const expectedResult = ['id1', 'id2', 'id3', 'id4', 'id5']

describe('Get engagements ids from jobs', () => {
  it('return engagement ids', () => {
    const result = getEngagementIdsFromJobs(jobs)

    expect(result).toEqual(expectedResult)
  })
})
