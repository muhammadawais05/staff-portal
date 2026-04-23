import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

const EventTagsListLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Container
          data-testid='event-tag-item-loader'
          flex
          bordered
          rounded
          css={S.whiteBg}
          padded='small'
          bottom='small'
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <SkeletonLoader.Typography />
        </Container>
      ))}
    </>
  )
}

export default EventTagsListLoader
