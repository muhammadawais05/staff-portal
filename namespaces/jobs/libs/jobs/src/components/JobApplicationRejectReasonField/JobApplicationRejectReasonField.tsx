import React, { useMemo } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { JobApplicationRejectReason } from '@staff-portal/graphql/staff'

import {
  JOB_APPLICATION_REASONS_TEXT_MAPPING,
  JOB_APPLICATION_REASONS_COMMENT_MAPPING
} from '../../config'

const getRejectionReasons = (): JobApplicationRejectReason[] => {
  const {
    APPLIED_BY_MISTAKE,
    LACKING_REQUESTED_SKILL,
    LACKING_REQUIRED_SKILL,
    NOT_LONGER_AVAILABLE,
    NOT_MATCH_RATE,
    NOT_MATCH_SOFT_SKILLS,
    NOT_MATCH_TIME_ZONE_OR_LOCATION,
    OTHER,
    PROCEEDING_WITH_OTHER_TALENT
  } = JobApplicationRejectReason

  return [
    LACKING_REQUESTED_SKILL,
    NOT_MATCH_TIME_ZONE_OR_LOCATION,
    NOT_MATCH_RATE,
    NOT_MATCH_SOFT_SKILLS,
    LACKING_REQUIRED_SKILL,
    NOT_LONGER_AVAILABLE,
    PROCEEDING_WITH_OTHER_TALENT,
    APPLIED_BY_MISTAKE,
    OTHER
  ]
}

export const JobApplicationRejectReasonField = () => {
  const { change } = useForm()
  const reasons = useMemo(() => getRejectionReasons(), [])
  const statusOptions = useMemo(
    () =>
      reasons.map(reason => ({
        text: JOB_APPLICATION_REASONS_TEXT_MAPPING[reason],
        value: reason
      })),
    [reasons]
  )

  return (
    <Form.Select
      required
      label='Reason'
      options={statusOptions}
      name='reason'
      onChange={e =>
        change(
          'comment',
          JOB_APPLICATION_REASONS_COMMENT_MAPPING[e.target.value] ?? ''
        )
      }
      data-testid='job-application-reject-reason-id'
    />
  )
}

export default JobApplicationRejectReasonField
