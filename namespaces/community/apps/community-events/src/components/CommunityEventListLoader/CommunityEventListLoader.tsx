import React from 'react'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  itemsCount?: number
}

const CommunityEventListLoader = ({ itemsCount = 3 }: Props) => {
  return (
    <>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <Section
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          variant='withHeaderBar'
          data-testid='community-event-list-loader'
          title={<SkeletonLoader.Typography />}
          css={S.section}
        >
          <Container flex gap={1.5}>
            <Container>
              <SkeletonLoader.Media size='small' />
            </Container>
            <Container
              flex
              direction='column'
              gap={1}
              css={S.typographyContainer}
            >
              <SkeletonLoader.Typography rows={6} />
            </Container>
          </Container>
        </Section>
      ))}
    </>
  )
}

export default CommunityEventListLoader
