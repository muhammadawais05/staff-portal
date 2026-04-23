import React, { ReactNode } from 'react'
import { FlattenSimpleInterpolation } from 'styled-components'
import { Container } from '@toptal/picasso'

import ActionIcon from '../ActionIcon'
import { useHighlightInteraction } from '../../utils/useHighlightedInteraction'
import * as S from './styles'

interface ApplicationCardListItemProps {
  highlighted: boolean
  children: ReactNode
  onClick: (e: React.MouseEvent) => void
  cssStyle?: FlattenSimpleInterpolation
}

const ApplicationCardListItem = ({
  highlighted,
  children,
  onClick,
  cssStyle = S.listItemContent,
  ...rest
}: ApplicationCardListItemProps) => {
  const { variant, onMouseEnter, onMouseLeave } =
    useHighlightInteraction(highlighted)

  return (
    <li css={S.listItemContainer}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      <Container css={S.iconMargin}>
        <ActionIcon state={variant} />
      </Container>
      <Container css={cssStyle} className={variant}>
        {children}
      </Container>
    </li>
  )
}

export default ApplicationCardListItem
