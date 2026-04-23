import React, { ComponentProps } from 'react'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'

import * as S from './styles'

type Props = {
  bottom?: ComponentProps<typeof Container>['bottom']
  labelColumnWidth?: ComponentProps<
    typeof DetailedListSkeleton
  >['labelColumnWidth']
}

const JobFeedbacksSkeletonLoader = ({ bottom, labelColumnWidth }: Props) => {
  return (
    <Container top='medium'>
      <Section
        css={S.section}
        variant='withHeaderBar'
        title={<SkeletonLoader.Header />}
      >
        <Container bottom={bottom} data-testid='JobFeedbacksSkeletonLoader'>
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

          <DetailedListSkeleton labelColumnWidth={labelColumnWidth} items={6} />
        </Container>
      </Section>
    </Container>
  )
}

export default JobFeedbacksSkeletonLoader
