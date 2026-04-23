import { Form as PicassoForm, useField, useForm } from '@toptal/picasso-forms'
import { Form, Grid } from '@toptal/picasso'
import React, { useEffect, useMemo } from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'
import { isMaxLength } from '@staff-portal/validators'
import { FormDatePickerWrapperWithTimeZone } from '@staff-portal/forms'
import { useUserTimeZone } from '@staff-portal/current-user'

import FormActivitySubtypeSelect from '../FormActivitySubtypeSelect'
import FormActivityOutcomeSelect from '../FormActivityOutcomeSelect'
import FormActivityTypeSelect from '../FormActivityTypeSelect'
import { ContactsTagSelector } from './components'

export interface Props {
  contacts?: { id: string; fullName: string }[]
  typeHidden?: boolean
}

const ActivityForm = ({ contacts = [], typeHidden = false }: Props) => {
  const userTimeZone = useUserTimeZone()
  const { change } = useForm()
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const maxDate = useMemo(() => new Date(), [])

  const {
    input: { value: type },
    meta: { dirty: isTypeModified }
  } = useField<ActivityType>('type')

  useEffect(() => {
    if (type && isTypeModified) {
      change('subtype', '')
      change('outcome', '')
    }
  }, [type, isTypeModified, change])

  return (
    <>
      {!typeHidden && (
        <FormActivityTypeSelect
          name='type'
          label='Activity Type'
          required
          width='full'
        />
      )}
      {Boolean(type) && (
        <FormActivitySubtypeSelect
          name='subtype'
          label='Activity Sub Type'
          width='full'
          required
          activityType={type}
          data-testid='FormActivitySubtypeSelect'
        />
      )}

      <Form.Field>
        <Grid justifyContent='space-between'>
          <Grid.Item small={9}>
            <FormDatePickerWrapperWithTimeZone
              name='occurredAt'
              label='Activity Date'
              width='full'
              maxDate={maxDate}
              required
              timeZone={userTimeZone}
            />
          </Grid.Item>

          <Grid.Item small={3}>
            <PicassoForm.NumberInput
              name='duration'
              label='Duration'
              min='0'
              placeholder='mm'
              width='full'
              required
              data-testid='ActivityForm-duration-field'
            />
          </Grid.Item>
        </Grid>
      </Form.Field>

      {contacts.length > 0 && <ContactsTagSelector contacts={contacts} />}

      {Boolean(type) && (
        <FormActivityOutcomeSelect
          name='outcome'
          label='Outcome'
          width='full'
          required
          data-testid='FormActivityOutcomeSelect'
        />
      )}

      <PicassoForm.Input
        name='details'
        width='full'
        placeholder='Notes, details or red flags.'
        multiline
        rows={4}
        validate={isMaxLength}
      />
    </>
  )
}

export default ActivityForm
