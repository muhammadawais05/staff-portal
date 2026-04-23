import React, { ReactNode } from 'react'
import { Container, Menu, Tooltip } from '@toptal/picasso'

import * as S from './styles'

export interface SortElement {
  text: string
  value: string
  order?: string
  disabled?: boolean
  tooltipContent?: ReactNode
}

interface Props {
  sortElements: SortElement[]
  onSort: (value: string) => void
}

type MenuItemWrapperProps = {
  disabled?: boolean
  tooltipContent?: ReactNode
  children?: ReactNode
}

const MenuItemWrapper = ({
  children,
  tooltipContent,
  disabled
}: MenuItemWrapperProps) => {
  return disabled && tooltipContent ? (
    <Tooltip content={tooltipContent}>
      <Container>{children}</Container>
    </Tooltip>
  ) : (
    <>{children}</>
  )
}

const SortElements = ({ sortElements, onSort }: Props) => {
  return (
    <Menu css={S.sortMenu}>
      {sortElements.map(({ text, value, order, disabled, tooltipContent }) => {
        const selected = Boolean(order)
        const handleSort = () => {
          onSort(value)
        }

        return (
          <MenuItemWrapper
            tooltipContent={tooltipContent}
            disabled={disabled}
            key={value}
          >
            <Menu.Item
              titleCase
              key={value}
              selected={selected}
              onClick={handleSort}
              disabled={disabled}
              aria-selected={!!selected}
            >
              {text}
            </Menu.Item>
          </MenuItemWrapper>
        )
      })}
    </Menu>
  )
}

export default SortElements
