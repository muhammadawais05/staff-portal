import { act, renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'

import { useSystemInformationMutation } from './use-system-information-mutation'
import { systemInformationDataMock } from '../data/system-information-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  defineMessage: jest.fn(),
  useMessageEmitter: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: () => ({
    handleMutationResult: () => {}
  })
}))

const mockUseMutation = useMutation as jest.Mock
const mockPathMutation = jest.fn()

describe('#useSystemInformationMutation', () => {
  it('returns proper values', async () => {
    mockPathMutation.mockReturnValue({ data: { patchClientProfile: {} } })
    mockUseMutation.mockReturnValue([mockPathMutation])

    const { result } = renderHook(() =>
      useSystemInformationMutation(systemInformationDataMock)
    )

    const { handleChange } = result.current

    await act(async () => {
      await handleChange('interestedIn', {
        interestedIn: systemInformationDataMock.interestedIn
      })
    })

    expect(mockPathMutation).toHaveBeenCalledTimes(0)

    await act(async () => {
      await handleChange('interestedIn', { interestedIn: 'Projects' })
    })

    expect(mockPathMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          clientId: systemInformationDataMock.id,
          interestedIn: 'Projects'
        }
      }
    })
  })
})
