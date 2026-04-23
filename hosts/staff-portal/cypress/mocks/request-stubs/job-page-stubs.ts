import { Job } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import { hiddenOperationMock } from '..'
import {
  getAvailabilityRequestItemsResponse,
  getCancelledJobApplicantsResponse,
  getCandidateIntroDraftsResponse,
  getJobApplicantsOperationResponse,
  getJobApplicationsResponse,
  getJobClientContactsResponse,
  getJobCommitmentChangeRequestResponse,
  getJobCompanyDataResponse,
  getJobDetailsInformationResponse,
  getJobFeedbacksResponse,
  getJobNotesResponse,
  getJobPageDataResponse,
  getJobPageTabsPermissionsResponse,
  getJobRelatedTasksResponse,
  getJobSalesOwnerDataResponse,
  getJobStatusMessagesResponse,
  getJobContractsResponse,
  getJobCommissionsResponse,
  getJobDeleteDetailsResponse,
  getJobFeedbackCanceledReasonsResponse,
  getJobPostponeReasonsResponse,
  getTalentsByNameAutocompleteResponse,
  getFavoriteTalentsResponse,
  getHiredTalentResponse,
  getJobPageCandidatesResponse,
  getJobEditResponse,
  getJobEditVerticalsResponse,
  getCountriesResponse,
  getLanguagesResponse,
  getVerticalSpecializationsResponse,
  getAggregatedTalentClientHourlyRates
} from '../responses'

export const jobPageStubs = (
  job?: Partial<Job>
): { [key: string]: OperationValue } => ({
  GetJobWebResource: {
    data: {
      node: {
        id: 'VjEtSm9iLTI1MTM2NA',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/jobs/123',
          __typename: 'Link'
        },
        __typename: 'Job'
      }
    }
  },
  GetJobPageData: getJobPageDataResponse(job),
  GetJobCompanyData: getJobCompanyDataResponse(job),
  GetJobClientContacts: getJobClientContactsResponse(job),
  GetJobDetailsInformation: getJobDetailsInformationResponse(job),
  GetHiredTalent: getHiredTalentResponse(job),
  GetJobCommitmentChangeRequest: getJobCommitmentChangeRequestResponse(job),
  GetJobPageCandidates: getJobPageCandidatesResponse(job),
  GetCandidateIntroDrafts: getCandidateIntroDraftsResponse(job),
  GetJobApplications: getJobApplicationsResponse(job),
  GetJobApplicantsOperation: getJobApplicantsOperationResponse(),
  GetAvailabilityRequestItems: getAvailabilityRequestItemsResponse(job),
  GetJobEdit: getJobEditResponse(job),
  GetJobEditVerticals: getJobEditVerticalsResponse(),
  GetVerticalSpecializations: getVerticalSpecializationsResponse(),
  GetCountries: getCountriesResponse(),
  GetLanguages: getLanguagesResponse(),
  GetJobFeedbacks: getJobFeedbacksResponse(job),
  GetJobNotes: getJobNotesResponse(job),
  GetJobSalesOwnerData: getJobSalesOwnerDataResponse(job),
  GetNodeStatusMessages: getJobStatusMessagesResponse(job),
  GetJobContracts: getJobContractsResponse(job),
  GetCancelledJobApplicants: getCancelledJobApplicantsResponse(job),
  GetRelatedTasks: getJobRelatedTasksResponse(job),
  GetJobPageTabsPermissions: getJobPageTabsPermissionsResponse(job),
  JobCommissions: getJobCommissionsResponse(job),
  GetCreateTaskOperation: {
    data: {
      operations: {
        createTask: hiddenOperationMock(),
        __typename: 'QueryOperations'
      }
    }
  },
  GetDeleteJobDetails: getJobDeleteDetailsResponse(job),
  GetFeedbackReasons: getJobFeedbackCanceledReasonsResponse(),
  GetJobPostponeReasons: getJobPostponeReasonsResponse(),
  GetTalentsByNameAutocomplete: getTalentsByNameAutocompleteResponse(job),
  GetFavoriteTalents: getFavoriteTalentsResponse(job),
  GetMaxHourlyRateEnhancementsExperiments: {
    data: {
      experiments: {
        maxHourlyRateEnhancements: {
          enabled: true
        }
      }
    }
  },
  GetAggregatedTalentClientHourlyRates: getAggregatedTalentClientHourlyRates()
})
