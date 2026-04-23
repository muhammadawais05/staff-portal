import { FilterConfigType } from '../../../types'
import { CommonFilterConfig, FiltersConfig, PresetFilterConfig } from '../types'

type FullPresetFilterConfig = CommonFilterConfig & PresetFilterConfig

interface FilterServiceProps<TFilterValues extends Record<string, unknown>> {
  filterValues: TFilterValues
  setFilterValues: (newFilterValues: TFilterValues) => void
  config: FiltersConfig
}

export const createFilterService = <
  TFilterValues extends Record<string, unknown> = Record<string, unknown>
>({
  filterValues: values,
  setFilterValues: setValues,
  config
}: FilterServiceProps<TFilterValues>) => {
  const presetFilters = (config.flat() as FullPresetFilterConfig[]).filter(
    ({ type }) => type === FilterConfigType.PRESET
  )

  const getPristineValues = () =>
    config.flat().reduce(
      (result, { name }) => {
        delete result[name]

        return result
      },
      { ...values }
    )

  const getFilterValue = <T>(filterName: string) =>
    values[filterName] as T

  const setFilterValue = <T>(filterName: string, value: T) =>
    setValues({ ...values, [filterName]: value })

  const setFilterValues = <T>(valuesMap: {
    [filterName: string]: T
  }) => setValues({ ...values, ...valuesMap })

  const resetFilterValues = <T>(valuesMap: {
    [filterName: string]: T
  }) => setValues({ ...getPristineValues(), ...valuesMap })

  const clearFilterValue = (filterName: string) => {
    const newValues = { ...values }

    delete newValues[filterName]
    setValues(newValues)
  }

  const clearFilterValues = () => setValues({ ...getPristineValues() })

  const hasSelectedGroupFilterOption = (
    filterName: string,
    optionValue: string
  ) =>
    (getFilterValue<string[] | undefined>(filterName) || []).includes(
      optionValue
    )

  const setGroupFilterOptionValue = (
    filterName: string,
    optionName: string
  ) => {
    const filterValue = getFilterValue<string[] | undefined>(filterName) || []

    if (filterValue.includes(optionName)) {
      return
    }

    setFilterValue(filterName, [...filterValue, optionName])
  }

  const clearGroupFilterOptionValue = (
    filterName: string,
    optionName: string
  ) => {
    const filterValue = getFilterValue<string[] | undefined>(filterName) || []
    const optionIndex = filterValue.indexOf(optionName)

    if (optionIndex === -1) {
      return
    }

    const newFilterValue = [...filterValue].filter(
      (value, index) => index !== optionIndex
    )

    if (!newFilterValue.length) {
      return clearFilterValue(filterName)
    }

    setFilterValue(filterName, newFilterValue)
  }

  // TODO: refactor as part of https://toptal-core.atlassian.net/browse/SP-587
  const getRangeFilterValues = function <T>(
    filterName: string,
    fromPropertyName = 'from',
    tillPropertyName = 'till'
  ) {
    const filterValue =
      getFilterValue<{ [property: string]: unknown } | undefined>(filterName) ||
      {}

    const newFilterValue = {
      ...(filterValue[fromPropertyName] !== undefined && {
        from: filterValue[fromPropertyName]
      }),
      ...(filterValue[tillPropertyName] !== undefined && {
        till: filterValue[tillPropertyName]
      })
    }

    return newFilterValue as { from?: T; till?: T }
  }

  // TODO: refactor as part of https://toptal-core.atlassian.net/browse/SP-587
  // eslint-disable-next-line max-params
  const setRangeFilterValues = function <T>(
    filterName: string,
    from?: T,
    till?: T,
    fromPropertyName = 'from',
    tillPropertyName = 'till'
  ) {
    const filterValue: { [property: string]: unknown } = {
      ...(from !== undefined && { [fromPropertyName]: from }),
      ...(till !== undefined && { [tillPropertyName]: till })
    }

    setFilterValue(filterName, filterValue)
  }

  const clearRangeFilterValue = (filterName: string, propertyName: string) => {
    const filterValue =
      getFilterValue<{ [property: string]: unknown } | undefined>(filterName) ||
      {}

    const newFilterValue = { ...filterValue }

    delete newFilterValue[propertyName]

    if (!Object.keys(newFilterValue).length) {
      return clearFilterValue(filterName)
    }

    setFilterValue(filterName, newFilterValue)
  }

  const clearRangeFilterFromValue = (
    filterName: string,
    fromPropertyName = 'from'
  ) => clearRangeFilterValue(filterName, fromPropertyName)

  const clearRangeFilterTillValue = (
    filterName: string,
    tillPropertyName = 'till'
  ) => clearRangeFilterValue(filterName, tillPropertyName)

  const isDisabledByPreset = (filterName: string) =>
    presetFilters.some(({ options, name }) => {
      const option = options.find(({ key }) => key === values[name])
      const value = option?.values.find(({ filter }) => filter === filterName)

      // Platform has similar logic to below:
      //  (where `filterValue` is a second argument of current function)
      // return Array.isArray(value.value) ? !value.value.includes(filterValue as string) : value.value !== filterValue
      // but it has some bugs, so we should use simply that:
      return Boolean(value?.value)
    })

  const hasSelectedFilterValue = (filterName: string) =>
    Object.prototype.hasOwnProperty.call(values, filterName)

  return {
    getFilterValue,
    setFilterValue,
    setFilterValues,
    resetFilterValues,
    clearFilterValue,
    clearFilterValues,
    hasSelectedGroupFilterOption,
    setGroupFilterOptionValue,
    clearGroupFilterOptionValue,
    getRangeFilterValues,
    setRangeFilterValues,
    clearRangeFilterFromValue,
    clearRangeFilterTillValue,
    isDisabledByPreset,
    hasSelectedFilterValue
  }
}
