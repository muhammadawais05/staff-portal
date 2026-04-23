import {
  TalentCumulativeStatus,
  OperationCallableTypes,
  Scalars
} from '@staff-portal/graphql/staff'

import { SourcingRequestTalentFragment } from '../sourcing-request-talent-fragment'

export const createSourcingRequestTalentFragmentMock = ({
  deletedAt = '2021-08-26T22:48:14+03:00',
  unlinkSourcingRequestTalentOperationCallable = OperationCallableTypes.ENABLED,
  linkSourcingRequestOperationCallable = OperationCallableTypes.ENABLED
}: {
  deletedAt?: Scalars['Time'] | null
  unlinkSourcingRequestTalentOperationCallable?: OperationCallableTypes
  linkSourcingRequestOperationCallable?: OperationCallableTypes
}): SourcingRequestTalentFragment => ({
  deletedAt: deletedAt,
  id: 'VjEtU291cmNpbmdSZXF1ZXN0VGFsZW50LTM0NTc',
  operations: {
    unlinkSourcingRequestTalent: {
      callable: unlinkSourcingRequestTalentOperationCallable,
      messages: []
    }
  },
  sourcingRequest: {
    id: 'VjEtU291cmNpbmdSZXF1ZXN0LTQ3Mw'
  },
  talent: {
    id: 'VjEtVGFsZW50LTI2MTg0ODY',
    fullName: 'Sang Altenwerth',
    cumulativeStatus: TalentCumulativeStatus.REJECTED,
    webResource: {
      text: 'Sang Altenwerth',
      url: 'https://staging.toptal.net/platform/staff/talents/2618486'
    },
    operations: {
      linkSourcingRequest: {
        callable: linkSourcingRequestOperationCallable,
        messages: []
      }
    }
  }
})
