import React from 'react'
import { OperationFragment } from '@staff-portal/operations'
import { useGetUserVerticals } from '@staff-portal/verticals'

import { InternalTeamFragment } from '../../../data'
import { MatcherField } from '../components'

interface Props {
  clientId: string
  operation: OperationFragment
  value: InternalTeamFragment['matchers']
}

export const useGetClientMatcherFields = ({
  clientId,
  operation,
  value
}: Props) => {
  const { data } = useGetUserVerticals()

  return (data || []).map(vertical => [
    [
      `${vertical.name} matcher`,
      <MatcherField
        clientId={clientId}
        vertical={vertical}
        value={value?.edges.find(
          matcher => matcher.node.vertical.talentType === vertical.talentType
        )}
        operation={operation}
      />
    ]
  ])
}
