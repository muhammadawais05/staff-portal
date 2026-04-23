import { Form, useField, useForm } from '@toptal/picasso-forms'
import React, { useEffect, useMemo } from 'react'
import { EngagementTalentSwapValuesEnum } from '@staff-portal/graphql/staff'
import { FeedbackReasonFragment } from '@staff-portal/feedbacks'

const REASONS_TO_TRACK_TALENT_SWAPS = [
  'budget_constraints',
  'client_feedback_does_not_match_talent_feedback',
  'client_unsatisfied_with_toptal',
  'hiring_replacement',
  'dissatisfied_with_my_talent',
  'changing_roadmap_or_priority',
  'talent_asked_to_leave',
  'trial_expired',
  'other'
]

export interface Props {
  reasons: FeedbackReasonFragment[]
}

const EngagementTalentSwap = ({ reasons }: Props) => {
  const { change } = useForm()

  const {
    input: { value: reasonId },
    meta: { dirty: isReasonModified }
  } = useField('reasonId')

  useEffect(() => {
    if (reasonId && isReasonModified) {
      change('talentWasSwapped', undefined)
    }
  }, [change, isReasonModified, reasonId])

  const isVisible = useMemo(() => {
    const identifier = reasons.find(({ id }) => id === reasonId)?.identifier

    if (!identifier) {
      return false
    }

    return REASONS_TO_TRACK_TALENT_SWAPS.includes(identifier)
  }, [reasonId, reasons])

  if (!isVisible) {
    return null
  }

  return (
    <Form.RadioGroup
      required
      horizontal
      name='talentWasSwapped'
      label='Replacement with another Toptal talent?'
      titleCase={false}
      data-testid='EngagementTalentSwap-radio-group'
    >
      <Form.Radio label='Yes' value={EngagementTalentSwapValuesEnum.YES} />
      <Form.Radio label='No' value={EngagementTalentSwapValuesEnum.NO} />
      <Form.Radio label='Maybe' value={EngagementTalentSwapValuesEnum.MAYBE} />
    </Form.RadioGroup>
  )
}

export default EngagementTalentSwap
