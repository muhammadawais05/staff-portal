import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TypographyOverflow } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getReasonOrCommentText } from '../../utils/get-reason-or-comment-text'
import { getRejectionPlaceText } from '../../utils/get-rejection-place-text'
import { getSpecializationApplicationReasonHook } from '../../utils/get-talent-rejection-reason-hook'
import EditableRejectionReason from './EditableRejectionReason'
import { SpecializationApplicationFragment } from '../../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'

jest.mock('../../utils/get-reason-or-comment-text', () => ({
  getReasonOrCommentText: jest.fn()
}))
jest.mock('../../utils/get-rejection-place-text', () => ({
  getRejectionPlaceText: jest.fn()
}))
jest.mock('../../utils/get-talent-rejection-reason-hook', () => ({
  getSpecializationApplicationReasonHook: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationEnabled: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  TypographyOverflow: jest.fn()
}))

const getReasonOrCommentTextMock = getReasonOrCommentText as jest.Mock
const getRejectionPlaceTextMock = getRejectionPlaceText as jest.Mock
const getSpecializationApplicationReasonHookMock =
  getSpecializationApplicationReasonHook as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const EditableFieldMock = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const TypographyOverflowMock = TypographyOverflow as unknown as jest.Mock

const TALENT_ID = Symbol() as unknown as string
const SPECIALIZATION_APPLICATION = {
  rejectionReason: {
    id: Symbol(),
    reason: Symbol(),
    place: Symbol(),
    operations: { updateSpecializationApplicationRejectionReason: Symbol() }
  },
  status: Symbol()
} as unknown as SpecializationApplicationFragment

const handleChange = Symbol()
const placementText = Symbol()
const reasonText = Symbol()
const operationEnabled = Symbol()
const queryValue = Symbol()

const renderComponent = (
  props: ComponentProps<typeof EditableRejectionReason>
) =>
  render(
    <TestWrapper>
      <EditableRejectionReason {...props} />
    </TestWrapper>
  )

describe('EditableRejectionReason', () => {
  it('passes expected arguments to useEditableFieldChangeHandler', () => {
    useEditableFieldChangeHandlerMock.mockReturnValue(null)
    TypographyOverflowMock.mockReturnValue(null)
    EditableFieldMock.mockReturnValue(null)

    renderComponent({
      talentId: TALENT_ID,
      specializationApplication: SPECIALIZATION_APPLICATION
    })

    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: {
          reason: SPECIALIZATION_APPLICATION.rejectionReason?.reason
        },
        requiredValues: {
          specializationApplicationRejectionReasonId:
            SPECIALIZATION_APPLICATION.rejectionReason?.id
        },
        mutationResultOptions: {
          successMessageEmitOptions: {
            type: TALENT_UPDATED,
            payload: { talentId: TALENT_ID }
          }
        }
      })
    )
  })

  describe('when there is a rejection reason', () => {
    it('renders as expected', () => {
      useEditableFieldChangeHandlerMock.mockReturnValue(handleChange)
      getRejectionPlaceTextMock.mockReturnValue(placementText)
      getReasonOrCommentTextMock.mockReturnValue(reasonText)
      TypographyOverflowMock.mockReturnValue(null)
      EditableFieldMock.mockReturnValue(null)
      isOperationEnabledMock.mockReturnValue(operationEnabled)
      getSpecializationApplicationReasonHookMock.mockReturnValue(queryValue)

      renderComponent({
        talentId: TALENT_ID,
        specializationApplication: SPECIALIZATION_APPLICATION
      })

      expect(isOperationEnabledMock).toHaveBeenCalledWith(
        SPECIALIZATION_APPLICATION.rejectionReason?.operations
          .updateSpecializationApplicationRejectionReason
      )
      expect(getSpecializationApplicationReasonHookMock).toHaveBeenCalledWith(
        TALENT_ID
      )
      expect(getReasonOrCommentTextMock).toHaveBeenCalledWith(
        SPECIALIZATION_APPLICATION.rejectionReason
      )
      expect(getRejectionPlaceTextMock).toHaveBeenCalledWith(
        SPECIALIZATION_APPLICATION.rejectionReason?.place,
        SPECIALIZATION_APPLICATION.status
      )
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
      expect(TypographyOverflowMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: placementText
        }),
        {}
      )
      expect(EditableFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'reason',
          queryValue,
          disabled: !operationEnabled,
          value: SPECIALIZATION_APPLICATION.rejectionReason?.reason,
          onChange: handleChange,
          viewer: reasonText
        }),
        {}
      )
    })
  })

  describe('when there is no rejection reason', () => {
    it('returns null and does not call inner utils', () => {
      useEditableFieldChangeHandlerMock.mockReturnValue(null)

      renderComponent({
        talentId: TALENT_ID,
        specializationApplication: {
          id: '',
          status: SPECIALIZATION_APPLICATION.status,
          rejectionReason: undefined
        }
      })

      expect(TypographyOverflowMock).not.toHaveBeenCalled()
      expect(EditableFieldMock).not.toHaveBeenCalled()
    })
  })
})
