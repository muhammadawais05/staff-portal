import React, { memo, useCallback } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { REFRESH_SYSTEM_INFORMATION } from '@staff-portal/clients'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import { GetSystemInformationDocument } from './data'
import {
  SystemInformationContent,
  SystemInformationSkeleton
} from './components'

interface Props {
  companyId: string
}

const SystemInformation = memo(({ companyId }: Props) => {
  const {
    data: systemInformation,
    loading,
    initialLoading,
    refetch
  } = useGetNode(GetSystemInformationDocument)({
    clientId: companyId
  })

  useMessageListener(
    REFRESH_SYSTEM_INFORMATION,
    useCallback(
      ({ companyId: id }) => id === companyId && refetch(),
      [companyId, refetch]
    )
  )
  useMessageListener(ROLE_FLAGS_UPDATED, refetch)

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<SystemInformationSkeleton />}
      >
        {systemInformation && (
          <SystemInformationContent systemInformation={systemInformation} />
        )}
      </ContainerLoader>
    </Container>
  )
})

export default SystemInformation
