import React from 'react'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import {
  EmailBrandedTemplateOption,
  EmailTemplateRelatedToOptions,
  EmailTemplatePrivateField,
  EmailRawTemplateField,
  EmailTemplateNameField,
  EmailTemplateTargetRoleSelect,
  EmailTemplateTokenSelect
} from './components'

const EmailTemplateFormContent = () => (
  <>
    <FormBaseErrorContainer bottom='medium' />
    <EmailTemplateNameField />
    <EmailRawTemplateField />
    <EmailTemplatePrivateField />
    <EmailTemplateTargetRoleSelect />
    <EmailTemplateTokenSelect />
    <EmailBrandedTemplateOption />
    <EmailTemplateRelatedToOptions />
  </>
)

export default EmailTemplateFormContent
