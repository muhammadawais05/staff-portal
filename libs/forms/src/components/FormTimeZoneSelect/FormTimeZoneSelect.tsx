import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

type Props = Pick<
  FormSelectProps<string>,
  | 'name'
  | 'required'
  | 'placeholder'
  | 'width'
  | 'enableReset'
  | 'data-testid'
  | 'id'
> & {
  label?: string
}

const FormTimeZoneSelect = (props: Props) => {
  const { showError } = useNotifications()

  const { timezones, loading } = useGetAvailableTimeZones({
    onError: () => showError('Error, unable to get timezones.')
  })

  const options = useMemo(
    () =>
      timezones?.map(({ name, value: timeZoneValue }) => ({
        text: name,
        value: timeZoneValue
      })) ?? [],
    [timezones]
  )

  return <Form.Select loading={loading} options={options} {...props} />
}

export default FormTimeZoneSelect
