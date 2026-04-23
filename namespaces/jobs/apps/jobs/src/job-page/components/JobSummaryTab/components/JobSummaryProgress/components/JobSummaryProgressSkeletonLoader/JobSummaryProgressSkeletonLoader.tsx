import React from 'react'
import { Section, SkeletonLoader, Container } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'

import * as S from './styles'
import { LABEL_COLUMN_WIDTH } from '../../../../../../config'

const SummaryTabSkeletonLoader = () => (
  <Section variant='withHeaderBar' title='Progress'>
    <Container flex justifyContent='space-between' bottom='small'>
      <Container right='xlarge' css={S.smallSkeletonRow}>
        <SkeletonLoader.Typography />
      </Container>
      <Container css={S.smallSkeletonRow}>
        <SkeletonLoader.Typography />
      </Container>
    </Container>
    <Container bottom='small'>
      <SkeletonLoader.Typography />
    </Container>
    <Container bottom='xsmall' css={S.smallSkeletonRow}>
      <SkeletonLoader.Typography />
    </Container>

    <DetailedListSkeleton
      items={2}
      columns={1}
      labelColumnWidth={LABEL_COLUMN_WIDTH}
    />
  </Section>
)

export default SummaryTabSkeletonLoader
