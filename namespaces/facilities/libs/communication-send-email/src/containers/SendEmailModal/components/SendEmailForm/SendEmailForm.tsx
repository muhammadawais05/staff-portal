import React, { useMemo, ReactNode } from 'react'
import { Config, arrayMutators } from '@toptal/picasso-forms'
import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import { ModalForm } from '@staff-portal/modals-service'

import { EmailTemplateEdgeFragment } from '../../data/fragments'
import { EmailContext } from '../../types'
import { getStyledEmailBody } from '../../utils'

export interface SendEmailFormValues {
  template: Maybe<string>
  title: string
  to?: string
  bookingObjectId?: string
  ccSuggested: string[]
  ccAdditional: { value: string }[]
  body: string
  pendingTasks: string[]
  onTime?: Scalars['Time']
}

export type SendEmailFormValuesToAdjust = Omit<SendEmailFormValues, 'to'> &
  Required<Pick<SendEmailFormValues, 'to'>>

const INITIAL_VALUES: SendEmailFormValues = {
  template: null,
  title: '',
  ccSuggested: [],
  ccAdditional: [],
  body: '',
  pendingTasks: []
}

const extractDefaultCCOptionRoleEmails = (emailContext: EmailContext) =>
  emailContext?.emailCarbonCopyOptions?.nodes
    .filter(node => node.default)
    .map(node => node.role.email) || []

const getInitialValuesWithTemplate = ({
  values,
  template: { node, rendered }
}: {
  values: SendEmailFormValues
  template: EmailTemplateEdgeFragment
}) => ({
  ...values,
  template: node.id,
  title: rendered?.subject || '',
  body: getStyledEmailBody(rendered?.body)
})

const getInitialValues = (
  emailContext: EmailContext,
  preselectedEmailTemplateId?: string
) => {
  const defaultValues = {
    ...INITIAL_VALUES,
    bookingObjectId: emailContext.defaultBookingObject?.id,
    template: null,
    ccSuggested: extractDefaultCCOptionRoleEmails(emailContext),
    to: emailContext.defaultSendTo?.id,
    body: emailContext.renderedBlankEmailTemplate?.body || ''
  }

  if (preselectedEmailTemplateId) {
    const template = emailContext.emailTemplates?.edges.find(
      ({ node: { id } }) => id === preselectedEmailTemplateId
    )

    if (template) {
      return getInitialValuesWithTemplate({ values: defaultValues, template })
    }
  }

  return defaultValues
}

interface Props {
  children?: ReactNode
  title: string
  emailContext: EmailContext
  preselectedEmailTemplateId?: string
  onSubmit: Config<SendEmailFormValues>['onSubmit']
}

const SendEmailForm = ({
  children,
  title,
  emailContext,
  preselectedEmailTemplateId,
  onSubmit
}: Props) => {
  const initialValues = useMemo(
    () => getInitialValues(emailContext, preselectedEmailTemplateId),
    [emailContext, preselectedEmailTemplateId]
  )

  return (
    <ModalForm<SendEmailFormValues>
      title={title}
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
    >
      {children}
    </ModalForm>
  )
}

export default SendEmailForm
