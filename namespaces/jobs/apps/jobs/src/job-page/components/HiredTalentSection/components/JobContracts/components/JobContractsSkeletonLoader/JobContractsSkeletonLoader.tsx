import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../constants'
import JobContractsLayout from '../JobContractsLayout'
import * as S from './styles'

const JobContractsSkeletonLoader = () => (
  <JobContractsLayout
    actions={
      <Container flex justifyContent='flex-end'>
        <SkeletonLoader.Button css={S.button} size='small' />
        <SkeletonLoader.Button css={S.button} size='small' />
        <SkeletonLoader.Button size='small' />
      </Container>
    }
  >
    <Container data-testid='JobContractsSkeletonLoader'>
      <Container
        flex
        top='small'
        bottom='small'
        alignItems='center'
        justifyContent='space-between'
      >
        <SkeletonLoader.Header />
        <SkeletonLoader.Button size='small' />
      </Container>

      <DetailedListSkeleton labelColumnWidth={LABEL_COLUMN_WIDTH} items={8} />
    </Container>
  </JobContractsLayout>
)

export default JobContractsSkeletonLoader
