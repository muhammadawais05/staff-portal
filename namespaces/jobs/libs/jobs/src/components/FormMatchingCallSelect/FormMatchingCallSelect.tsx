import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import { RelatedMeetingsFragment } from '../../containers/DeleteJobModal/data/related-meetings-fragment/related-meetings-fragment.staff.gql.types'

export type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required' | 'titleCase'
> & {
  meetings?: NonNullable<
    RelatedMeetingsFragment['possiblyRelatedMeetings']
  >['nodes']
}

const FormMatchingCallSelect = ({ meetings, ...props }: Props) => {
  const currentUser = useGetCurrentUser()

  const options = useMemo(
    () =>
      meetings?.map(({ id, organizer: { fullName }, scheduledAt }) => ({
        value: id,
        text: `${parseAndFormatDateTime(scheduledAt, {
          timeZone: currentUser?.timeZone?.value
        })} - ${fullName}`
      })) || [],
    [meetings, currentUser]
  )

  if (!options.length) {
    return null
  }

  if (options.length === 1) {
    return (
      <Form.Input
        type='hidden'
        name={props.name}
        initialValue={options[0].value}
      />
    )
  }

  return (
    <Form.Select {...props} options={options} initialValue={options[0].value} />
  )
}

export default FormMatchingCallSelect
