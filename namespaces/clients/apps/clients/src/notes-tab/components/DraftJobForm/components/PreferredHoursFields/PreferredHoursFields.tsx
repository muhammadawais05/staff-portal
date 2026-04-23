import React, { useMemo } from 'react'
import { Form as PicassoForm, useField } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Container, Typography } from '@toptal/picasso'
import {
  useGetAvailableTimeZones,
  getHoursAndMinutesOfDay,
  getHoursOfOverlap
} from '@staff-portal/date-time-utils'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import * as S from './styles'
import { getTimeValue } from './utils/get-time-value'
import { getHoursOverlapValue } from './utils/get-hours-overlap-value'
import Field from '../Field'

const DraftJobFormPreferredHoursFields = () => {
  const { showError } = useNotifications()

  const { timezones } = useGetAvailableTimeZones({
    onError: () => {
      showError('Unable to load timezones.')
    }
  })

  const hasPreferredHours = useField('hasPreferredHours').input.value === 'true'

  const timeZoneOptions = useMemo(() => {
    return (timezones || []).map(({ name, value }) => ({
      text: name,
      value
    }))
  }, [timezones])

  return (
    <>
      <Field label='Job Time Zone' required>
        <PicassoForm.Select
          name={DraftJobFormFields.TimeZoneName}
          width='full'
          options={timeZoneOptions}
          required
        />
      </Field>

      <Field label='Time Zone Preference?'>
        <PicassoForm.RadioGroup
          name={DraftJobFormFields.HasPreferredHours}
          horizontal
        >
          <PicassoForm.Radio label='Yes' value='true' />

          <PicassoForm.Radio label='No' value='false' />
        </PicassoForm.RadioGroup>
      </Field>

      {hasPreferredHours && (
        <>
          <Field label='Client Working Hours'>
            <Container flex alignItems='center' bottom='medium'>
              <Container right='small'>
                <Typography size='xsmall'>From</Typography>
              </Container>

              <PicassoForm.Select
                name={DraftJobFormFields.WorkingTimeFrom}
                options={getHoursAndMinutesOfDay({
                  hourlyInterval: 2,
                  valueGetter: getTimeValue
                })}
                css={S.hoursSelect}
                required
              />

              <Container right='small' left='small'>
                <Typography size='xsmall'>To</Typography>
              </Container>

              <PicassoForm.Select
                name={DraftJobFormFields.WorkingTimeTo}
                options={getHoursAndMinutesOfDay({
                  hourlyInterval: 2,
                  valueGetter: getTimeValue
                })}
                css={S.hoursSelect}
                required
              />
            </Container>
          </Field>

          <Field label='Desired Hours of Overlap?'>
            <PicassoForm.Select
              name={DraftJobFormFields.HoursOverlap}
              options={getHoursOfOverlap({
                maxHoursOverlap: 8,
                valueGetter: getHoursOverlapValue
              })}
              width='full'
            />
          </Field>
        </>
      )}
    </>
  )
}

export default DraftJobFormPreferredHoursFields
