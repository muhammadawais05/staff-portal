import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

import { GetCommitmentHoursOptionsDocument } from './get-commitment-hours-options.staff.gql.types'

export default gql`
  query GetCommitmentHoursOptions {
    commitmentSettingsHoursOptions
  }
`

export const useGetCommitmentHoursOptions = (skip?: boolean) => {
  const { data, ...restOptions } = useQuery(GetCommitmentHoursOptionsDocument, {
    skip,
    fetchPolicy: 'cache-first'
  })

  return {
    ...restOptions,
    commitmentHoursOptions: useMemo(
      () =>
        data?.commitmentSettingsHoursOptions.map(commitmentHoursOption => ({
          text: commitmentHoursOption.toString(),
          value: commitmentHoursOption
        })) || [],
      [data?.commitmentSettingsHoursOptions]
    )
  }
}
