import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { OperationFragment } from '@staff-portal/operations'
import { MultilineTextViewer } from '@staff-portal/ui'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import BillingNotes from './BillingNotes'
import { getLazyBillingNotesHook } from './data/get-billing-notes'
import { UpdateBillingNotesDocument } from './data/set-update-billing-notes/set-update-billing-notes.staff.gql.types'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  EditableTextarea: jest.fn()
}))
jest.mock('./data/get-billing-notes', () => ({
  getLazyBillingNotesHook: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof BillingNotes>) =>
  render(<BillingNotes {...props} />)

const mockUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const mockGetLazyBillingNotesHook = getLazyBillingNotesHook as jest.Mock
const MockEditableField = EditableField as jest.Mock
const MockEditableTextarea = EditableTextarea as jest.Mock

describe('BillingNotes', () => {
  const mockedHandleChange = jest.fn()
  const mockedGetLazyBillingNotesHook = jest.fn()

  beforeEach(() => {
    mockUseEditableFieldChangeHandler.mockReturnValueOnce(mockedHandleChange)
    MockEditableField.mockReturnValueOnce(null)
    MockEditableTextarea.mockRejectedValueOnce(null)
    mockGetLazyBillingNotesHook.mockReturnValueOnce(
      mockedGetLazyBillingNotesHook
    )
  })

  it('renders editable component', () => {
    const staffId = Symbol('staffId') as unknown as string
    const billingNotes = Symbol('billingNotes') as unknown as string
    const operation = Symbol('operation') as unknown as OperationFragment

    renderComponent({
      staffId,
      billingNotes,
      operation
    })

    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledWith({
      mutationDocument: UpdateBillingNotesDocument,
      initialValues: {
        billingNotes: billingNotes || ''
      },
      requiredValues: {
        roleOrClientId: staffId
      }
    })
    expect(MockEditableField).toHaveBeenCalledTimes(1)
    expect(MockEditableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        queryValue: mockedGetLazyBillingNotesHook,
        onChange: mockedHandleChange,
        value: billingNotes,
        name: 'billingNotes',
        multiline: true,
        fullWidthEditor: true,
        editor: expect.anything(),
        viewer: expect.objectContaining({
          type: MultilineTextViewer,
          props: {
            value: billingNotes
          }
        })
      }),
      {}
    )
  })
})
