import { noop } from '@toptal/picasso/utils'

const createApplicationErrorHandlers = () => []
const createEmptyDataLink = () => undefined

const getPersistStorageKey = () => 'getPersistStorageKey'

const useSendEmailModal = () => ({
  showModal: noop,
  renderModal: noop,
  loading: false
})

export { default as Content } from './Content'
export { default as ContentWrapper } from './ContentWrapper'
export { Note } from './Note'
export { default as Notes } from './Notes'
export { default as RelatedTasks } from './RelatedTasks'
export { default as TimelineButton } from './TimelineButton'
export { useQuery, useLazyQuery, useMutation } from './hooks'

export {
  getPersistStorageKey,
  useSendEmailModal,
  createApplicationErrorHandlers,
  createEmptyDataLink
}

export enum CounterName {
  ExpectedCommissions = 'expected_commissions',
  Payments = 'payments'
}

export const useTouchCounter = jest.fn()
