import React from 'react'
import { SkeletonLoader, Container } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { StaffCommissionWidget } from '@staff-portal/billing-widgets'

import * as S from './styles'
import { useGetTalentJobCommissionsPermissions } from './data/get-talent-job-commissions-permissions.staff.gql'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentCommissionsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { data, loading } = useGetTalentJobCommissionsPermissions()

  if (loading && !data) {
    return (
      <Section
        variant={sectionVariant}
        title='Commissions'
        data-testid='skeleton-loader'
      >
        <SkeletonLoader.Header />
        <SkeletonLoader.Typography rows={4} />
      </Section>
    )
  }

  if (!data?.viewer.permits.canViewJobCommissions) {
    return null
  }

  return (
    <Container
      data-testid='talent-commissions-section'
      css={S.commissionsWidgetSection}
    >
      <StaffCommissionWidget nodeId={talentId} isActionsHidden />
    </Container>
  )
}

export default TalentCommissionsSection
