import { OperationValue } from '~integration/types'
import { enabledOperationMock } from '..'
import { successMutationMock } from '../mutations'
import {
  getChroniclesTokenResponse,
  getModelDescriptionsResponse,
  getSearchChroniclesResponse
} from '../responses'
import {
  getDueTasksResponse,
  getOverviewWidgetPermissionsResponse
} from '../responses/dashboard'
import { OverviewWidgetPermissionsProps } from '../responses/dashboard/get-overview-widget-permissions-response'

export const dashboardPageStubs = (
  props: Partial<OverviewWidgetPermissionsProps> = {}
): { [key: string]: OperationValue } => ({
  GetOverviewWidgetPermissions: getOverviewWidgetPermissionsResponse(props),
  GetChroniclesToken: getChroniclesTokenResponse(),
  SearchChronicles: getSearchChroniclesResponse(),
  ModelDescriptions: getModelDescriptionsResponse(),
  GetDueTasks: getDueTasksResponse(),
  GetCreateTaskOperation: {
    data: {
      operations: {
        createTask: enabledOperationMock(),
        __typename: 'QueryOperations'
      }
    }
  },
  CreateTask: {
    data: {
      createTask: successMutationMock()
    }
  }
})
