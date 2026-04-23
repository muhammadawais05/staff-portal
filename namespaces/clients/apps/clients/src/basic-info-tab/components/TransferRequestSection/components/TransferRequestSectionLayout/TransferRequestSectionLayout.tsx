import React, { ReactNode } from 'react'
import { Section, Container } from '@toptal/picasso'
import { DetailedListSkeleton, ContainerLoader } from '@staff-portal/ui'

import TransferRequestActions from '../TransferRequestActions'
import { ClientTransferRoleRequestFragment } from '../../data'
import { getTransferRequestHeader } from '../../utils'

type Props = {
  children?: ReactNode
  loading?: boolean
  initialLoading?: boolean
  transferRequest?: ClientTransferRoleRequestFragment
  companyId?: string
}

const TransferRequestSectionLayout = ({
  children,
  loading = false,
  initialLoading = false,
  transferRequest,
  companyId
}: Props) => {
  const { relationship } = transferRequest || {}
  const title = relationship ? getTransferRequestHeader(relationship) : null

  return (
    <Container top='medium' data-testid='TransferRequestSection'>
      <Section
        variant='withHeaderBar'
        title={title}
        actions={
          <TransferRequestActions
            transferRequest={transferRequest}
            companyId={companyId}
            isLoading={loading || initialLoading}
          />
        }
      >
        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={
            <DetailedListSkeleton
              data-testid='TransferRequestListSkeleton'
              columns={2}
              labelColumnWidth={10}
              items={3}
            />
          }
        >
          {children}
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default TransferRequestSectionLayout
