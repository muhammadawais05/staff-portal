import { act, renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useMutation } from '@staff-portal/data-layer-service'

import socialMediaCompanyDetails from '../data/client-social-media-fragment.mock'
import { SetPatchClientSocialMediaProfileDocument } from '../data'
import { useSocialMediaMutation } from '.'
import { adjustInputValues } from './adjust-input-values'

const COMPANY_ID = 'VjEtQ2xpZW50LTQ3OTgxMQ'

const mockUseMutation = useMutation as jest.Mock
const mockHandleMutationResult = jest.fn()

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: () => ({
    handleMutationResult: mockHandleMutationResult
  })
}))

describe('#useSocialMediaMutation', () => {
  it('returns proper values', async () => {
    const mockPathMutation = jest.fn().mockImplementation(() => ({
      data: {
        patchClientProfile: {
          success: true,
          errors: []
        }
      }
    }))

    when(mockUseMutation)
      .calledWith(SetPatchClientSocialMediaProfileDocument)
      .mockReturnValue([mockPathMutation, { loading: false }])

    const { result } = renderHook(() =>
      useSocialMediaMutation(
        COMPANY_ID,
        adjustInputValues(socialMediaCompanyDetails)
      )
    )

    const { handleChange } = result.current

    await act(async () => {
      await handleChange('zoominfoProfile', {
        clientId: 'VjEtQ2xpZW50LTQ3OTgxMQ',
        zoominfoProfile: 'example.com/1234'
      })
    })

    expect(mockPathMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          clientId: 'VjEtQ2xpZW50LTQ3OTgxMQ',
          zoominfoProfile: 'example.com/1234'
        }
      }
    })

    expect(mockHandleMutationResult).toHaveBeenCalledWith({
      mutationResult: { errors: [], success: true }
    })
  })
})
