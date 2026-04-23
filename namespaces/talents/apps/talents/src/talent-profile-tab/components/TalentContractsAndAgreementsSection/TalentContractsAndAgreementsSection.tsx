import React, { memo, useCallback } from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import Section, { SectionProps } from '@toptal/picasso/Section'
import {
  useMessageEmitter,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'

import {
  useGetTalentContracts,
  TalentContractFragment,
  TalentAgreementFragment,
  GetTalentContractsQuery
} from './data/get-talent-contracts'
import * as S from './styles'
import TalentContractItem from '../TalentContractItem'
import TalentAgreementItem from '../TalentAgreementItem'

type Contract = TalentContractFragment & { legacy?: boolean | null }
type Agreement = TalentAgreementFragment

const splitContracts = (data?: GetTalentContractsQuery) => {
  const items = data?.node?.contractsAndAgreements?.edges || []

  if (!items.length) {
    return
  }

  const contracts = items
    .filter(item => {
      const node = item.node as TalentContractFragment

      return !!node.contractStatus
    })
    .map(
      contract => ({ legacy: contract.legacy, ...contract.node } as Contract)
    )

  const agreements = items
    .filter(item => {
      const node = item.node as TalentAgreementFragment

      return !!node.agreementStatus
    })
    .map(agreement => ({ ...agreement.node } as Agreement))

  return { contracts, agreements }
}

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentContractsAndAgreementsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const { data, loading, refetch } = useGetTalentContracts(talentId, {
    onError: () => {
      showError('Failed to fetch talent contracts and agreements.')
    }
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  const refetchTalentContracts = useCallback(() => refetch(), [refetch])

  const handleMutationSuccess = () => {
    emitMessage(TALENT_UPDATED, { talentId })
    refetchTalentContracts()
  }
  const title = 'Contracts and Agreements'

  if (loading) {
    return (
      <Section title={title} variant={sectionVariant}>
        <div data-testid='skeleton-loader'>
          <Grid spacing={8}>
            {[...new Array(2)].map((_, index) => (
              // TODO: replaced by a reusable Component
              // Skeleton loader, no unique id
              // eslint-disable-next-line react/no-array-index-key
              <Grid.Item key={index} small={12}>
                <SkeletonLoader.Header />
                <SkeletonLoader.Typography rows={4} />
              </Grid.Item>
            ))}
          </Grid>
        </div>
      </Section>
    )
  }

  const contractList = splitContracts(data)

  if (!contractList) {
    return null
  }

  const { contracts, agreements } = contractList

  return (
    <Section
      title={title}
      variant={sectionVariant}
      data-testid='talent-contracts-and-agreements-section'
    >
      {agreements.map(agreement => {
        return (
          <Container key={agreement.id} bottom='medium' css={S.itemWrapper}>
            <TalentAgreementItem agreement={agreement} />
          </Container>
        )
      })}
      {contracts.map(contract => {
        return (
          <Container key={contract.id} bottom='medium' css={S.itemWrapper}>
            <TalentContractItem
              contract={contract}
              onMutationSuccess={handleMutationSuccess}
            />
          </Container>
        )
      })}
    </Section>
  )
}

export default memo(TalentContractsAndAgreementsSection)
