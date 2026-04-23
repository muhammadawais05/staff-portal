import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { compareAlphabetically } from '@staff-portal/string'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { GetMatchersForVerticalDocument } from '../data/get-matchers-for-vertical.staff.gql.types'

export const getClientMatchersForVerticalHook =
  (vertical: Partial<UserVerticalFragment>) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetMatchersForVerticalDocument,
      {
        variables: { verticalId: vertical?.id || '' }
      }
    )

    const nodes = data?.node?.clientMatchers.nodes
    const options = useMemo(
      () =>
        nodes
          ?.map(({ id, fullName }) => ({
            text: `${fullName} (${vertical?.name} Matchers)`,
            value: id
          }))
          .sort((first, second) =>
            compareAlphabetically(first.text, second.text)
          ),
      [nodes]
    )

    return {
      request,
      loading,
      error,
      data: options,
      called
    }
  }
