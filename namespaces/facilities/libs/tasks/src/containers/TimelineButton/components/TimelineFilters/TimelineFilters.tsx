import React from 'react'
import { Checkbox, Typography } from '@toptal/picasso'

import { TimelineFiltersConfig, FilterName } from '../../types'

export type Props = {
  showCommunicationFilter: boolean
  activeFilters: TimelineFiltersConfig
  changeFilter: (filter: FilterName) => void
}

const TimelineFilters = ({
  showCommunicationFilter,
  activeFilters,
  changeFilter
}: Props) => (
  <Typography as='span' weight='regular'>
    <Checkbox.Group horizontal>
      <Checkbox
        label='Notes'
        checked={activeFilters.notes}
        onChange={() => changeFilter(FilterName.NOTES)}
      />

      {showCommunicationFilter && (
        <Checkbox
          label='Communication'
          checked={activeFilters.communications}
          onChange={() => changeFilter(FilterName.COMMUNICATIONS)}
        />
      )}

      <Checkbox
        label='History (Actions)'
        checked={activeFilters.actions}
        onChange={() => changeFilter(FilterName.ACTIONS)}
      />
    </Checkbox.Group>
  </Typography>
)

export default TimelineFilters
