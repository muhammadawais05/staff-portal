import { getJobApplicationResponse } from '../responses/job-application/get-job-application-response'
import { getJobApplicationTalentCardResponse } from '../responses/job-application/get-job-application-talent-card-response'

export const jobApplicationPageStubs = () => ({
  GetJobApplication: () => getJobApplicationResponse(),
  GetJobApplicationTalentCard: () => getJobApplicationTalentCardResponse()
})
