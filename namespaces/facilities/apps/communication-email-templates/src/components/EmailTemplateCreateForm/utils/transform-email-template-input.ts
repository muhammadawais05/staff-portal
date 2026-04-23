import {
  CreateEmailTemplateInput,
  EmailBrandedTemplateLayouts
} from '@staff-portal/graphql/staff'

import { EmailTemplateCreateFormValues } from '../../../types'

export const transformEmailTemplateInput = ({
  private: privateValue,
  brandedTemplate,
  ...rest
}: EmailTemplateCreateFormValues): CreateEmailTemplateInput => ({
  private: privateValue === 'YES',
  brandedTemplate: brandedTemplate
    ? EmailBrandedTemplateLayouts.RESPONSIVE
    : null,
  ...rest
})
