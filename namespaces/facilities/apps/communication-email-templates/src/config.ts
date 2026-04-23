import { EmailTemplateOrderField } from '@staff-portal/graphql/staff'

export const DEFAULT_SORT = EmailTemplateOrderField.NAME
export const DEFAULT_PAGE_SIZE = 100
export const PAGE_SIZES = [50, 100, 200]
export const LOCAL_STORAGE_PAGE_SIZE_KEY = 'email_templates_page_limit'
