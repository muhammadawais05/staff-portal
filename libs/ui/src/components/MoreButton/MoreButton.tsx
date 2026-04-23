import {
  Button,
  Container,
  ContainerProps,
  Dropdown,
  Menu,
  More16
} from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

type Props = ContainerProps & {
  hidden?: boolean
  loading?: boolean
  fullHeight?: boolean
  keepMounted?: boolean
  disablePopper?: boolean
}

const MoreButton = ({
  children,
  hidden = false,
  loading = false,
  fullHeight = false,
  keepMounted = false,
  disablePopper,
  ...rest
}: Props) => {
  if (hidden) {
    return null
  }

  return (
    <Container left='xsmall' {...rest}>
      <Dropdown
        css={S.dropdown}
        keepMounted={keepMounted}
        offset={{ top: 'xsmall' }}
        content={<Menu>{children}</Menu>}
        contentOverflow={fullHeight ? 'visible' : 'scroll'}
        disablePortal
        data-testid='MoreButton-dropdown'
        popperOptions={{
          positionFixed: true,
          modifiers: {
            flip: {
              enabled: !disablePopper
            },
            preventOverflow: {
              enabled: !disablePopper
            },
            hide: {
              enabled: !disablePopper
            }
          }
        }}
      >
        <Button.Circular
          loading={loading}
          variant='flat'
          icon={<More16 />}
          data-testid='more-button'
        />
      </Dropdown>
    </Container>
  )
}

export default MoreButton
