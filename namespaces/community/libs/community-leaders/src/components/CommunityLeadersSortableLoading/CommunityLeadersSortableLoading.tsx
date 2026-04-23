import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

export default () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <Container
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          padded='small'
          rounded
          bordered
          bottom='small'
          flex
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Container
            // eslint-disable-next-line @toptal/davinci/no-inline-css
            css={`
              max-width: 200px;
            `}
            flex
            direction='row'
            alignItems='center'
          >
            <SkeletonLoader.Media
              variant='image'
              width='2.1rem'
              height='2.1rem'
            />
            <Container left='small' flex direction='row' alignItems='center'>
              <SkeletonLoader.Typography />
            </Container>
          </Container>
          <Container flex direction='row' alignItems='center'>
            <SkeletonLoader.Button size='small' />
            <Container left='small' flex direction='row' alignItems='center'>
              <SkeletonLoader.Button size='small' />
            </Container>
          </Container>
        </Container>
      ))}
    </>
  )
}
