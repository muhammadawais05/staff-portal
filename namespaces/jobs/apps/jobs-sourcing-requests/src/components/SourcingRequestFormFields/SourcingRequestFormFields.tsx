import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { SourcingRequest } from '@staff-portal/graphql/staff'

import { SourcingRequestJobFragment } from '../../data'
import { AccountInformation } from '../AccountInformation'
import { BudgetDetails } from '../BudgetDetails'
import { AdditionalNotes } from '../AdditionalNotes'

export type Props = {
  jobId?: string
  job?: SourcingRequest['job'] | SourcingRequestJobFragment
}

const SourcingRequestFormFields = ({ jobId, job }: Props) => {
  // TODO: more fields will be added later.
  return (
    <>
      {jobId && <Form.Input type='hidden' name='jobId' initialValue={jobId} />}
      <AccountInformation enterprise={job?.client?.enterprise} />
      <BudgetDetails />
      <AdditionalNotes />
    </>
  )
}

export default SourcingRequestFormFields
