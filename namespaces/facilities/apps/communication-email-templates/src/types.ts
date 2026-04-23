import {
  CreateEmailTemplateInput,
  UpdateEmailTemplateInput
} from '@staff-portal/graphql/staff'

export interface EmailTemplateCreateFormValues
  extends Omit<CreateEmailTemplateInput, 'private' | 'brandedTemplate'> {
  private: 'YES' | 'NO'
  brandedTemplate?: boolean
}

export interface EmailTemplateUpdateFormValues
  extends Omit<UpdateEmailTemplateInput, 'private' | 'brandedTemplate'> {
  private: 'YES' | 'NO'
  brandedTemplate?: boolean
}
