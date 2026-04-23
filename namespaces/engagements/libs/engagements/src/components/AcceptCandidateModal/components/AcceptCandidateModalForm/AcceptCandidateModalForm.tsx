import { Alert, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { DetailedList } from '@staff-portal/ui'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { Modal } from '@staff-portal/modals-service'
import { assertIsNotNullish } from '@staff-portal/utils'

import {
  GetAcceptCandidateModalDataDocument,
  ScheduleEngagementActivationStartDateDocument
} from '../../data'
import { useNavigateToJobPage } from '../../../../services'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

type Props = {
  engagementId: string
  hideModal: () => void
}

type FormValues = {
  startDate: Scalars['Date'] | null
  timeZoneName: string
}

const dataTestIds = {
  submitButton: 'accept-candidate-form-submit-button',
  closeButton: 'accept-candidate-form-cancel-button'
}

const AcceptCandidateModalForm = ({ engagementId, hideModal }: Props) => {
  const emitMessage = useMessageEmitter()
  const { navigateToJobPage } = useNavigateToJobPage()

  const { data: acceptCandidateData, loading: acceptCandidateLoading } =
    useGetNode(GetAcceptCandidateModalDataDocument)({ engagementId })
  const { timezones, loading: timezonesLoading } = useGetAvailableTimeZones()

  const initialLoading = acceptCandidateLoading || timezonesLoading

  if (!initialLoading) {
    assertIsNotNullish(acceptCandidateData)
    assertIsNotNullish(timezones)
  }

  const initialValues: FormValues = useMemo(
    () => ({
      startDate: null,
      timeZoneName: acceptCandidateData?.client?.timeZone?.value ?? ''
    }),
    [acceptCandidateData]
  )

  const clientHasUnpaidDepositInvoices =
    acceptCandidateData?.client?.hasUnpaidDepositInvoices
  const { name: clientTimeZoneName } =
    acceptCandidateData?.client?.timeZone || {}
  const { name: talentTimeZoneName } =
    acceptCandidateData?.talent?.timeZone || {}

  const timezoneOptions = useMemo(
    () =>
      timezones?.map(({ name, value }) => ({ value: value, text: name })) ?? [],
    [timezones]
  )

  return (
    <Modal.ActionForm
      title='Accept Developer and Schedule Start Date'
      submitText='Schedule Job Start'
      initialValues={initialValues}
      initialLoading={initialLoading}
      mutation={{
        document: ScheduleEngagementActivationStartDateDocument,
        successMessage: 'The Job was successfully started.',
        onSuccess: () => {
          const result = navigateToJobPage(acceptCandidateData?.job?.id)

          if (!result) {
            emitMessage(ENGAGEMENT_UPDATED, { engagementId })
          }
        }
      }}
      adjustFormValues={({ timeZoneName, startDate }) => ({
        engagementId,
        timeZoneName,
        startDate: startDate ?? ''
      })}
      onClose={hideModal}
      testIds={dataTestIds}
    >
      {clientHasUnpaidDepositInvoices && (
        <Container bottom='medium'>
          <Alert>Company has an unpaid deposit.</Alert>
        </Container>
      )}

      <Container bottom='medium'>
        <Typography
          size='medium'
          data-testid='accept-candidate-modal-form-question'
        >
          Are you sure that you want to approve this developer for the job? By
          doing so, you confirm that client accepted this candidate and ready to
          start working on a date specified below.
        </Typography>
      </Container>

      <FormDatePickerWrapper
        name='startDate'
        data-testid='accept-candidate-form-start-date'
        label='Start Date'
        width='full'
        autoFocus
        required
      />

      <Form.Select
        required
        name='timeZoneName'
        data-testid='accept-candidate-form-time-zone'
        label='Time Zone'
        options={timezoneOptions}
        width='full'
        hint='The reason the time zone is shown here is so that you understand you will be starting on the morning of that time zone unless discussed otherwise. We show you this so everyone is in sync and has a solid understanding of when to start.'
      />

      <Container top='small'>
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList
          labelColumnWidth={12}
          leftItemSpacing={0}
          rightItemSpacing={0}
          itemPadding={0}
          items={[
            { label: 'Company time zone', value: clientTimeZoneName },
            { label: 'Talent time zone', value: talentTimeZoneName }
          ]}
        />
      </Container>
    </Modal.ActionForm>
  )
}

export default AcceptCandidateModalForm
