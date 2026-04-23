import { GET_INFRACTION_ASSIGNEES } from './get-infraction-assignees.staff.gql'

export const createGetTalentInfractionAssigneesMock = (
  assignees: {
    id: string
    fullName: string
  }[] = []
) => ({
  request: {
    query: GET_INFRACTION_ASSIGNEES
  },
  result: {
    data: {
      roles: {
        nodes: [
          {
            id: 'assignee-id',
            fullName: 'Staff user #2',
            __typename: 'Staff'
          },
          ...assignees.map(({ id, fullName }) => ({
            id,
            fullName,
            __typename: 'Staff'
          }))
        ],
        __typename: 'StaffConnection'
      }
    }
  }
})
