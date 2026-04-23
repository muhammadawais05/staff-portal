import { Container, Loader } from '@toptal/picasso'
import { Props as LoaderProps } from '@toptal/picasso/Loader/Loader'
import React, { ComponentProps, FC, memo } from 'react'

import * as S from './styles'

interface Props {
  as?: ComponentProps<typeof Container>['as'] | 'fragment'
  loaderSize?: LoaderProps['size']
  loading?: boolean
  loaderPosition?: 'center' | 'top'
  isModalContainer?: boolean
  'data-testid'?: string
}

const LoaderOverlay: FC<Props> = memo<Props>(
  ({
    as = 'div',
    children,
    loading,
    loaderSize = 'small',
    loaderPosition = 'center',
    isModalContainer,
    'data-testid': dataTestId = 'LoaderOverlayWrapper'
  }) => {
    const contents = (
      <>
        {children}
        {loading && (
          <Loader
            css={[
              S.overlayStyle,
              loaderPosition === 'top' && S.loaderPositionTop
            ]}
            size={loaderSize}
            data-testid='LoaderOverlay'
          />
        )}
      </>
    )

    if (as === 'fragment') {
      return contents
    }

    return (
      <Container
        css={[S.wrapper, isModalContainer && S.modalContainerWithForm]}
        forwardedAs={as}
        data-testid={dataTestId}
      >
        {contents}
      </Container>
    )
  }
)

export default LoaderOverlay
