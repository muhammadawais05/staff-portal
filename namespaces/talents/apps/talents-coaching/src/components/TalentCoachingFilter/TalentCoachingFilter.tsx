import React from 'react'
import { Container } from '@toptal/picasso'
import {
  DateRange,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import { Filters } from '@staff-portal/filters'
import { TalentAutocompleteField } from '@staff-portal/talents'

import { useFiltersConfig } from '../../hooks'
import { SORT_OPTIONS } from '../../constants'
import * as S from './styles'

interface TalentCoachingFilterValues extends QueryParams {
  talentName?: string
  talentActivatedAt?: DateRange
  status?: TalentCoachingEngagementStatus
  assigneeId?: string
}

interface Props {
  filterValues: TalentCoachingFilterValues
  onChange: (filterValues: TalentCoachingFilterValues) => void
}

export const TalentCoachingFilter = ({ filterValues, onChange }: Props) => {
  const { filtersConfig } = useFiltersConfig()

  const handleFilterChange = (values: QueryParams) => {
    onChange({
      ...filterValues,
      ...values
    })
  }

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
      onChange={handleFilterChange}
      sortOptions={SORT_OPTIONS}
      initiallyExpanded
    >
      {nestableControls => (
        <Container flex justifyContent='flex-end'>
          <Container flex css={S.inputWrapper}>
            <TalentAutocompleteField
              initialDisplayValue={filterValues.talentName}
              placeholder='Talent Name'
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

export default TalentCoachingFilter
