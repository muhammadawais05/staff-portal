import {
  FilterConfig,
  FiltersConfig,
  FiltersKeyMapConfig
} from './filters-types'

export const pullConfig = (
  config: FilterConfig | (() => FilterConfig)
): FilterConfig => {
  return typeof config === 'function' ? config() : config
}

export const fullFillConfig = (
  filtersConfig: FiltersKeyMapConfig
): { config: FiltersConfig; loading: boolean } => {
  let loading = false
  const loadingMiddleware = (config: FilterConfig): FilterConfig => {
    if ((config as { loading: boolean }).loading) {
      loading = true
    }

    return config
  }

  const config: FiltersConfig = filtersConfig.map(row => {
    if (Array.isArray(row)) {
      // rude inheritance, row can include only two items or less
      // because it's a `[string, string] | string` instead of `string[]`
      const [col1, col2] = row.map(item => loadingMiddleware(pullConfig(item)))

      return col2 ? [col1, col2] : [col1]
    }

    return loadingMiddleware(pullConfig(row))
  })

  return { config, loading }
}
