import React, { memo, FC, HTMLAttributes, ComponentProps } from 'react'
import { Button, SkeletonLoader } from '@toptal/picasso'

import InlineActionsWrapper from '../InlineActionsWrapper'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  numberOfButtons?: number
  size?: ComponentProps<typeof Button>['size']
}

const InlineActionsSkeleton: FC<Props> = memo<Props>(
  ({ numberOfButtons = 3, size = 'medium', ...rest }) => (
    <InlineActionsWrapper {...rest}>
      {Array.from({ length: numberOfButtons }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SkeletonLoader.Button size={size} key={index} />
      ))}
    </InlineActionsWrapper>
  )
)

export default InlineActionsSkeleton
