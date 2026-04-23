import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import CommitmentChangeModalContent from '../CommitmentChangeModalContent'
import { useGetCommitmentChangeData } from '../../data/use-get-commitment-change-data'

const displayName = 'CommitmentChangeModal'

interface Props {
  options: Required<ModalData>
}

export const CommitmentChangeModal: FC<Props> = memo(
  ({ options: { engagementId } }) => {
    const { t: translate } = useTranslation(['commitment', 'common'])

    const {
      loading,
      initialLoading,
      changeEngagementCommitmentOperation,
      ...rest
    } = useGetCommitmentChangeData(engagementId)

    return (
      <ContentLoader
        isModalContainer={isCallableEnabled(
          changeEngagementCommitmentOperation?.callable
        )}
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton title={translate('commitment:changeModal.title')} />
        }
      >
        <CommitmentChangeModalContent
          engagementId={engagementId}
          changeEngagementCommitmentOperation={
            changeEngagementCommitmentOperation
          }
          {...rest}
        />
      </ContentLoader>
    )
  }
)

CommitmentChangeModal.displayName = displayName

export default CommitmentChangeModal
