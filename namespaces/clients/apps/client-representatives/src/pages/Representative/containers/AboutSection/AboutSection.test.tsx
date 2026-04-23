import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ContainerLoader,
  TextSectionSkeleton,
  MultilineTextViewer
} from '@staff-portal/ui'
import { Operation } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import AboutSection from './AboutSection'
import { getRepresentativeAboutHook } from './hooks'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MultilineTextViewer: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/ui/src/components/ContainerLoader', () => jest.fn())
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: jest.fn()
}))
jest.mock('./hooks', () => ({
  getRepresentativeAboutHook: jest.fn()
}))

const isOperationEnabledMock = isOperationEnabled as jest.Mock
const getRepresentativeAboutHookMock = getRepresentativeAboutHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const ContainerLoaderMock = ContainerLoader as jest.Mock
const MultilineTextViewerMock = MultilineTextViewer as jest.Mock
const EditableFieldMock = EditableField as jest.Mock
const getAdjustSingleStringValueMock = getAdjustSingleStringValue as jest.Mock

const value = 'value'
const operation = {} as Operation
const representativeId = 'representativeId'
const loading = 'loading' as unknown as boolean
const initialLoading = 'initialLoading' as unknown as boolean

const renderComponent = () =>
  render(
    <TestWrapper>
      <AboutSection
        loading={loading}
        initialLoading={initialLoading}
        representative={
          {
            id: representativeId,
            about: value,
            operations: { updateCompanyRepresentativeProfile: operation }
          } as RepresentativeFragment
        }
      />
    </TestWrapper>
  )

describe('AboutSection', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('change-handler')
    isOperationEnabledMock.mockReturnValue(false)
    getRepresentativeAboutHookMock.mockReturnValue('query')
    ContainerLoaderMock.mockImplementationOnce(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='container-loader'>{children}</div>
      )
    )
    MultilineTextViewerMock.mockImplementation(() => null)
    EditableFieldMock.mockReturnValueOnce(<div data-testid='editable-field' />)
    getAdjustSingleStringValueMock.mockReturnValue('adjust-function')
  })

  it('passes expected arguments to useEditableFieldChangeHandler', () => {
    renderComponent()

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: { about: value },
        requiredValues: { companyRepresentativeId: representativeId }
      })
    )
  })

  it('passes expected arguments to isOperationEnabled', () => {
    renderComponent()

    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledWith(operation)
  })

  it('renders ContainerLoader', () => {
    renderComponent()

    expect(screen.getByTestId('container-loader')).toBeInTheDocument()
    expect(ContainerLoaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading,
        showSkeleton: initialLoading,
        skeletonComponent: expect.objectContaining({
          type: TextSectionSkeleton
        })
      }),
      {}
    )
  })

  it('renders Section', () => {
    renderComponent()

    expect(screen.getByTestId('about-section')).toBeInTheDocument()
  })

  it('renders EditableField', () => {
    renderComponent()

    expect(screen.getByTestId('editable-field')).toBeInTheDocument()
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'about',
        value,
        adjustValues: 'adjust-function',
        queryValue: 'query',
        onChange: 'change-handler',
        disabled: true,
        viewer: expect.objectContaining({
          type: MultilineTextViewerMock,
          props: {
            value
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
