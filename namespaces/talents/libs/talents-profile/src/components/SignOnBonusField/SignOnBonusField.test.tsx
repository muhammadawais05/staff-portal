import React, { ComponentProps } from 'react'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes, Scalars } from '@staff-portal/graphql/staff'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { getTalentSignOnBonusHook } from './utils/get-sign-on-bonus-hook'
import SignOnBonusField from '.'
import SignOnBonusIcon from './components/SignOnBonusIcon/SignOnBonusIcon'

jest.mock('./utils/get-sign-on-bonus-hook')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustDateValue: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getTalentSignOnBonusHookMock = getTalentSignOnBonusHook as jest.Mock
const useUserDateFormatterMock = useUserDateFormatter as jest.Mock

const renderComponent = (props: ComponentProps<typeof SignOnBonusField>) => {
  render(
    <TestWrapper>
      <SignOnBonusField {...props} />
    </TestWrapper>
  )
}

describe('SignOnBonusField', () => {
  describe('when called with expected props', () => {
    it('renders as expected', () => {
      const fieldName = 'signingBonusDeadline'
      const value = 'date'
      const talentId = 'talentId'
      const queryValue = 'queryValue'
      const onChange = 'onChange'
      const disabled = false
      const predictedTimeZone = {}
      const operation = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
      const parsedDate = 'parsedDate'
      const formatUserDate = jest.fn()

      getTalentSignOnBonusHookMock.mockReturnValue(queryValue)
      useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
      mockedEditableField.mockReturnValue(null)
      useUserDateFormatterMock.mockReturnValue(formatUserDate)
      formatUserDate.mockReturnValue(parsedDate)

      renderComponent({
        talentId,
        date: value as Scalars['Time'],
        operation,
        predictedTimeZone
      })

      expect(getTalentSignOnBonusHookMock).toHaveBeenCalledWith(talentId)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { signingBonusDeadline: value },
          requiredValues: { talentId },
          mutationResultOptions: {
            successMessageEmitOptions: {
              type: TALENT_UPDATED,
              payload: { talentId }
            }
          }
        })
      )
      expect(mockedEditableField).toHaveBeenCalledWith(
        expect.objectContaining({
          name: fieldName,
          queryValue,
          disabled,
          value,
          updateOnBlur: true,
          onChange,
          editor: expect.any(Function),
          icon: expect.objectContaining({
            type: SignOnBonusIcon,
            props: expect.objectContaining({
              date: value,
              predictedTimeZone
            })
          }),
          viewer: parsedDate
        }),
        {}
      )
    })
  })
})
