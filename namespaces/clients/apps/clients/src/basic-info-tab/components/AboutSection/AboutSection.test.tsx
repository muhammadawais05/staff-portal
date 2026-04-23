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

import {
  extractAboutValue,
  extractAboutDisplayData,
  getClientAboutHook
} from './utils'
import AboutSection from './AboutSection'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MultilineTextViewer: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('./utils')
jest.mock('@staff-portal/ui/src/components/ContainerLoader', () => jest.fn())
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: jest.fn()
}))

const useQueryMock = useQuery as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const getClientAboutHookMock = getClientAboutHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const extractAboutValueMock = extractAboutValue as jest.Mock
const extractAboutDisplayDataMock = extractAboutDisplayData as jest.Mock
const ContainerLoaderMock = ContainerLoader as jest.Mock
const MultilineTextViewerMock = MultilineTextViewer as jest.Mock
const EditableFieldMock = EditableField as jest.Mock
const getAdjustSingleStringValueMock = getAdjustSingleStringValue as jest.Mock

const renderComponent = (props: ComponentProps<typeof AboutSection>) =>
  render(
    <TestWrapper>
      <AboutSection {...props} />
    </TestWrapper>
  )

describe('AboutSection', () => {
  const dataMock = {
    node: { operations: { patchClientProfile: 'patchProfile' } }
  }

  beforeEach(() => {
    useQueryMock.mockReturnValue({
      data: dataMock,
      loading: 'loading',
      initialLoading: 'initial-loading'
    })
    extractAboutValueMock.mockReturnValue('about-text')
    extractAboutDisplayDataMock.mockReturnValue({ displayData: null })
    useEditableFieldChangeHandlerMock.mockReturnValue('change-handler')
    isOperationEnabledMock.mockReturnValue(false)
    getClientAboutHookMock.mockReturnValue('query')
    ContainerLoaderMock.mockImplementationOnce(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='container-loader'>{children}</div>
      )
    )
    MultilineTextViewerMock.mockReturnValue(null)
    EditableFieldMock.mockReturnValueOnce(<div data-testid='editable-field' />)
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

  it('passes expected arguments to extractAboutValue', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(extractAboutValueMock).toHaveBeenCalledTimes(1)
    expect(extractAboutValueMock).toHaveBeenCalledWith(dataMock)
  })

  it('passes expected arguments to useEditableFieldChangeHandler', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: { about: 'about-text' },
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

  it('passes expected arguments to extractAboutDisplayData', () => {
    renderComponent({
      companyId: 'company-id'
    })

    expect(extractAboutDisplayDataMock).toHaveBeenCalledTimes(1)
    expect(extractAboutDisplayDataMock).toHaveBeenCalledWith(dataMock)
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

    expect(screen.getByTestId('about-section')).toBeInTheDocument()
  })

  it('renders EditableField', () => {
    extractAboutDisplayDataMock.mockReturnValue({
      internalAbout: 'internalAbout'
    })

    renderComponent({
      companyId: 'company-id'
    })

    expect(screen.getByTestId('editable-field')).toBeInTheDocument()
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'about',
        value: 'about-text',
        adjustValues: 'adjust-function',
        queryValue: 'query',
        onChange: 'change-handler',
        disabled: true,
        viewer: expect.objectContaining({
          type: MultilineTextViewerMock,
          props: {
            'data-testid': 'about-viewer-internal-source-text',
            value: 'internalAbout'
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
