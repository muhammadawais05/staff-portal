import { useModelDescriptionsQuery } from '@staff-portal/chronicles'
import { useGetNode } from '@staff-portal/data-layer-service'
import { Maybe } from '@staff-portal/graphql/staff'

import { GetPerformedActionEntityDataDocument } from '../../data/get-performed-action-entity-data'

type EntityModelDescriptionReference =
  | {
      text: string
      path: string
    }
  | undefined

const useGetPerformedActionEntityData = ({
  entityId,
  entityGid
}: {
  entityId: string
  entityGid?: Maybe<string>
}) => {
  const { data: entityData, loading: entityDataLoading } = useGetNode(
    GetPerformedActionEntityDataDocument
  )(
    {
      entityId
    },
    {
      throwOnError: true
    }
  )

  const { data: modelDescription, loading: modelDescriptionLoading } =
    useModelDescriptionsQuery(entityGid ? [entityGid] : [])

  const entityModelDescriptionReference = modelDescription?.[0]
    ?.reference as EntityModelDescriptionReference

  const loading = entityDataLoading || modelDescriptionLoading

  return {
    loading,
    viewerCanViewHistory: entityData?.viewerCanViewHistory,
    entityData: entityModelDescriptionReference
      ? {
          text: entityModelDescriptionReference?.text,
          url: entityModelDescriptionReference?.path
        }
      : undefined
  }
}

export default useGetPerformedActionEntityData
