import { renderHook, act } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateCommonTalent } from '../data/create-common-talent/create-common-talent.staff.gql'
import { useCreateTopscreenTalent } from '../data/create-topscreen-talent/create-topscreen-talent.staff.gql'
import { useCreateTalentProfile } from './use-create-talent-profile'
import { TalentCreateFormValues } from '../../../types'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('../data/create-common-talent/create-common-talent.staff.gql')
jest.mock('../data/create-topscreen-talent/create-topscreen-talent.staff.gql')

const mockUseNotifications = useNotifications as jest.Mock
const mockUseHandleMutationResult = useHandleMutationResult as jest.Mock
const mockUseCreateCommonTalent = useCreateCommonTalent as jest.Mock
const mockUseCreateTopscreenTalent = useCreateTopscreenTalent as jest.Mock

const mockOnSuccess = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockCreateCommonTalent = jest.fn()
const mockCreateTopscreenTalent = jest.fn()

const talentType = 'Finance Expert'
const verticalId = '123'

const mockInput = {
  fullName: 'Test Name',
  email: 'test@email.com',
  skype: 'test_username',
  about: 'Lorem ipsum',
  legalName: 'Test Legal Name',
  phoneNumber: '123123123',
  website: 'www.testurl.website.com',
  linkedin: 'www.testurl.linkedin.com',
  applicantSkillIds: [{ text: 'React', value: 'xyz' }]
} as TalentCreateFormValues

const mockMutationResult = {
  data: { createCommonTalent: 'Mocked Mutation Result' }
}

const arrangeTest = () => {
  mockUseNotifications.mockImplementation(() => ({
    showError: jest.fn()
  }))
  mockCreateCommonTalent.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockMutationResult)
      })
  )
  mockCreateTopscreenTalent.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockMutationResult)
      })
  )
  mockUseCreateCommonTalent.mockImplementation(() => [mockCreateCommonTalent])
  mockUseCreateTopscreenTalent.mockImplementation(() => [
    mockCreateTopscreenTalent
  ])
  mockUseHandleMutationResult.mockImplementation(() => ({
    handleMutationResult: mockHandleMutationResult
  }))

  return renderHook(() =>
    useCreateTalentProfile({
      talentType,
      verticalId,
      onSuccess: mockOnSuccess
    })
  )
}

describe('useCreateTalentProfile', () => {
  it('handles handleSubmit', () => {
    const { result, waitFor } = arrangeTest()

    act(() => {
      result.current.handleSubmit(mockInput)
    })

    expect(mockCreateCommonTalent).toHaveBeenCalledWith({
      variables: {
        input: {
          ...mockInput,
          verticalId,
          applicantSkillIds: ['xyz'],
          newApplicantSkillNames: []
        }
      }
    })

    waitFor(() => {
      expect(mockHandleMutationResult).toHaveBeenCalledWith({
        mutationResult: mockMutationResult.data.createCommonTalent,
        successNotificationMessage: 'The talent was successfully created.',
        onSuccessAction: mockOnSuccess
      })
    })
  })
})
