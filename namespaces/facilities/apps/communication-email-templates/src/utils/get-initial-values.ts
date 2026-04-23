import { EmailBrandedTemplateLayouts } from '@staff-portal/graphql/staff'

import { GetEmailTemplateDataFragment } from '../data/use-get-email-template/use-get-email-template.staff.gql.types'

export const getInitialValues = <T extends object>(
  emailTemplate?: GetEmailTemplateDataFragment | null,
  isCopy?: boolean
): T => {
  const template = {
    name: emailTemplate?.name,
    private: emailTemplate?.private ? 'YES' : 'NO',
    rawTemplate: emailTemplate?.rawTemplate,
    targetRole: emailTemplate?.targetRole.value,
    token: emailTemplate?.token,
    brandedTemplate:
      emailTemplate?.brandedTemplate === EmailBrandedTemplateLayouts.RESPONSIVE,
    sendingFrom: emailTemplate?.sendingFrom || []
  }

  if (!emailTemplate) {
    return {
      sendingFrom: [],
      private: 'NO'
    } as T
  }

  if (isCopy) {
    return template as T
  }

  return {
    emailTemplateId: emailTemplate?.id,
    ...template
  } as T
}
