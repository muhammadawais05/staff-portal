import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { Scalars } from '@staff-portal/graphql/staff'

interface CommercialDocumentCreditedInput {
  issueDate?: Scalars['Date']
}

export const useCommercialDocumentIssueMessage = ({
  issueDate
}: CommercialDocumentCreditedInput): string | undefined => {
  return issueDate && formatDateMed(issueDate)
}
