import React, { useMemo } from 'react'
import { Container, Section } from '@toptal/picasso'
import {
  FilterConfigType,
  FiltersConfig,
  FiltersWithoutHeader,
  FiltersContainerConfig,
  TypeSelectOption
} from '@staff-portal/filters'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import { BetaStaffQueryParams } from '../../hooks/use-beta-staff-members-filters'
import * as S from './styles'

const filtersContainerConfig: FiltersContainerConfig = {
  top: 'xsmall',
  bottom: 'xsmall',
  padded: 'medium'
}

type Props = {
  loading?: boolean
  values: BetaStaffQueryParams
  teamOptions: TypeSelectOption[]
  onChange: (values: BetaStaffQueryParams) => void
}

const BetaStaffFiltersSection = ({
  loading,
  onChange,
  values,
  teamOptions
}: Props) => {
  const FILTERS_CONFIG: FiltersConfig = useMemo(
    () => [
      {
        type: FilterConfigType.RADIO,
        name: 'beta_status',
        label: 'Beta status',
        options: [
          NOT_SELECTED_OPTION,
          { label: 'Enabled', value: 'enabled' },
          { label: 'Disabled', value: 'disabled' }
        ]
      },
      {
        type: FilterConfigType.RADIO,
        name: 'early_adopter_status',
        label: 'Early adopter status',
        options: [
          NOT_SELECTED_OPTION,
          { label: 'Enabled', value: 'enabled' },
          { label: 'Disabled', value: 'disabled' }
        ]
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'teams',
        label: 'Teams',
        loading,
        options: teamOptions,
        searchPlaceholder: 'Search teams',
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'last_visit',
        label: 'Last visited date'
      }
    ],
    [teamOptions]
  )

  return (
    <Section css={S.filtersSection}>
      <Container rounded>
        {
          <FiltersWithoutHeader
            // forces rerender of the component when load finishes
            key={`${loading}`}
            config={FILTERS_CONFIG}
            onChange={onChange}
            values={values}
            containerConfig={filtersContainerConfig}
          />
        }
      </Container>
    </Section>
  )
}

export default BetaStaffFiltersSection
