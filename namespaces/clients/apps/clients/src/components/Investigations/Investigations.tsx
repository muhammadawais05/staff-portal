import React, { FC, memo, useCallback } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ContainerLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import {
  REFRESH_INVESTIGATIONS,
  UPDATE_INVESTIGATION
} from '@staff-portal/clients'

import { useGetInvestigations } from './data'
import InvestigationsContent from './components/InvestigationsContent'
import InvestigationsSkeleton from './components/InvestigationsSkeleton'

interface Props {
  companyId: string
}

const Investigations: FC<Props> = memo(({ companyId }) => {
  const { data, loading, initialLoading, refetch } =
    useGetInvestigations(companyId)
  const { investigations, operations } = data || {}
  const { totalCount = 0, nodes = [] } = investigations || {}

  useMessageListener(
    [REFRESH_INVESTIGATIONS, UPDATE_INVESTIGATION],
    useCallback(
      ({ companyId: id }) => id === companyId && refetch(),
      [companyId, refetch]
    )
  )

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<InvestigationsSkeleton />}
      >
        <InvestigationsContent
          operations={operations}
          totalCount={totalCount}
          investigations={nodes}
          companyId={companyId}
        />
      </ContainerLoader>
    </Container>
  )
})

export default Investigations
