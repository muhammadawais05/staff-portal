import React from 'react'
import { Container, SelectOption, TypographyOverflow } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  UpdateSpecializationApplicationRejectionReasonInput,
  SpecializationApplicationRejectionReasonInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import {
  TALENT_UPDATED,
  REJECTION_REASON_INPUT_MAPPING
} from '@staff-portal/talents'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { UpdateSpecializationApplicationRejectionReasonDocument } from '../../data/update-rejection-reason/update-rejection-reason.staff.gql.types'
import { SpecializationApplicationFragment } from '../../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'
import { getReasonOrCommentText } from '../../utils/get-reason-or-comment-text'
import { getRejectionPlaceText } from '../../utils/get-rejection-place-text'
import { getSpecializationApplicationReasonHook } from '../../utils/get-talent-rejection-reason-hook'

const rejectionReasonOptions: SelectOption[] = Object.entries(
  REJECTION_REASON_INPUT_MAPPING
).map(([value, text]) => ({ text, value }))

export interface Props {
  talentId: string
  specializationApplication: SpecializationApplicationFragment
}

const EditableRejectionReason = ({
  talentId,
  specializationApplication
}: Props) => {
  const rejectionReason = specializationApplication.rejectionReason

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateSpecializationApplicationRejectionReasonDocument,
    initialValues: {
      reason:
        rejectionReason?.reason as unknown as SpecializationApplicationRejectionReasonInput
    },
    requiredValues: {
      specializationApplicationRejectionReasonId: rejectionReason?.id || ''
    },
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: TALENT_UPDATED,
        payload: { talentId }
      }
    }
  })

  if (!rejectionReason) {
    return null
  }

  const operation =
    rejectionReason?.operations.updateSpecializationApplicationRejectionReason
  const placementText = getRejectionPlaceText(
    rejectionReason?.place,
    specializationApplication.status
  )
  const reasonText = getReasonOrCommentText(rejectionReason)

  return (
    <Container flex alignItems='baseline'>
      <TypographyOverflow weight='semibold'>{placementText}</TypographyOverflow>
      <EditableField<UpdateSpecializationApplicationRejectionReasonInput>
        name='reason'
        left='xsmall'
        queryValue={getSpecializationApplicationReasonHook(talentId)}
        disabled={!isOperationEnabled(operation)}
        value={rejectionReason.reason}
        onChange={handleChange}
        editor={props => (
          <Form.Select
            {...props}
            options={rejectionReasonOptions}
            size='small'
            width='auto'
          />
        )}
        viewer={reasonText}
      />
    </Container>
  )
}

export default EditableRejectionReason
