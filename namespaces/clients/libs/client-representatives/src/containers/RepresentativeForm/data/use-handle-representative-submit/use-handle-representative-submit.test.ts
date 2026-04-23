import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { useUpdateCompanyRepresentativeProfile } from '../../../../data'
import { useCreateCompanyRepresentative } from '../create-company-representative/create-company-representative.staff.gql'
import useHandleRepresentativeSubmit from './use-handle-representative-submit'
import { CreateRepresentativeFormValues } from '../../RepresentativeForm'
import { getCreateNewContactInput } from './get-create-new-contact-input'

const NEW_CONTACT_MUTATION_INPUT = Symbol('new-contact-mutation-input')

jest.mock('./get-create-new-contact-input', () => ({
  ...jest.requireActual('./get-create-new-contact-input'),
  getCreateNewContactInput: jest.fn()
}))

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useHandleMutationResult: jest.fn()
}))

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  useNotifications: jest.fn()
}))

jest.mock(
  '../create-company-representative/create-company-representative.staff.gql',
  () => ({
    ...jest.requireActual(
      '../create-company-representative/create-company-representative.staff.gql'
    ),
    useCreateCompanyRepresentative: jest.fn()
  })
)

jest.mock('../../../../data', () => ({
  ...jest.requireActual('../../../../data'),
  useUpdateCompanyRepresentativeProfile: jest.fn()
}))

const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const useNotificationsMock = useNotifications as jest.Mock
const useUpdateCompanyRepresentativeProfileMock =
  useUpdateCompanyRepresentativeProfile as jest.Mock
const useCreateCompanyRepresentativeMock =
  useCreateCompanyRepresentative as jest.Mock
const getCreateNewContactInputMock = getCreateNewContactInput as jest.Mock

const HANDLE_MUTATION_RESULT = jest.fn()

describe('useHandleRepresentativeSubmit', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({})
    useHandleMutationResultMock.mockReturnValue({
      handleMutationResult: HANDLE_MUTATION_RESULT
    })
    useUpdateCompanyRepresentativeProfileMock.mockReturnValue([() => {}, {}])
    useCreateCompanyRepresentativeMock.mockReturnValue([() => {}, {}])
    getCreateNewContactInputMock.mockReturnValue(NEW_CONTACT_MUTATION_INPUT)
  })

  describe('when creating new contact representative', () => {
    it('commits mutation with correct data passed', () => {
      const mutationResponse = {
        data: {
          createCompanyRepresentative: Symbol()
        }
      }
      const createRepresentativeMock = jest.fn(() => mutationResponse)
      const onSuccess = () => {}
      const creating = Symbol('creating')
      const clientId = 'client-id'
      const jobId = 'job-id'
      const encodedJobId = encodeEntityId(jobId, 'Job')
      const formData = {
        creationMethod: Symbol('creation-method'),
        jobId: encodedJobId
      } as unknown as CreateRepresentativeFormValues

      useCreateCompanyRepresentativeMock.mockReturnValue([
        createRepresentativeMock,
        { loading: creating }
      ])

      const { result } = renderHook(() =>
        useHandleRepresentativeSubmit({
          clientIdOrRepresentative: clientId,
          onSuccess,
          jobId
        })
      )

      result.current.handleSubmit(formData)

      expect(useCreateCompanyRepresentativeMock).toHaveBeenCalledWith({
        onError: expect.any(Function)
      })
      expect(result.current.loading).toBe(creating)

      expect(getCreateNewContactInputMock).toHaveBeenCalledWith(
        clientId,
        formData.creationMethod,
        formData
      )
      expect(createRepresentativeMock).toHaveBeenCalledTimes(1)
      expect(createRepresentativeMock).toHaveBeenCalledWith({
        variables: {
          input: NEW_CONTACT_MUTATION_INPUT
        }
      })

      waitFor(() => {
        expect(HANDLE_MUTATION_RESULT).toHaveBeenCalledTimes(1)
        expect(HANDLE_MUTATION_RESULT).toHaveBeenCalledWith({
          isFormSubmit: true,
          mutationResult: mutationResponse.data.createCompanyRepresentative,
          successNotificationMessage: `Contact information updated.`,
          onSuccessAction: onSuccess
        })
      })
    })
  })
})
