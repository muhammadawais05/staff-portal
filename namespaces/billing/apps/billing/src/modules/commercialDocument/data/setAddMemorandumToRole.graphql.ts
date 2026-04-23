import { gql } from '@apollo/client'

export default gql`
  mutation SetAddMemorandumToRole($input: AddMemorandumToRoleInput!) {
    addMemorandumToRole(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`
