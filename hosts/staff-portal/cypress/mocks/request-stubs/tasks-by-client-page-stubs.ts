import { OperationValue } from '~integration/types'
import {
  getClientsWithNameResponse,
  getEmailContactsResponse,
  getPendoVisitorResponse,
  getTeamsWithEmailTrackingResponse,
  getClientJobsResponse
} from '../responses'

export const tasksByClientPageStubs = (): {
  [key: string]: OperationValue
} => ({
  GetClientsNamesAndTotalCount: getClientsWithNameResponse(),
  GetPendoVisitor: getPendoVisitorResponse(),
  GetEmailContacts: getEmailContactsResponse(),
  GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
  GetClientJobs: getClientJobsResponse()
})
