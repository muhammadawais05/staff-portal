import React, { useState } from 'react'
import {
  BackMinor16,
  Button,
  ChevronMinor16,
  Container,
  Typography
} from '@toptal/picasso'

import * as S from './styles'

type Props = {
  pages: string[]
  onChange?: (page: number) => void
}

const NamedPagination = ({ pages, onChange }: Props) => {
  const [page, setPage] = useState(0)

  const title = pages[page]

  const handleChange = (newPage: number) => () => {
    setPage(newPage)
    onChange?.(newPage)
  }

  return (
    <Container
      flex
      alignItems='center'
      justifyContent={pages.length > 1 ? 'space-between' : 'center'}
      css={S.containerHeight}
    >
      {pages.length > 1 && (
        <Button.Action
          icon={<BackMinor16 />}
          disabled={page === 0}
          onClick={handleChange(page - 1)}
          data-testid='named-pagination-previous-button'
        />
      )}
      <Typography variant='heading' size='small' align='center'>
        {title}
      </Typography>
      {pages.length > 1 && (
        <Button.Action
          icon={<ChevronMinor16 />}
          disabled={page === pages.length - 1}
          onClick={handleChange(page + 1)}
          data-testid='named-pagination-next-button'
        />
      )}
    </Container>
  )
}

export default NamedPagination
