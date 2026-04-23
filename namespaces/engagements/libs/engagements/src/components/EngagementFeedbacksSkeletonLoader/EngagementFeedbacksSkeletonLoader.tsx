import React, { ComponentProps } from 'react'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'
import { DetailedListSkeleton, SubSection } from '@staff-portal/ui'

import * as S from './styles'

type Props = {
  sectionVariant?: ComponentProps<typeof Section>['variant']
  bottom?: ComponentProps<typeof Container>['bottom']
  labelColumnWidth?: ComponentProps<
    typeof DetailedListSkeleton
  >['labelColumnWidth']
}

const EngagementFeedbacksSkeletonLoader = ({
  sectionVariant,
  bottom,
  labelColumnWidth
}: Props) => (
  <SubSection
    css={S.section}
    variant={sectionVariant}
    title={<SkeletonLoader.Header />}
  >
    <Container
      bottom={bottom}
      data-testid='engagement-feedbacks-skeleton-loader'
    >
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
  </SubSection>
)

export default EngagementFeedbacksSkeletonLoader
