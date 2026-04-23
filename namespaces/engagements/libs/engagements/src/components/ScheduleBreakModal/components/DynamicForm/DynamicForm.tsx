import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Tabs, Typography } from '@toptal/picasso'
import { Form, Config } from '@toptal/picasso-forms'
import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'

import { BreakType, FormValues, ScheduleType } from '../../types'
import FormContent from '../FormContent'

interface Props {
  initialValues?: FormValues
  autoFocusFirstField?: boolean
  activeTab: BreakType
  scheduleType: ScheduleType
  loading: boolean
  submitText: string
  status: Maybe<EngagementStatus>
  onChangeActiveTab: (_: unknown, newValue: BreakType) => void
  onSubmit: Config<FormValues>['onSubmit']
  setValues: (values: FormValues) => void
  onFormInitializedFirstTime?: () => void
  onClose: () => void
}

// We have to place all modal content inside the form because there is no way to submit the form outside the form
const DynamicForm = ({
  initialValues,
  autoFocusFirstField,
  activeTab,
  scheduleType,
  loading,
  submitText,
  status,
  onChangeActiveTab,
  onSubmit,
  setValues,
  onFormInitializedFirstTime,
  onClose
}: Props) => {
  return <Form onSubmit={onSubmit} initialValues={initialValues}>
    <Modal.Content>
      <Container bottom='medium'>
        <Tabs value={activeTab} onChange={onChangeActiveTab}>
          <Tabs.Tab
            titleCase={false}
            label='Multi-day Break'
            data-testid='DynamicForm-multi-day-tab'
          />
          <Tabs.Tab
            titleCase={false}
            label='Single-day Break'
            data-testid='DynamicForm-single-day-tab'
          />
        </Tabs>
      </Container>
      <Container bottom='large'>
        <Typography size='medium'>
          If the client's break affects billing cycles that have already been
          paid, all related invoices, payments, and commissions will be sent to
          the accounting team for review and updated accordingly.
        </Typography>
      </Container>
      <FormContent
        status={status}
        type={activeTab}
        scheduleType={scheduleType}
        setValues={setValues}
        autoFocusFirstField={autoFocusFirstField}
        onFormInitializedFirstTime={onFormInitializedFirstTime}
      />
    </Modal.Content>
    <Modal.Actions>
      <Button
        variant='secondary'
        disabled={loading}
        onClick={onClose}
        data-testid='DynamicForm-cancel-button'
      >
        Cancel
      </Button>
      <Form.SubmitButton
        variant='positive'
        data-testid='DynamicForm-submit-button'
      >
        {submitText}
      </Form.SubmitButton>
    </Modal.Actions>
  </Form>
}

export default DynamicForm
