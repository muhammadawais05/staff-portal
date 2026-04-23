import { Operation, JobTemplate } from '@staff-portal/graphql/staff'
import { isOperationHidden } from '@staff-portal/operations'

export const shouldShowJobBillingDefaultsActions = (
  jobTemplate: JobTemplate | null | undefined,
  createJobTemplateOperation: Operation
) => {
  if (!jobTemplate) {
    return !isOperationHidden(createJobTemplateOperation)
  }

  return (
    !isOperationHidden(jobTemplate.operations.updateJobTemplate) ||
    !isOperationHidden(jobTemplate.operations.deleteJobTemplate)
  )
}
