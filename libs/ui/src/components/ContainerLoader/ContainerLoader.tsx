import React, { ComponentProps, HTMLAttributes, ReactElement } from 'react'
import { Container, Loader } from '@toptal/picasso'

import LoaderOverlay from '../LoaderOverlay'

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ComponentProps<typeof Container>['as'] | 'fragment'
  loaderPosition?: 'center' | 'top'
  loaderSize?: ComponentProps<typeof Loader>['size']
  loading?: boolean
  showSkeleton: boolean
  isModalContainer?: boolean
  skeletonComponent: ReactElement
  'data-testid'?: string
}

const ContainerLoader = ({
  children,
  showSkeleton,
  skeletonComponent: Skeleton,
  ...loaderProps
}: Props) => {
  return Skeleton && showSkeleton ? (
    Skeleton
  ) : (
    <LoaderOverlay {...loaderProps}>{children}</LoaderOverlay>
  )
}

export default ContainerLoader
