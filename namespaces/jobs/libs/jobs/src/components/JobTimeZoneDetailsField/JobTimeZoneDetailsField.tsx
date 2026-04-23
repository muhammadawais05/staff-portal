import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { JobHoursOverlap } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import { buildHoursOverlapValue } from '../../utils'
import Field from './components/Field'
import { convertTime } from './utils'

type Props = {
  workingTimeTo: string
  workingTimeFrom: string
  hasPreferredHours: Maybe<boolean>
  hoursOverlapEnum?: JobHoursOverlap | null
}

const JobTimeZoneDetailsField = ({
  workingTimeTo,
  workingTimeFrom,
  hasPreferredHours,
  hoursOverlapEnum
}: Props) => {
  const workingTimeFromParsed = useMemo(
    () => convertTime(workingTimeFrom),
    [workingTimeFrom]
  )
  const workingTimeToParsed = useMemo(
    () => convertTime(workingTimeTo),
    [workingTimeTo]
  )

  return (
    <Container>
      <Field label='From' value={workingTimeFromParsed} />
      <Field label='To' value={workingTimeToParsed} />
      <Field
        label='Hours Overlap'
        value={buildHoursOverlapValue(hoursOverlapEnum)}
      />
      {hasPreferredHours && (
        <Field label='Hours Overlap Preference' value='Yes' />
      )}
    </Container>
  )
}

export default JobTimeZoneDetailsField
