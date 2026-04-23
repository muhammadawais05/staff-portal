import { JobApplicationStatus } from '@staff-portal/graphql/staff'
import { createGetJobApplicationMock } from '@staff-portal/jobs-app/src/mocks'

export const JOB_APPLICATION_ID = '0'

const jobId = 'VjEtSm9iLTI1NzQ5MA'
const talentName = 'John Doe'
const talentType = 'FinanceExpert'

const jobApplicationMock = () =>
  createGetJobApplicationMock({
    jobId,
    jobApplicationId: JOB_APPLICATION_ID,
    talentName,
    talentType
  })

export const jobCancelledApplicationMock = (props?: { approveUrl?: string }) =>
  createGetJobApplicationMock({
    jobId,
    jobApplicationId: JOB_APPLICATION_ID,
    talentName,
    talentType,
    status: JobApplicationStatus.CANCELLED,
    approveUrl: props?.approveUrl
  })

export default jobApplicationMock
