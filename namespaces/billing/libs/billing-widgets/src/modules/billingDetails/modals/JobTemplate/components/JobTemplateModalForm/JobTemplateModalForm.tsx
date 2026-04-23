import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import {
  EngagementCommitmentEnum,
  CreateJobTemplateInput,
  UpdateJobTemplateInput
} from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { getCommitmentOptions } from '@staff-portal/billing/src/utils'
import { getDayNamesOfWeek } from '@staff-portal/billing/src/_lib/dateTime'
import { useUserContext } from '@staff-portal/billing/src/_lib/context/userContext'

import { GetClientJobTemplateQuery } from '../../data/getClientJobTemplate.graphql.types'
import JobTemplateWarning from '../JobTemplateWarning'
import BillCycleSelect from '../BillCycleSelect'

type JobTemplateInput = UpdateJobTemplateInput | CreateJobTemplateInput

interface Props {
  handleOnSubmit: (values: JobTemplateInput) => void
  initialValues: JobTemplateInput
  title: string
  submitButtonText: string
  client: Exclude<GetClientJobTemplateQuery['node'], null | undefined>
}

const displayName = 'JobTemplateModalForm'

const JobTemplateModalForm = ({
  initialValues,
  title,
  handleOnSubmit,
  submitButtonText,
  client
}: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])
  const { weekStartsOn } = useUserContext()
  const { modalContainer } = useExternalIntegratorContext()
  const commitmentOptions = useCallback(
    () =>
      getCommitmentOptions([
        EngagementCommitmentEnum.FULL_TIME,
        EngagementCommitmentEnum.PART_TIME,
        EngagementCommitmentEnum.HOURLY
      ]),
    []
  )

  const weekDays = useCallback(
    () =>
      getDayNamesOfWeek({
        locale: 'en-US',
        version: 'long',
        weekStartsOn
      }).map(day => ({
        text: day,
        value: day.toUpperCase()
      })),
    [weekStartsOn]
  )

  return (
    <Form<JobTemplateInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer
          fieldErrorKeys={['jobTemplateBase', 'subjectBase']}
        />
        <Form.Select
          data-testid={`${displayName}-commitment`}
          label={translate(
            'billingDetails:modals.jobTemplate.fields.commitment.label'
          )}
          enableReset
          name='commitment'
          options={commitmentOptions()}
          popperContainer={modalContainer}
          width='full'
        />
        <BillCycleSelect />
        <FormSpy subscription={{ values: true }}>
          {({ values }) => (
            <Form.Select
              data-testid={`${displayName}-billDay`}
              label={translate(
                'billingDetails:modals.jobTemplate.fields.billDay.label'
              )}
              enableReset
              name='billDay'
              options={weekDays()}
              popperContainer={modalContainer}
              width='full'
              disabled={!values.billCycle}
            />
          )}
        </FormSpy>
        <JobTemplateWarning client={client} />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton
          data-testid={`${displayName}-submit`}
          variant='positive'
        >
          {submitButtonText}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

JobTemplateModalForm.displayName = displayName

export default JobTemplateModalForm
