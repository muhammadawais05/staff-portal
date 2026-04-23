import { SalesOwnerRelationship } from '@staff-portal/graphql/staff'

export const JOB_GENERAL_DETAILS_BATCH_KEY = 'JOB_GENERAL_DETAILS_BATCH_KEY'

export const COMPANY_LEVEL_TITLE = 'Company Level'
export const COMPANY_INFORMATION_TITLE = 'Company Information'
export const CONTACTS_TITLE = 'Contacts'
export const JOB_INFORMATION_TITLE = 'Job Information'

export const SALES_OWNER_RELATIONSHIP_MAPPING = {
  [SalesOwnerRelationship.AM]: 'Account Manager',
  [SalesOwnerRelationship.CLAIMER]: 'Inbound Sales Rep.',
  [SalesOwnerRelationship.CLASSIC_AM]: 'Classic Account Manager',
  [SalesOwnerRelationship.CP]: 'Enterprise Client Partner',
  [SalesOwnerRelationship.ISOLATED_CASE]: 'Isolated Case',
  [SalesOwnerRelationship.PROJECT_RELATIONSHIP_MANAGER]:
    'Project Relationship Manager',
  [SalesOwnerRelationship.PROJECT_SALES_SPECIALIST]: 'Project Sales Specialist',
  [SalesOwnerRelationship.RM]: 'Relationship Manager',
  [SalesOwnerRelationship.ROLE_REMOVED]: 'Remove Sales Owner'
}
