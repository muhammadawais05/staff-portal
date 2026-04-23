import React, { ComponentProps } from 'react'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { defineMessage } from '@toptal/staff-portal-message-bus'

import { getBillingNotesHook } from './utils/get-billing-notes-hook'
import BillingNotesField from '.'

jest.mock('./utils/get-billing-notes-hook')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  EditableTextarea: jest.fn()
}))

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getBillingNotesHookMock = getBillingNotesHook as jest.Mock
const mockedEditableField = EditableField as jest.Mock

const renderComponent = (props: ComponentProps<typeof BillingNotesField>) =>
  render(
    <TestWrapper>
      <BillingNotesField {...props} />
    </TestWrapper>
  )

describe('BillingNotesField', () => {
  describe('when called with expected props', () => {
    it('renders as expected', () => {
      const name = 'billingNotes'
      const roleOrClientId = 'roleOrClientId'
      const billingNotes = 'billingNotes'
      const queryValue = 'queryValue'
      const onChange = 'onChange'
      const operation = {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      }

      const NOTES_UPDATED = defineMessage<{ roleOrClientId: string }>()

      const mutationResultOptions = {
        successNotificationMessage: 'Contact information updated.',
        successMessageEmitOptions: {
          type: NOTES_UPDATED,
          payload: { roleOrClientId }
        }
      }

      getBillingNotesHookMock.mockReturnValue(queryValue)
      useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
      mockedEditableField.mockReturnValue(null)

      renderComponent({
        roleOrClientId,
        billingNotes,
        mutationResultOptions,
        operation
      })

      expect(getBillingNotesHookMock).toHaveBeenCalledWith(roleOrClientId)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { billingNotes },
          requiredValues: { roleOrClientId },
          mutationResultOptions
        })
      )
      expect(mockedEditableField).toHaveBeenCalledWith(
        expect.objectContaining({
          name,
          queryValue,
          value: billingNotes,
          onChange
        }),
        {}
      )
    })
  })
})
