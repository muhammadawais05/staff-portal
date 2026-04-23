import React, { ReactElement, ReactNode } from 'react'
import { ActionLoader } from '@staff-portal/ui'
import { TypographyOverflow } from '@toptal/picasso'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import PerformedActionsSkeleton from '../PerformedActionsSkeleton'
import PerformedActionsListExpandCommentsButton from '../PerformedActionsListExpandCommentsButton'

export interface Props {
  children: ReactNode
  browserTitle: string
  title: ReactElement | string
  loading?: boolean
}

const PerformedActionsContentWrapper = ({
  children,
  browserTitle,
  title,
  loading
}: Props) => {
  const titleComponent = (
    <TypographyOverflow
      color='inherit'
      size='inherit'
      weight='inherit'
      as='span'
    >
      {title}
    </TypographyOverflow>
  )

  return (
    <ContentWrapper
      browserTitle={browserTitle}
      title={!loading ? titleComponent : undefined}
      titleLoading={loading}
      actions={
        loading ? (
          <ActionLoader />
        ) : (
          <PerformedActionsListExpandCommentsButton />
        )
      }
    >
      {loading ? <PerformedActionsSkeleton /> : children}
    </ContentWrapper>
  )
}

export default PerformedActionsContentWrapper
