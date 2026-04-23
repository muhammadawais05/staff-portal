import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { CommitmentChangeRequestFragment } from './get-job-commitment-change-request.staff.gql.types'

export const createCommitmentChangeRequestMock = (
  commitmentChangeRequest: Partial<CommitmentChangeRequestFragment> = {}
): CommitmentChangeRequestFragment => ({
  id: '123',
  newAvailability: EngagementCommitmentEnum.PART_TIME,
  newExtraHoursEnabled: true,
  createdAt: '2021-10-25T12:55:11+03:00',
  changeDate: '2021-10-26',
  operations: {
    approveCommitmentChangeRequest: createOperationMock(),
    rejectCommitmentChangeRequest: createOperationMock()
  },
  ...commitmentChangeRequest
})
