import { act, renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'

import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../data'
import { useInDepthCompanyResearchMutation } from '.'

const mockUseMutation = useMutation as jest.Mock
const mockHandleMutationResult = jest.fn()

jest.mock('@staff-portal/data-layer-service')
jest.mock('../data')
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
    handleMutationResult: mockHandleMutationResult
  })
}))

describe('#useInDepthCompanyResearchMutation', () => {
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
      .calledWith(SetPatchClientProfileDocument)
      .mockReturnValue([mockPathMutation, { loading: false }])

    const companyDetails = {
      id: 'test',
      foundingYear: '123',
      industry: 'Industry test',
      revenueRange: '$100-500',
      careerPages: {
        totalCount: 0,
        nodes: []
      },
      employeeCountEstimation: '10-100',
      currentEmployeeCount: 50,
      secondaryIndustry: null,
      businessModels: [],
      operations: {
        patchClientProfileOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    } as unknown as GetInDepthCompanyResearchClientFragment

    const { result } = renderHook(() =>
      useInDepthCompanyResearchMutation(companyDetails)
    )

    const { handleChange } = result.current

    await act(async () => {
      await handleChange('foundingYear', { foundingYear: '123' })
    })

    expect(mockPathMutation).toHaveBeenCalledTimes(0)

    await act(async () => {
      await handleChange('foundingYear', { foundingYear: '456' })
    })

    expect(mockPathMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          clientId: 'test',
          currentEmployeeCount: 50,
          foundingYear: '456'
        }
      }
    })

    expect(mockHandleMutationResult).toHaveBeenCalledWith({
      mutationResult: { errors: [], success: true }
    })
  })
})
