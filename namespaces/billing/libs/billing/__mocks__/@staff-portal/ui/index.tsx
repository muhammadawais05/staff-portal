export * from '@staff-portal/ui'

export { default as AutocompleteHighlightOption } from './AutocompleteHighlightOption'
export { default as DetailedList } from './DetailedList'
export { default as ScrollToTop } from './ScrollToTop'
export { default as SubSection } from './SubSection'
export { default as DashboardItemWrapper } from './DashboardItemWrapper'

const parseNodeTypesAsString = (nodeTypes: string[]) => nodeTypes.join(' ')

export { parseNodeTypesAsString }
