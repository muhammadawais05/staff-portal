import React from 'react'
import { ErrorView, ErrorType } from '@staff-portal/error-handling'
import { Container } from '@toptal/picasso'

import {
  PerformedActionsContentWrapper,
  PerformedActionsList
} from '../../components'
import { PerformedActionEntityData } from './types'
import {
  useGetEntitySearchData,
  useGetEntityTitle,
  useGetPerformedActionEntityData
} from './hooks'

export type Props = PerformedActionEntityData & {
  decodedEntityId: string
  entityId: string
}

const EntityPerformedActionsList = ({
  decodedEntityId,
  entityId,
  entityType,
  useGetSearchData = useGetEntitySearchData,
  useGetFilters
}: Props) => {
  const entitySearchData = useGetSearchData({
    entityType,
    entityId,
    decodedEntityId
  })
  const { viewerCanViewHistory, entityData, loading } =
    useGetPerformedActionEntityData({
      entityId,
      entityGid: entitySearchData?.entityGid
    })

  const { browserTitle, title } = useGetEntityTitle({
    entityLink: {
      url: entityData?.url,
      text: entityData?.text
    },
    loading
  })

  const filtersData = useGetFilters?.()

  if (!loading && (!entityData || !entitySearchData)) {
    return <ErrorView errorType={ErrorType.APPLICATION} />
  }

  if (!loading && !viewerCanViewHistory) {
    return <ErrorView errorType={ErrorType.FORBIDDEN} />
  }

  return (
    <PerformedActionsContentWrapper
      loading={loading}
      browserTitle={browserTitle}
      title={title}
    >
      {filtersData?.component && (
        <Container bottom='medium'>{filtersData.component}</Container>
      )}

      {entitySearchData?.searchVariables && (
        <PerformedActionsList
          {...filtersData?.searchVariables}
          feeds={[
            ...(entitySearchData.searchVariables.feeds ?? []),
            ...(filtersData?.searchVariables.feeds ?? [])
          ]}
        />
      )}
    </PerformedActionsContentWrapper>
  )
}

export default EntityPerformedActionsList
