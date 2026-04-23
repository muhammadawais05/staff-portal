import { JobCommitment, FieldCheckResult } from '@staff-portal/graphql/staff'

export const jobLevelQueryResponse = {
  loading: false,
  data: {
    id: 'some-id',
    jobType: 'designer',
    title: 'Awesome designer',
    categories: {
      nodes: [
        {
          id: 'category-id',
          name: 'Developer'
        }
      ]
    },
    talentCount: 1,
    maxHourlyRate: 100,
    commitment: JobCommitment.FULL_TIME,
    estimatedLength: 'LENGTH_UNKNOWN',
    startDate: '2021-12-19',
    hasPreferredHours: true,
    hoursOverlapPreference: 'NO_PREFERENCE',
    fieldCheck: {
      id: 'some-id',
      commitment: FieldCheckResult.COMPLETE,
      companyTimeZone: FieldCheckResult.COMPLETE,
      estimatedLength: FieldCheckResult.COMPLETE,
      hasPreferredHours: FieldCheckResult.COMPLETE,
      hoursOverlap: FieldCheckResult.COMPLETE,
      jobType: FieldCheckResult.COMPLETE,
      maxHourlyRate: FieldCheckResult.COMPLETE,
      projectSpecCompleteness: FieldCheckResult.COMPLETE,
      projectType: FieldCheckResult.COMPLETE,
      startDate: FieldCheckResult.COMPLETE,
      talentCount: FieldCheckResult.COMPLETE,
      title: FieldCheckResult.COMPLETE
    }
  }
}
