import { OperationValue } from '~integration/types'
import {
  getChromeResponse,
  getServerTimezoneResponse,
  getCommunicationTrackingAuthUrlResponse,
  getCountersResponse,
  getCurrentUserResponse,
  getExpiredCallTimersResponse,
  getLensTokenResponse,
  getMailboxesResponse,
  getMainMenuResponse,
  getOperationalIssuesCountersResponse,
  getOperationalIssuesCountResponse,
  getPlayBookTasksCountersResponse,
  getStatusMessagesResponse,
  getTeamTaskMetricsResponse,
  getUserInfoResponse
} from '../responses'

export const defaultChromeStubs = (): { [key: string]: OperationValue } => ({
  GetChrome: getChromeResponse(),
  GetServerTimeZone: getServerTimezoneResponse(),
  GetUserInfo: getUserInfoResponse(),
  GetMainMenu: getMainMenuResponse(),
  GetCurrentUser: getCurrentUserResponse(),
  GetCounters: getCountersResponse(),
  GetOperationalIssuesCount: getOperationalIssuesCountResponse(),
  GetPlayBookTasksCounters: getPlayBookTasksCountersResponse(),
  GetOperationalIssuesCounters: getOperationalIssuesCountersResponse(),
  GetTeamTaskMetrics: getTeamTaskMetricsResponse(),
  GetStatusMessages: getStatusMessagesResponse(),
  GetExpiredCallTimers: getExpiredCallTimersResponse(),
  GetLensToken: getLensTokenResponse(),
  GetCommunicationTrackingAuthUrl: getCommunicationTrackingAuthUrlResponse(),
  GetMailboxes: getMailboxesResponse()
})
