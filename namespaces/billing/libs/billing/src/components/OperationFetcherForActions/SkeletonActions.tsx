import React, { FC, memo } from 'react'
import { Menu, SkeletonLoader } from '@toptal/picasso'

import { skeletonWidth } from './styles'

const Skeleton: FC = memo(() => {
  return (
    <Menu css={skeletonWidth}>
      <Menu.Item>
        <SkeletonLoader.Typography />
      </Menu.Item>
      <Menu.Item>
        <SkeletonLoader.Typography />
      </Menu.Item>
      <Menu.Item>
        <SkeletonLoader.Typography />
      </Menu.Item>
      <Menu.Item>
        <SkeletonLoader.Typography />
      </Menu.Item>
    </Menu>
  )
})

export default Skeleton
