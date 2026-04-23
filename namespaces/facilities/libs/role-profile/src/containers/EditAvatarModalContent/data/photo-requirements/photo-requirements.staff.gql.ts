import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query PhotoRequirements($roleType: RoleType!) {
    photoRequirements(filter: { roleType: $roleType }) {
      filetypes
      minDimension {
        height
        width
      }
      sizeLimitMB
    }
  }
`
