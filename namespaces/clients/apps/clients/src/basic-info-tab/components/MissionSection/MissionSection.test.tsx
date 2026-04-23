import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps, ReactNode } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ContainerLoader,
  TextSectionSkeleton,
  MultilineTextViewer
} from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { extractMission, getClientMissionHook } from './utils'
import MissionSection from './MissionSection'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/operations/src/utils')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('./utils')
jest.mock('@staff-portal/ui/src/components/ContainerLoader', () => jest.fn())

const useQueryMock = useQuery as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const getClientMissionHookMock = getClientMissionHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const extractMissionMock = extractMission as jest.Mock
const ContainerLoaderMock = ContainerLoader as jest.Mock
const EditableFieldMock = EditableField as jest.Mock
const getAdjustSingleStringValueMock = getAdjustSingleStringValue as jest.Mock

const renderComponent = (props: ComponentProps<typeof MissionSection>) =>
  render(
    <TestWrapper>
      <MissionSection {...props} />
    </TestWrapper>
  )

describe('MissionSection', () => {
  const dataMock = {
    node: { operations: { patchClientProfile: 'patchProfile' } }
  }

  beforeEach(() => {
    useQueryMock.mockReturnValue({
      data: dataMock,
      loading: 'loading',
      initialLoading: 'initial-loading'
    })
    extractMissionMock.mockReturnValueOnce('mission-text')
    useEditableFieldChangeHandlerMock.mockReturnValue('change-handler')
    isOperationEnabledMock.mockReturnValue(false)
    getClientMissionHookMock.mockReturnValue('query')
    ContainerLoaderMock.mockImplementationOnce(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='container-loader'>{children}</div>
      )
    )
    EditableFieldMock.mockReturnValue(<div data-testid='editable-field' />)
    getAdjustSingleStringValueMock.mockReturnValue('adjust-function')
  })

  it('passes expected arguments to useQuery', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        variables: {
          clientId: 'company-id'
        }
      })
    )
  })

  it('passes expected arguments to extractAbout', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(extractMissionMock).toHaveBeenCalledTimes(1)
    expect(extractMissionMock).toHaveBeenCalledWith(dataMock)
  })

  it('passes expected arguments to useEditableFieldChangeHandler', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: { mission: 'mission-text' },
        requiredValues: { clientId: 'company-id' },
        mutationResultOptions: {
          mutationResult: 'patchClientProfile'
        }
      })
    )
  })

  it('passes expected arguments to isOperationEnabled', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledWith('patchProfile')
  })

  it('renders ContainerLoader', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(screen.getByTestId('container-loader')).toBeInTheDocument()
    expect(ContainerLoaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: 'loading',
        showSkeleton: 'initial-loading',
        skeletonComponent: expect.objectContaining({
          type: TextSectionSkeleton
        })
      }),
      {}
    )
  })

  it('renders Section', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(screen.getByTestId('mission-section')).toBeInTheDocument()
  })

  it('renders EditableField', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(screen.getByTestId('editable-field')).toBeInTheDocument()
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'mission',
        value: 'mission-text',
        adjustValues: 'adjust-function',
        queryValue: 'query',
        onChange: 'change-handler',
        disabled: true,
        viewer: expect.objectContaining({
          type: MultilineTextViewer
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
