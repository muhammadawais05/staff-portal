import React, { memo, ReactNode } from 'react'
import { Container, Accordion, Typography } from '@toptal/picasso'

import ExpandButton from '../ExpandButton'
import * as S from './styles'

type Props = {
  comment: ReactNode
  expanded: boolean
  onExpandClick?: () => void
  children?: ReactNode
}

const ExpandableContent = ({
  comment,
  expanded,
  onExpandClick = () => {},
  children
}: Props) => (
  <>
    <Container flex justifyContent='space-between'>
      <Container right='small' data-testid='expandable-content-details'>
        <Typography as='div' size='medium'>
          {children}
        </Typography>
      </Container>
      <ExpandButton
        expanded={expanded}
        onClick={onExpandClick}
        data-testid='expandable-content-button'
      />
    </Container>
    <Accordion
      borders='none'
      expanded={expanded}
      content={
        <Container
          top='xsmall'
          css={S.content}
          data-testid='expandable-content-text'
        >
          <Typography as='div' size='medium'>
            {comment}
          </Typography>
        </Container>
      }
    />
  </>
)

export default memo(ExpandableContent)
