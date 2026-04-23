import React, { PropsWithChildren, memo } from 'react'
import { Container } from '@toptal/picasso'

import * as S from './styles'
import { DetailedListRowContext } from './DetailedListRowContext'
import { useGetContainerPropsFromContext } from '../../DetailedListContext'

interface DetailedListRowProps {
  // @deprecated
  striped?: boolean
  // @deprecated
  divided?: boolean
  className?: string
}

const DetailedListRow = ({
  children,
  className
}: PropsWithChildren<DetailedListRowProps>) => {
  const { striped, divided } = useGetContainerPropsFromContext()

  if (!children) {
    return null
  }

  return (
    <DetailedListRowContext.Provider
      value={{
        numberOfRowItems: Array.isArray(children) ? children.length : undefined
      }}
    >
      <Container
        className={className}
        css={[striped && S.stripedRow, divided && S.dividedRow]}
        flex
        data-testid='row-item'
      >
        {children}
      </Container>
    </DetailedListRowContext.Provider>
  )
}

export default memo(DetailedListRow)
