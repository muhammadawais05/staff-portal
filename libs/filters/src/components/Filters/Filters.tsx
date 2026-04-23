import React, { ReactNode, memo } from 'react'

import { FiltersContextProvider } from './FiltersContext'
import FiltersContent from './FiltersContent'
import FiltersHeader from './FiltersHeader'
import { useFiltersState } from '../../hooks'
import { FiltersConfig, FiltersContainerConfig } from './types'
import { SortOption } from '../../types'

export interface FiltersProps {
  config?: FiltersConfig
  containerConfig?: FiltersContainerConfig
  values?: Record<string, unknown>
  onChange?: (values: Record<string, unknown>) => void
  sortOptions?: SortOption[]
  limitOptions?: number[]
  children?: (nestableControls: ReactNode) => ReactNode
  initiallyExpanded?: boolean
}

const Filters = ({
  children,
  config = [],
  containerConfig = {},
  values = {},
  onChange = () => {},
  sortOptions,
  limitOptions,
  initiallyExpanded = false
}: FiltersProps) => {
  const { hasFiltersExpanded, setHasFilterExpanded } =
    useFiltersState(initiallyExpanded)

  const headerControls = (
    <FiltersHeader
      hasFiltersExpanded={hasFiltersExpanded}
      setHasFilterExpanded={setHasFilterExpanded}
      sortOptions={sortOptions}
      limitOptions={limitOptions}
    />
  )

  return (
    <FiltersContextProvider
      filterValues={values}
      setFilterValues={onChange}
      config={config}
    >
      {children ? children(headerControls) : headerControls}

      <FiltersContent
        hasFiltersExpanded={hasFiltersExpanded}
        config={config}
        containerConfig={containerConfig}
      />
    </FiltersContextProvider>
  )
}

export default memo(Filters)
