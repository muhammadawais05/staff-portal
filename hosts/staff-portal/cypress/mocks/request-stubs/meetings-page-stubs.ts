import { Meeting } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import { getMeetingsListResponse } from '~integration/mocks/responses/meetings'
import { getTouchCounterResponse } from '~integration/mocks/responses'

export const meetingsPageStubs = ({
  meetings
}: {
  meetings?: Meeting[]
}): { [key: string]: OperationValue } => ({
  GetMeetingsList: getMeetingsListResponse(meetings),
  TouchCounter: getTouchCounterResponse()
})
