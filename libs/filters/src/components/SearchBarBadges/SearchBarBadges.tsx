import React from 'react'
import { Container, Tag, Radio } from '@toptal/picasso'

import {
  SearchBarCategory,
  FilterObject,
  SearchBarOption
} from '../SearchBar/types'
import * as S from './styles'
import { LogicOperator } from '../../types'
import { SearchBarBadge } from '../SearchBarBadge'

export const LOGIC_OPERATOR_FILTER_NAME = 'logic'

const getBadgeKey = ({ value, category }: SearchBarOption) => {
  const key = category.getKey(value)

  return `${key}-${category.name}`
}

interface Props {
  logicValue?: LogicOperator
  selectedFilters: SearchBarOption[]
  categories: SearchBarCategory[]
  onLogicChange: (newValue: LogicOperator) => void
  onBadgeDelete: (option: SearchBarOption) => void
  onBadgeChange: (
    category: SearchBarCategory<FilterObject>,
    badge: FilterObject
  ) => void
  shouldRenderLogicOperatorControls?: boolean
}

const SearchBarBadges = ({
  logicValue = LogicOperator.AND,
  selectedFilters,
  onLogicChange,
  onBadgeChange,
  onBadgeDelete,
  shouldRenderLogicOperatorControls = true
}: Props) => {
  if (selectedFilters.length === 0) {
    return null
  }

  return (
    <Container top='xsmall' bottom='xsmall' flex>
      <Container flex alignItems='flex-start'>
        {shouldRenderLogicOperatorControls && (
          <Radio.Group
            horizontal
            name={LOGIC_OPERATOR_FILTER_NAME}
            value={logicValue}
            onChange={(_, value) => {
              onLogicChange(value as LogicOperator)
            }}
            css={S.logicOperatorsContainer}
          >
            <Radio label='AND' value={LogicOperator.AND} />
            <Radio label='OR' value={LogicOperator.OR} />
          </Radio.Group>
        )}

        <Tag.Group>
          {selectedFilters.map(selectedOption =>
            selectedOption.category.BadgeComponent ? (
              <selectedOption.category.BadgeComponent
                key={getBadgeKey(selectedOption)}
                value={selectedOption.value}
                onBadgeChange={badge =>
                  onBadgeChange(selectedOption.category, badge)
                }
                onBadgeDelete={() => onBadgeDelete(selectedOption)}
              />
            ) : (
              <SearchBarBadge
                key={getBadgeKey(selectedOption)}
                onDelete={() => onBadgeDelete(selectedOption)}
                selectedOption={selectedOption}
              />
            )
          )}
        </Tag.Group>
      </Container>
    </Container>
  )
}

export default SearchBarBadges
