import {
  UpdateEmailTemplateInput,
  EmailBrandedTemplateLayouts
} from '@staff-portal/graphql/staff'

import { EmailTemplateUpdateFormValues } from '../../../types'

export const transformEmailTemplateInput = ({
  private: privateValue,
  brandedTemplate,
  ...rest
}: EmailTemplateUpdateFormValues): UpdateEmailTemplateInput => ({
  private: privateValue === 'YES',
  brandedTemplate: brandedTemplate
    ? EmailBrandedTemplateLayouts.RESPONSIVE
    : null,
  ...rest
})
