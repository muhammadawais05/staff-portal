import React, { useCallback, useState } from 'react'
import { ContainerLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { CONTRACTS_UPDATED } from '@staff-portal/clients'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useGetContracts } from './data/get-contracts'
import { ContractsSectionContent, ContractSectionSkeleton } from './components'

export type Props = {
  companyId: string
}

const ContractsSection = ({ companyId }: Props) => {
  const [isSubsidiarySelected, setIsSubsidiarySelected] = useState(false)
  const { loading, company, refetch, initialLoading } = useGetContracts(
    companyId,
    isSubsidiarySelected
  )

  const refetchContracts = useCallback(() => refetch(), [refetch])

  useMessageListener(
    [CONTRACTS_UPDATED],
    ({ clientId }) => clientId === companyId && refetchContracts()
  )

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ContractSectionSkeleton />}
      >
        {company && (
          <ContractsSectionContent
            company={company}
            isSubsidiarySelected={isSubsidiarySelected}
            onSubsidiaryChange={setIsSubsidiarySelected}
            onMutationSuccess={refetchContracts}
          />
        )}
      </ContainerLoader>
    </Container>
  )
}

export default ContractsSection
