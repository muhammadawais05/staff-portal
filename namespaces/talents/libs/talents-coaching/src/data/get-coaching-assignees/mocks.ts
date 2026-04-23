import { GET_COACHING_ASSIGNEES } from './get-coaching-assignees.staff.gql'

export const createGetCoachingAssignees = () => ({
  request: {
    query: GET_COACHING_ASSIGNEES
  },
  result: {
    data: {
      roles: {
        nodes: [
          {
            id: 'VjEtU3RhZmYtMjU3NzQzNw',
            fullName: 'Aylen Gomez Ovejero'
          },
          {
            id: 'VjEtU3RhZmYtMjQ5MDcwMA',
            fullName: 'Charline Feil'
          }
        ],
        __typename: 'StaffConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createEmptyGetCoachingAssignees = () => ({
  request: {
    query: GET_COACHING_ASSIGNEES
  },
  result: {
    data: {
      roles: {
        nodes: [],
        __typename: 'StaffConnection'
      },
      __typename: 'Query'
    }
  }
})
