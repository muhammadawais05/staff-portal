import React, { useState, useCallback } from 'react'
import {
  Tag,
  Tooltip,
  Container,
  CheckMinor16,
  Plus16,
  Minus16
} from '@toptal/picasso'

import * as S from './styles'

export interface TagItemProps {
  name: string
  selected: boolean
  disabled?: boolean
  maxLimitWarning?: string
  onClick: (e: React.MouseEvent) => void
}

const TagItem = React.memo(
  ({
    name,
    selected,
    onClick,
    disabled,
    maxLimitWarning,
    ...rest
  }: TagItemProps) => {
    const [hovering, setHovering] = useState(false)

    const handleClick = useCallback(
      e => {
        onClick(e)

        if (!selected) {
          setHovering(false)
        }
      },
      [selected, onClick, setHovering]
    )

    return (
      <Tooltip
        content={maxLimitWarning}
        placement='bottom'
        disableListeners={!disabled || !maxLimitWarning}
      >
        <Container inline>
          <Tag
            onClick={handleClick}
            icon={
              selected ? (
                hovering ? (
                  <Minus16 color='red' />
                ) : (
                  <CheckMinor16 color='green' />
                )
              ) : (
                <Plus16 color={hovering ? 'blue' : undefined} />
              )
            }
            onMouseEnter={() => {
              setHovering(true)
            }}
            onMouseLeave={() => setHovering(false)}
            variant={selected ? (hovering ? 'red' : 'green') : undefined}
            css={S.tagStyle(!selected && hovering)}
            disabled={disabled}
            {...rest}
          >
            {name}
          </Tag>
        </Container>
      </Tooltip>
    )
  }
)

export default TagItem
