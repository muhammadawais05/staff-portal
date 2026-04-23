import React, { memo } from 'react'

import { FiltersContextProvider } from './FiltersContext'
import FiltersContent from './FiltersContent'
import { FiltersConfig, FiltersContainerConfig } from './types'

export interface Props {
  config?: FiltersConfig
  containerConfig?: FiltersContainerConfig
  values?: Record<string, unknown>
  onChange?: (values: Record<string, unknown>) => void
}

const FiltersWithoutHeader = ({
  config = [],
  containerConfig = {},
  values = {},
  onChange = () => {}
}: Props) => {
  return (
    <FiltersContextProvider
      filterValues={values}
      setFilterValues={onChange}
      config={config}
    >
      <FiltersContent
        hasFiltersExpanded
        config={config}
        containerConfig={containerConfig}
      />
    </FiltersContextProvider>
  )
}

export default memo(FiltersWithoutHeader)
