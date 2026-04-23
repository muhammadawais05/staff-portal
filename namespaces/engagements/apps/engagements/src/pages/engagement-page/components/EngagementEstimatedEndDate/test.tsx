import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import MockDate from 'mockdate'
import { TestWrapper } from '@staff-portal/test-utils'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isOperationEnabled } from '@staff-portal/operations'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getLazyEngagementProposeEndDateHook } from './hooks'
import EngagementEstimatedEndDate, { Props } from './EngagementEstimatedEndDate'
import { isEstimatedDateChanged } from './utils'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')
jest.mock('@staff-portal/engagements', () => ({
  CompanyRateField: jest.fn()
}))
jest.mock('@staff-portal/forms', () => ({
  FormDatePickerWrapper: jest.fn()
}))
jest.mock('./hooks/get-lazy-engagement-propose-end-date')
jest.mock('./utils/is-estimated-date-changed')

const EditableFieldMock = EditableField as jest.Mock
const FormDatePickerWrapperMock = FormDatePickerWrapper as jest.Mock
const getLazyEngagementProposeEndDateHookMock =
  getLazyEngagementProposeEndDateHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const isEstimatedDateChangedMock = isEstimatedDateChanged as jest.Mock
const operationMock = createOperationMock()

const arrangeTest = ({
  props,
  operationEnabled
}: {
  props: Partial<Omit<Props, 'engagementId' | 'operation'>>
  operationEnabled: boolean
}) => {
  MockDate.set('2021-10-01')

  getLazyEngagementProposeEndDateHookMock.mockImplementation(
    jest.fn(() => 'query')
  )
  useEditableFieldChangeHandlerMock.mockImplementation(
    jest.fn(() => 'onChange')
  )

  isOperationEnabledMock.mockImplementation(jest.fn(() => operationEnabled))
  isEstimatedDateChangedMock.mockImplementation(jest.fn(() => true))
  EditableFieldMock.mockImplementation(jest.fn(({ editor }) => editor()))
  FormDatePickerWrapperMock.mockImplementation(jest.fn(() => null))

  render(
    <TestWrapper>
      <EngagementEstimatedEndDate
        isHistoryVisible={false}
        setHistoryVisibility={jest.fn()}
        engagementId='123'
        operation={operationMock}
        onChange={jest.fn()}
        {...props}
      />
    </TestWrapper>
  )
}

describe('EngagementEstimatedEndDate', () => {
  it.each([
    [
      {
        operationEnabled: true,
        value: '2021-10-15',
        viewer: 'Oct 15, 2021',
        editableFieldValue: '2021-10-15'
      }
    ],
    [
      {
        operationEnabled: true,
        value: undefined,
        viewer: 'Not specified',
        editableFieldValue: null
      }
    ],
    [
      {
        operationEnabled: true,
        value: '',
        viewer: 'Not specified',
        editableFieldValue: null
      }
    ],
    [
      {
        operationEnabled: false,
        value: '',
        viewer: 'Not specified',
        editableFieldValue: null
      }
    ],
    [
      {
        operationEnabled: false,
        value: '2019-01-01',
        viewer: 'Jan 1, 2019',
        editableFieldValue: '2019-01-01'
      }
    ]
  ])(
    'renders EditableField as expected with data: %s',
    ({ operationEnabled, value, viewer, editableFieldValue }) => {
      arrangeTest({
        operationEnabled,
        props: { date: value as Props['date'] }
      })

      expect(EditableFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: !operationEnabled,
          name: 'endDate',
          queryValue: 'query',
          value: editableFieldValue,
          updateOnBlur: true,
          viewer,
          editor: expect.any(Function)
        }),
        {}
      )
    }
  )

  it('renders `FormDatePickerWrapper` as expected', () => {
    arrangeTest({
      operationEnabled: true,
      props: { date: '2021-10-15' }
    })

    expect(FormDatePickerWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        autoFocus: true,
        minDate: new Date(),
        enableReset: false,
        hideOnSelect: true,
        size: 'small'
      }),
      {}
    )
  })

  it('calls all required hooks', () => {
    arrangeTest({
      operationEnabled: true,
      props: { date: '2021-10-15' }
    })

    expect(getLazyEngagementProposeEndDateHookMock).toHaveBeenCalledTimes(1)

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        isValueChanged: isEstimatedDateChangedMock
      })
    )
  })

  it('renders ExpandButton', () => {
    arrangeTest({
      operationEnabled: true,
      props: { date: '2021-10-15' }
    })

    expect(screen.getByTestId('ExpandButton')).toBeInTheDocument()
  })

  it.each([
    {
      prevIsHistoryVisible: false,
      nextIsHistoryVisible: true
    },
    {
      prevIsHistoryVisible: true,
      nextIsHistoryVisible: false
    }
  ])(
    'passes correct value to `setEstimatedEndDateHistoryVisibility` handler',
    ({ prevIsHistoryVisible, nextIsHistoryVisible }) => {
      const setHistoryVisibilityMock = jest.fn()

      arrangeTest({
        operationEnabled: true,
        props: {
          date: '2021-10-15',
          isHistoryVisible: prevIsHistoryVisible,
          setHistoryVisibility: setHistoryVisibilityMock
        }
      })

      const estimatedEndDateHistoryExpandButton = within(
        screen.getByTestId('EngagementEstimatedEndDate')
      ).getByTestId('ExpandButton')

      fireEvent.click(estimatedEndDateHistoryExpandButton)

      expect(setHistoryVisibilityMock).toHaveBeenCalledWith(
        nextIsHistoryVisible
      )
    }
  )
})
