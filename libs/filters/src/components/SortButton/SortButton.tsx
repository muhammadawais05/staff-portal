import React, { useState } from 'react'
import { Button, Dropdown, Container, Tooltip } from '@toptal/picasso'

import SortElements, { SortElement } from '../SortElements/SortElements'
import SortIcon from '../SortIcon'
import * as S from './styles'
import { SortOrder } from '../../types'

export interface Sort {
  target: string
  order: SortOrder
}

interface Props {
  sortElements: SortElement[]
  onSort: (value: string) => void
  onOrder: () => void
  selectedValue: string
  size?: 'small' | 'medium'
}

const SORT_ORDER_ASCENDING_LABEL = 'Sort in ascending order'
const SORT_ORDER_DESCENDING_LABEL = 'Sort in descending order'
const SORT_BY_LABEL = 'Sort by'
const SORT_BY_DISABLED_LABEL = 'Only one sorting option available'

const SortButton = ({
  sortElements = [],
  selectedValue,
  onSort,
  onOrder,
  size = 'medium'
}: Props) => {
  const [expanded, setExpanded] = useState(false)

  const selectedOption = sortElements.find(e => e.value === selectedValue)
  const sortOrderLabel =
    selectedOption?.order === SortOrder.ASC
      ? SORT_ORDER_DESCENDING_LABEL
      : SORT_ORDER_ASCENDING_LABEL
  const isSortByDisabled = sortElements.length <= 1
  const sortByLabel = isSortByDisabled ? SORT_BY_DISABLED_LABEL : SORT_BY_LABEL
  const sortOrder = selectedOption?.order ?? 'desc'

  return (
    <Container flex>
      <Dropdown
        content={
          !isSortByDisabled && (
            <SortElements sortElements={sortElements} onSort={onSort} />
          )
        }
        onOpen={() => setExpanded(true)}
        onClose={() => setExpanded(false)}
        contentOverflow='visible'
        disablePortal
        css={S.dropdown}
      >
        <Tooltip content={sortByLabel}>
          <span>
            <Button
              titleCase
              aria-label='Sort by'
              active={expanded}
              variant='secondary'
              css={S.buttonLeft}
              disabled={isSortByDisabled}
              icon={<Dropdown.Arrow />}
              iconPosition='right'
              size={size}
            >
              {selectedOption?.text}
            </Button>
          </span>
        </Tooltip>
      </Dropdown>
      <Tooltip content={sortOrderLabel}>
        <Button
          aria-label={sortOrder ? `Sort Order ${sortOrder}` : 'Sort Order'}
          data-testid='Sort Order'
          active={false}
          variant='secondary'
          onClick={onOrder}
          css={S.buttonRight}
          size={size}
        >
          <SortIcon sortOrder={sortOrder} />
        </Button>
      </Tooltip>
    </Container>
  )
}

export default SortButton
