import React, { memo } from 'react'
import { Section, Container } from '@toptal/picasso'

import { useGetTalentHealthStatusWithHistory } from '../../data'
import HealthStatusContent from '../HealthStatusContent'
import HealthStatusSkeleton from '../HealthStatusSkeleton'
import * as S from './styles'

export interface Props {
  talentId: string
}

const HealthStatus = ({ talentId }: Props) => {
  const { data, error, networkLoading } =
    useGetTalentHealthStatusWithHistory(talentId)

  const currentHealthStatus = data?.currentHealthStatus?.healthStatus
  const healthStatusHistory = data?.healthStatusHistory?.nodes ?? []

  if (error) {
    throw error
  }

  return (
    <Container bottom='medium' css={S.withBottomBorder}>
      <Section variant='withHeaderBar' title='History & Health Status'>
        {networkLoading ? (
          <HealthStatusSkeleton />
        ) : (
          <HealthStatusContent
            currentHealthStatus={currentHealthStatus}
            healthStatusHistory={healthStatusHistory}
            talentId={talentId}
            setHealthStatusTalent={data?.operations.setHealthStatusTalent}
          />
        )}
      </Section>
    </Container>
  )
}

export default memo(HealthStatus)
