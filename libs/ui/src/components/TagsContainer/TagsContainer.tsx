import React, { memo, useRef, ReactElement } from 'react'
import { Container, Tag } from '@toptal/picasso'

import { useChildNodesFit } from './useChildNodesFit'
import { useResizeCounter } from './use-resize-counter/useResizeCounter'
import * as S from './styles'

interface Props {
  length: number
  children: ReactElement
}

const RIGHT_MARGIN = 8
const MORE_TAGS_WIDTH = 45

const TagsContainer = ({ length, children }: Props) => {
  const { containerRef, visibleItemsLength } = useChildNodesFit({
    expectedNumberOfItems: length,
    reservedSpace: MORE_TAGS_WIDTH,
    itemWidthOffset: RIGHT_MARGIN
  })

  return (
    <Tag.Group ref={containerRef}>
      {React.cloneElement(children, {
        visibleLength: visibleItemsLength
      })}
    </Tag.Group>
  )
}

const TagsContainerResizeWrapper = (props: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const resized = useResizeCounter(container)

  return (
    <Container ref={container} css={S.fullWidthContainer}>
      <TagsContainer {...props} key={resized.toString()} />
    </Container>
  )
}

export default memo(TagsContainerResizeWrapper)
