import { Button, Close16, Container, Grid } from '@toptal/picasso'
import { FieldArray, Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import * as S from './styles'
import { getTimeOptions } from './utils'

const FormInterviewTimeSlots = () => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  const timeOptions = useMemo(getTimeOptions, [])

  return (
    <Container top='small' bottom='small'>
      <FieldArray name='scheduledAtTimes'>
        {({ fields }) => (
          <>
            {fields.map((name, index) => (
              <Container
                css={S.timeSlotContainer}
                key={name}
                padded='small'
                bottom='xsmall'
              >
                <Grid>
                  <Grid.Item small={10}>
                    <FormDatePickerWrapper
                      required
                      width='full'
                      label='Date'
                      name={`${name}.date`}
                      minDate={minDate}
                      data-testid='FormInterviewTimeSlots-date'
                    />

                    <Form.Select
                      required
                      name={`${name}.time`}
                      label='Time'
                      width='full'
                      options={timeOptions}
                      data-testid='FormInterviewTimeSlots-time'
                    />
                  </Grid.Item>
                  <Grid.Item small={2}>
                    {Number(fields.length) > 1 && (
                      <Container flex justifyContent='flex-end'>
                        <Button.Circular
                          data-testid='remove-time-slot-option-button'
                          variant='flat'
                          icon={<Close16 />}
                          onClick={() => fields.remove(index)}
                        />
                      </Container>
                    )}
                  </Grid.Item>
                </Grid>
              </Container>
            ))}

            <Container top='small' flex justifyContent='flex-end'>
              <Button
                variant='secondary'
                disabled={Number(fields.length) >= 3}
                onClick={() => fields.push({ date: undefined, time: '' })}
              >
                Add New Time Option
              </Button>
            </Container>
          </>
        )}
      </FieldArray>
    </Container>
  )
}

export default FormInterviewTimeSlots
