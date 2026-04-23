import { GET_POSSIBLE_SOURCERS } from './get-possible-sourcers.staff.gql'

export const defaultPossibleTalentSourcers = [
  {
    id: 'VjEtU3RhZmYtMzAxNjUw',
    fullName: 'Dzenana Preljevic-Sadovic',
    __typename: 'Staff'
  },
  {
    id: 'VjEtU3RhZmYtMzk2NjEx',
    fullName: 'Stefan de Leng',
    __typename: 'Staff'
  },
  {
    id: 'VjEtU3RhZmYtMzk5MTYz',
    fullName: 'Eugenia Zapata',
    __typename: 'Staff'
  }
]

export const getPossibleSourcersMock = ({
  talentId,
  possibleSourcers = defaultPossibleTalentSourcers
}: {
  talentId: string
  possibleSourcers?: {
    id: string
    fullName: string
    __typename: string
  }[]
}) => ({
  request: { query: GET_POSSIBLE_SOURCERS, variables: { talentId } },
  result: {
    data: {
      node: {
        __typename: 'Talent',
        id: 'VjEtVGFsZW50LTExNTQ5Mw',
        sourcers: {
          nodes: possibleSourcers,
          __typename: 'StaffConnection'
        }
      }
    }
  }
})
