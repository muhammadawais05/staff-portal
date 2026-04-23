import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'
import { Maybe } from '@toptal/picasso/utils'

import { LABEL_COLUMN_WIDTH } from '../../../../utils/constants'
import OpportunityTeamContent from '../OpportunityTeamContent'
import { OpportunityTeamFragment } from '../../data'

interface Props {
  loading: boolean
  initialLoading: boolean
  opportunity: Maybe<OpportunityTeamFragment>
}

const OpportunityTeamSection = ({
  loading,
  initialLoading,
  opportunity
}: Props) => {
  return (
    <Container top='medium'>
      <Section variant='withHeaderBar' title='Internal Team'>
        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={
            <DetailedListSkeleton
              labelColumnWidth={LABEL_COLUMN_WIDTH}
              columns={2}
              items={6}
            />
          }
        >
          {opportunity && <OpportunityTeamContent opportunity={opportunity} />}
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default OpportunityTeamSection
