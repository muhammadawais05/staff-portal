import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { ApproveCommitmentChangeRequestDataFragment } from './get-approve-commitment-change-request-data.staff.gql.types'

export const createApproveCommitmentChangeRequestDataMock = (
  approveCommitmentChangeRequestData: Partial<ApproveCommitmentChangeRequestDataFragment> = {}
): ApproveCommitmentChangeRequestDataFragment => ({
  id: '123',
  changeDate: '2020-11-11',
  newAvailability: EngagementCommitmentEnum.FULL_TIME,
  ...approveCommitmentChangeRequestData
})
