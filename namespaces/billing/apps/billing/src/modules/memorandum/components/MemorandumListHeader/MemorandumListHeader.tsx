import React from 'react'
import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { useGetMemorandumListHeaderQuery } from '../../data'

const displayName = 'MemorandumListHeader'

const MemorandumListHeader = () => {
  const { t: translate } = useTranslation('memorandumList')
  const { handleOnOpenModal } = useModals()

  const handleOnAddClick = () => handleOnOpenModal(ModalKey.memorandumAdd)

  const {
    data: operations,
    loading,
    initialLoading
  } = useGetData(useGetMemorandumListHeaderQuery, 'operations')(
    {},
    {
      abortKey: displayName
    }
  )

  return (
    <ContentLoader
      as='span'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<InlineActionsSkeleton numberOfButtons={1} />}
    >
      <OperationWrapper operation={operations?.addRoleMemorandum}>
        <Button
          data-testid={`${displayName}-add-button`}
          onClick={handleOnAddClick}
          size='small'
        >
          {translate('header.actions.addMemorandum')}
        </Button>
      </OperationWrapper>
    </ContentLoader>
  )
}

MemorandumListHeader.displayName = displayName

export default MemorandumListHeader
