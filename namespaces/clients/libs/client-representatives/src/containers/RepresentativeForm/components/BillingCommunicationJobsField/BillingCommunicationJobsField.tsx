import React, { useEffect } from 'react'
import { Form as PicassoForm, useField, useForm } from '@toptal/picasso-forms'
import { CompanyRepresentativeBillingCommunicationOption as BillingCommOpts } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'

import { RepresentativeFragment as Representative } from '../../../../data'

type BillingCommunicationJobsFieldProps = {
  name: string
  linkedFieldName: string
  jobs: Representative['jobs']
}

const BillingCommunicationJobsField = ({
  name,
  linkedFieldName,
  jobs
}: BillingCommunicationJobsFieldProps) => {
  const form = useForm()
  const {
    input: { value: selectedComm }
  } = useField(linkedFieldName)

  // we want to reset the value when component unmounts
  // because of linked field change
  useEffect(
    () => () => form.change(name, form.getFieldState(name)?.initial),
    [selectedComm, form, name]
  )

  if (!jobs?.nodes || selectedComm !== BillingCommOpts.SELECTED_JOB_NOTICES) {
    return null
  }

  return (
    <GridItemField label='Selected Job Notices' labelFor={name}>
      <PicassoForm.CheckboxGroup id={name} name={name}>
        {jobs.nodes.map(({ id, webResource: { text } }) => (
          <PicassoForm.Checkbox key={id} value={id} label={text} />
        ))}
      </PicassoForm.CheckboxGroup>
    </GridItemField>
  )
}

export default BillingCommunicationJobsField
