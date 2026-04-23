import { noop } from '@toptal/picasso/utils'

const usePersistentFormContext = () => ({
  checkForm: noop
})

export { usePersistentFormContext }

export { default as PersistentFormProvider } from './PersistentFormProvider'
export { default as SelectableTableHeaderCheckboxCell } from './SelectableTableHeaderCheckboxCell'
export { default as SelectableTableRowCheckboxCell } from './SelectableTableRowCheckboxCell'
