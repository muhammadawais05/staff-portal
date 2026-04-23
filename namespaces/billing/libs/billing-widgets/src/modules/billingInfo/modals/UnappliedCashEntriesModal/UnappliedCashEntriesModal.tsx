import React from 'react'
import { Container, EmptyState, Typography, Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useGetUnappliedCashEntriesQuery } from './data'
import UnappliedCashEntriesTable from './components/UnappliedCashEntriesTable'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const UnappliedCashEntriesModal = ({ options: { nodeId } }: Props) => {
  const { t: translate } = useTranslation('billingBasicInfo')
  const clientId = encodeId({ id: nodeId, type: 'client' })

  const { loading, data, initialLoading } = useGetUnappliedCashEntriesQuery({
    variables: { clientId }
  })

  const name = data?.node?.fullName
  const nodes = data?.node?.unappliedCashEntries?.nodes ?? []

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('unappliedCashModal.title')} />
      }
    >
      <Modal.Title data-testid='title'>
        {translate('unappliedCashModal.title')}
      </Modal.Title>
      <Modal.Content>
        {nodes.length > 0 ? (
          <>
            <Container bottom='large'>
              <Typography data-testid='subtitle' size='medium'>
                {translate('unappliedCashModal.subtitle', { name })}
              </Typography>
            </Container>

            <UnappliedCashEntriesTable nodes={nodes} />
          </>
        ) : (
          <EmptyState.Collection data-testid='empty'>
            {translate('unappliedCashModal.table.empty')}
          </EmptyState.Collection>
        )}
        <Container top='medium'>
          <ModalFooter />
        </Container>
      </Modal.Content>
    </ContentLoader>
  )
}

export default UnappliedCashEntriesModal
