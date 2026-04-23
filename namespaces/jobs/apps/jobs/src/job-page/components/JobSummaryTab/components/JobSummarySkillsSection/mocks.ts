import { FieldCheckResult } from '@staff-portal/graphql/staff'

export const jobLevelQueryResponse = {
  loading: false,
  data: {
    id: 'some-id',
    description: 'Some description',
    fieldCheck: {
      id: 'some-id',
      skills: FieldCheckResult.COMPLETE
    },
    skillSets: {
      nodes: [
        {
          id: 'some-id',
          rating: 44,
          connections: {
            totalCount: 10
          },
          skill: {
            id: 'some-id',
            name: 'React',
            category: {
              id: 'somme-id',
              title: 'programing',
              position: 'Junior'
            }
          },
          main: 'React',
          niceToHave: 'Typescript'
        }
      ]
    },
    industries: {
      nodes: [
        {
          id: 'some-idd',
          name: 'IT'
        }
      ]
    }
  }
}
