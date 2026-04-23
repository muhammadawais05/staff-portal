export * from '@staff-portal/forms'

export { default as PersistentFormProvider } from './PersistentFormProvider'
export { default as FormDatePickerWrapper } from './FormDatePickerWrapper'

jest.mock('@staff-portal/forms/src/contexts', () => ({
  usePersistentFormContext: () => ({
    getForm: jest.fn(),
    setForm: jest.fn(),
    removeForm: jest.fn(),
    checkForm: jest.fn(),
    clearFormType: jest.fn()
  })
}))

// TODO: this global mock should be able to prevent using form submission in unit tests <follow-up task link here>
// const useHandleMutationResult = () => ({
//   handleMutationResult: jest.fn()
// })
// export { useHandleMutationResult }
