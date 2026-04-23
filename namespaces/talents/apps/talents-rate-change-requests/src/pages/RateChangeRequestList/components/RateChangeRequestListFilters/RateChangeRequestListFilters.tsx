import React from 'react'
import { Container } from '@toptal/picasso'
import { Filters } from '@staff-portal/filters'
import { TalentAutocompleteField } from '@staff-portal/talents'

import {
  SORT_OPTIONS,
  RateChangeRequestListQueryParams
} from '../../../../constants'
import { useFiltersConfig } from '../../hooks'
import * as S from './styles'

interface Props {
  filterValues: RateChangeRequestListQueryParams
  onChange: (filterValues: RateChangeRequestListQueryParams) => void
}

const RateChangeRequestListFilters = ({ filterValues, onChange }: Props) => {
  const { filtersConfig } = useFiltersConfig()

  const handleTalentChange = (talentName: string | null) => {
    onChange({
      ...filterValues,
      talentName: talentName ?? undefined
    })
  }

  return (
    <Filters
      values={filterValues}
      config={filtersConfig}
      onChange={onChange}
      sortOptions={SORT_OPTIONS}
      initiallyExpanded
    >
      {nestableControls => (
        <Container flex justifyContent='flex-end'>
          <Container flex css={S.inputWrapper}>
            <TalentAutocompleteField
              initialDisplayValue={filterValues.talentName}
              placeholder='Search for talent name'
              onSelect={handleTalentChange}
              width='full'
            />
          </Container>
          {nestableControls}
        </Container>
      )}
    </Filters>
  )
}

export default RateChangeRequestListFilters
