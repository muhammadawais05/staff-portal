import React from 'react'
import { RepresentativeFragment } from '@staff-portal/client-representatives'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { ContainerLoader } from '@staff-portal/ui'

import { LinkOpportunityButton } from '../LinkOpportunityButton'
import OpportunitiesContent from '../OpportunitiesContent/OpportunitiesContent'

interface Props {
  representative?: RepresentativeFragment
  loading: boolean
  initialLoading: boolean
}

export const OpportunitiesSection = ({
  initialLoading,
  loading,
  representative
}: Props) => (
  <Section
    title='Opportunities'
    variant='withHeaderBar'
    actions={
      representative && (
        <LinkOpportunityButton
          representativeId={representative.id}
          operation={
            representative.operations?.linkOpportunityCompanyRepresentative
          }
        />
      )
    }
  >
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<SkeletonLoader.Typography />}
    >
      <OpportunitiesContent representative={representative} />
    </ContainerLoader>
  </Section>
)
