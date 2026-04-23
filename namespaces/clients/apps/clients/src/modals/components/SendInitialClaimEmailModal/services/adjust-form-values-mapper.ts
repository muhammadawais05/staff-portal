import {
  SendEmailFormValuesToAdjust,
  processEmailBody
} from '@staff-portal/communication-send-email'

export const adjustFormValuesMapper =
  (nodeId: string) =>
  ({
    to,
    title,
    body,
    ccSuggested,
    ccAdditional,
    template,
    pendingTasks
  }: SendEmailFormValuesToAdjust) => {
    const { emailBody } = processEmailBody(body)

    return {
      clientId: nodeId,
      contactId: to,
      title,
      body: emailBody,
      cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
      emailTemplateId: template,
      taskIds: pendingTasks
    }
  }
