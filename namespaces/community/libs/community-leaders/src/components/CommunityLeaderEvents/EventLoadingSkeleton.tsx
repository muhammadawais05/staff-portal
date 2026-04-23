import React from 'react'
import { Typography, Container, Link, SkeletonLoader } from '@toptal/picasso'
import { Time16, VideoOn16 } from '@toptal/picasso/Icon'

import * as S from './styles'

export const EventLoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Container
          data-testid='event-loading'
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          css={S.eventContainer}
          flex
          bottom='small'
        >
          <Container
            flex
            direction='column'
            padded='medium'
            alignItems='center'
            justifyContent='center'
          >
            <Container css={S.timeSkeleton}>
              <SkeletonLoader.Typography />
            </Container>
            <Container css={S.timeSkeleton}>
              <SkeletonLoader.Typography />
            </Container>
            <Container css={S.timeSkeleton}>
              <SkeletonLoader.Typography />
            </Container>
          </Container>

          <div css={S.verticalSeparator} />

          <Container padded='medium' flex direction='column'>
            <Container flex justifyContent='space-between' bottom='xsmall'>
              <Container>
                <Typography size='medium' as='span'>
                  <Link href='#'>
                    <SkeletonLoader.Typography />
                  </Link>
                </Typography>
                <Container>
                  <SkeletonLoader.Typography rows={3} />
                </Container>
              </Container>
            </Container>

            <Container flex justifyContent='space-between' alignItems='center'>
              <Container>
                <Container bottom='xsmall'>
                  <Time16 />
                  <Container left='small' inline>
                    <Typography size='medium' as='span'>
                      <SkeletonLoader.Typography />
                    </Typography>
                  </Container>
                </Container>

                <Container>
                  <VideoOn16 />
                  <Container left='small' right='xsmall' inline>
                    <SkeletonLoader.Typography />
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      ))}
    </>
  )
}
