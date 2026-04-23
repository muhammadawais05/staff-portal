import { renderHook, act } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateVerticalMutation } from './data/create-vertical/create-vertical.staff.gql'
import useAddVerticalForm from './use-add-vertical-form'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('./data/create-vertical/create-vertical.staff.gql')

const mockUseNotifications = useNotifications as jest.Mock
const mockUseHandleMutationResult = useHandleMutationResult as jest.Mock
const mockUseCreateVerticalMutation = useCreateVerticalMutation as jest.Mock

const mockOnSuccess = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockAddVertical = jest.fn()

const mockInput = {
  talentType: 'Mocked Talent Type',
  publicPagesPath: 'Mocked Public Pages Path'
}

const mockMutationResult = {
  data: { addVertical: 'Mocked Mutation Result' }
}

const arrangeTest = () => {
  mockUseNotifications.mockImplementation(() => ({
    showError: jest.fn()
  }))
  mockAddVertical.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockMutationResult)
      })
  )
  mockUseCreateVerticalMutation.mockImplementation(() => [mockAddVertical])
  mockUseHandleMutationResult.mockImplementation(() => ({
    handleMutationResult: mockHandleMutationResult
  }))

  return renderHook(() => useAddVerticalForm({ onSuccess: mockOnSuccess }))
}

describe('useAddNewQuestion', () => {
  it('returns initial values', () => {
    const { result } = arrangeTest()

    expect(mockUseCreateVerticalMutation).toHaveBeenCalledWith({
      onError: expect.any(Function)
    })
    expect(result.current).toEqual({
      handleSubmit: expect.any(Function)
    })
  })

  it('handles handleSubmit', () => {
    const { result, waitFor } = arrangeTest()

    act(() => {
      result.current.handleSubmit(mockInput)
    })

    expect(mockAddVertical).toHaveBeenCalledWith({
      variables: { input: mockInput }
    })

    waitFor(() => {
      expect(mockHandleMutationResult).toHaveBeenCalledWith({
        mutationResult: mockMutationResult.data.addVertical,
        successNotificationMessage: 'The vertical was successfully added.',
        onSuccessAction: mockOnSuccess
      })
    })
  })
})
