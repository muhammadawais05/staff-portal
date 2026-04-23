import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetCommitmentSettingsApplicableDocument } from './get-commitment-settings-applicable.staff.gql.types'

export default gql`
  query GetCommitmentSettingsApplicable($verticalId: ID!) {
    node(id: $verticalId) {
      ... on Vertical {
        id
        commitmentSettingsApplicable
      }
    }
  }
`

export const useGetCommitmentSettingsApplicable = (
  verticalId?: string | null,
  skip?: boolean
) => {
  const { data, ...restOptions } = useGetNode(
    GetCommitmentSettingsApplicableDocument
  )(
    { verticalId: verticalId as string },
    { skip: !verticalId || skip, fetchPolicy: 'cache-first' }
  )

  return {
    ...restOptions,
    commitmentSettingsApplicable: !!data?.commitmentSettingsApplicable
  }
}
