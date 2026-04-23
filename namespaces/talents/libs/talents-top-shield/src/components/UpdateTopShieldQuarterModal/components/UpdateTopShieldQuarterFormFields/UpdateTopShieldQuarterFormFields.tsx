import React from 'react'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { Scalars } from '@staff-portal/graphql/staff'
import { FormSpy } from '@toptal/picasso-forms'
import { Grid } from '@toptal/picasso'

export interface UpdateTopShieldQuarterForm {
  startDate: Scalars['Date'] | undefined
  endDate: Scalars['Date'] | undefined
  paymentEndDate: Scalars['Date'] | undefined
}

const UpdateTopShieldQuarterFormFields = () => {
  return (
    <FormSpy>
      {({ values }) => (
        <>
          <Grid>
            <Grid.Item small={6}>
              <FormDatePickerWrapper
                name='startDate'
                label='Eligible Start Date'
                placeholder='Select a date...'
                width='full'
                maxDate={values?.endDate}
                required
              />
            </Grid.Item>
            <Grid.Item small={6}>
              <FormDatePickerWrapper
                name='endDate'
                label='Eligible End Date'
                placeholder='Select a date...'
                width='full'
                minDate={values?.startDate}
                required
              />
            </Grid.Item>
          </Grid>
          <Grid>
            <Grid.Item small={6}>
              <FormDatePickerWrapper
                name='paymentEndDate'
                label='Eligible Payment End Date'
                placeholder='Select a date...'
                width='full'
              />
            </Grid.Item>
          </Grid>
        </>
      )}
    </FormSpy>
  )
}

export default UpdateTopShieldQuarterFormFields
