import React from 'react'
import { Container, Button, ArrowDownMinor16 } from '@toptal/picasso'

import * as S from './styles'
import { HistoryWidgetVariant } from '../../types'

type Props = {
  onClick: () => void
  loading?: boolean
  variant?: HistoryWidgetVariant
}

const HistoryShowMoreButton = ({ onClick, loading, variant }: Props) => {
  if (variant === 'table') {
    return (
      <Container top='medium'>
        <Button
          fullWidth
          css={S.button}
          loading={loading}
          onClick={onClick}
          icon={<ArrowDownMinor16 />}
          iconPosition='right'
        >
          Show More
        </Button>
      </Container>
    )
  }

  return (
    <Container top='xsmall'>
      <Button loading={loading} onClick={onClick}>
        Load more
      </Button>
    </Container>
  )
}

export default HistoryShowMoreButton
